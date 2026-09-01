// Screenshot helper: headless Chrome clamps --window-size to a 500px minimum on
// macOS, so mobile widths have to go through CDP device-metrics emulation.
// Usage: node tools/shot.mjs <url> <width> <out.png> [fullPage|height]

import { writeFileSync } from "node:fs";
import { spawn } from "node:child_process";

const [url, widthArg, out, sizeArg = "fullPage"] = process.argv.slice(2);
const width = Number(widthArg);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333 + (process.pid % 200);

const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`,
  "--user-data-dir=/tmp/zf-chrome-profile-" + PORT,
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targetWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error("Chrome did not expose a page target");
}

const ws = new WebSocket(await targetWs());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let id = 0;
const pending = new Map();
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  }
});
const send = (method, params = {}) =>
  new Promise((res) => {
    const n = ++id;
    pending.set(n, res);
    ws.send(JSON.stringify({ id: n, method, params }));
  });

const mobile = width <= 768;
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height: 900,
  deviceScaleFactor: 1,
  mobile,
  screenWidth: width,
  screenHeight: 900,
});
if (mobile) {
  await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
}

await send("Page.enable");
await send("Page.navigate", { url });
await sleep(2500);

const { result: metrics } = await send("Runtime.evaluate", {
  expression: `JSON.stringify({ innerWidth, docHeight: document.documentElement.scrollHeight })`,
  returnByValue: true,
});
const { innerWidth, docHeight } = JSON.parse(metrics.value);

let clip;
if (sizeArg === "fullPage") {
  clip = { x: 0, y: 0, width, height: docHeight, scale: 1 };
} else if (sizeArg.startsWith("#")) {
  const { result } = await send("Runtime.evaluate", {
    expression: `(() => { const r = document.querySelector('${sizeArg}').getBoundingClientRect();
      return JSON.stringify({ bottom: Math.ceil(r.bottom + window.scrollY) }); })()`,
    returnByValue: true,
  });
  clip = { x: 0, y: 0, width, height: JSON.parse(result.value).bottom, scale: 1 };
} else {
  clip = { x: 0, y: 0, width, height: Number(sizeArg), scale: 1 };
}

await send("Emulation.setDeviceMetricsOverride", {
  width,
  height: clip.height,
  deviceScaleFactor: 1,
  mobile,
  screenWidth: width,
  screenHeight: clip.height,
});
await sleep(1200);

const shot = await send("Page.captureScreenshot", { format: "png", clip, captureBeyondViewport: true });
writeFileSync(out, Buffer.from(shot.data, "base64"));
console.log(`${out} innerWidth=${innerWidth} size=${clip.width}x${clip.height}`);

ws.close();
chrome.kill();
process.exit(0);
