(function () {
  document.documentElement.classList.add("js-ready");

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".menu-close");
  const toTop = document.querySelector(".to-top");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const toast = document.querySelector(".toast");
  const inquiry = document.querySelector(".inquiry");
  const form = document.querySelector(".inquiry-form");
  const processItems = [...document.querySelectorAll(".process-item")];
  const whyItems = [...document.querySelectorAll(".why-item")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktopNav = window.matchMedia("(min-width: 769px)");

  function setHeader() {
    const y = window.scrollY;
    const scrolled = header.classList.contains("is-scrolled");
    if (!scrolled && y > 100) header.classList.add("is-scrolled");
    else if (scrolled && y < 60) header.classList.remove("is-scrolled");
    toTop.classList.toggle("is-visible", y > 560);
  }

  let scrollTick = false;
  function onScroll() {
    if (scrollTick) return;
    scrollTick = true;
    window.requestAnimationFrame(function () {
      scrollTick = false;
      setHeader();
      if (desktopNav.matches) {
        navItems.forEach(function (item) {
          if (item.classList.contains("is-open")) positionDropdown(item);
        });
      }
    });
  }

  function closeMenu() {
    header.classList.remove("menu-open");
    document.body.classList.remove("nav-locked");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.querySelectorAll(".nav-item.is-open").forEach(function (item) {
      item.classList.remove("is-open");
      const btn = item.querySelector(".nav-subtoggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  function openMenu() {
    header.classList.add("menu-open");
    document.body.classList.add("nav-locked");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  toggle.addEventListener("click", function () {
    header.classList.contains("menu-open") ? closeMenu() : openMenu();
  });
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  document.querySelector(".nav-backdrop").addEventListener("click", closeMenu);
  document.querySelectorAll(".nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!desktopNav.matches) closeMenu();
    });
  });
  document.querySelectorAll(".nav-subtoggle").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      const item = btn.closest(".nav-item");
      const open = item.classList.contains("is-open");
      document.querySelectorAll(".nav-item.is-open").forEach(function (other) {
        other.classList.remove("is-open");
        const otherBtn = other.querySelector(".nav-subtoggle");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
  window.addEventListener("resize", function () {
    if (desktopNav.matches) {
      closeMenu();
      navItems.forEach(function (item) {
        if (item.classList.contains("is-open")) positionDropdown(item);
      });
    } else {
      closeDesktopDropdowns();
    }
  });

  const navItems = [...document.querySelectorAll(".nav-item")];
  let dropdownTimer = 0;

  function closeDesktopDropdowns() {
    navItems.forEach(function (item) {
      item.classList.remove("is-open");
      const btn = item.querySelector(".nav-subtoggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
      const dd = item.querySelector(".dropdown");
      if (dd) {
        dd.style.top = "";
        dd.style.left = "";
      }
    });
  }

  function positionDropdown(item) {
    const dd = item.querySelector(".dropdown");
    if (!dd || !desktopNav.matches) return;
    const rect = item.getBoundingClientRect();
    dd.style.top = Math.round(rect.bottom - 4) + "px";
    dd.style.left = Math.round(rect.left) + "px";
  }

  function openDesktopDropdown(item) {
    if (!desktopNav.matches) return;
    navItems.forEach(function (other) {
      if (other === item) return;
      other.classList.remove("is-open");
      const otherBtn = other.querySelector(".nav-subtoggle");
      if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      const otherDd = other.querySelector(".dropdown");
      if (otherDd) {
        otherDd.style.top = "";
        otherDd.style.left = "";
      }
    });
    item.classList.add("is-open");
    const btn = item.querySelector(".nav-subtoggle");
    if (btn) btn.setAttribute("aria-expanded", "true");
    positionDropdown(item);
  }

  navItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      if (!desktopNav.matches) return;
      window.clearTimeout(dropdownTimer);
      openDesktopDropdown(item);
    });
    item.addEventListener("mouseleave", function () {
      if (!desktopNav.matches) return;
      dropdownTimer = window.setTimeout(closeDesktopDropdowns, 180);
    });
    item.addEventListener("focusin", function () {
      if (!desktopNav.matches) return;
      window.clearTimeout(dropdownTimer);
      openDesktopDropdown(item);
    });
  });

  document.addEventListener("mousedown", function (event) {
    if (!desktopNav.matches) return;
    if (!event.target.closest(".nav-item")) closeDesktopDropdowns();
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  setHeader();

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  document.querySelectorAll("[data-pending]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      toast.textContent = el.getAttribute("data-pending") || "This link is pending company confirmation.";
      toast.classList.add("is-on");
      window.setTimeout(function () { toast.classList.remove("is-on"); }, 2800);
    });
  });

  document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      lightboxImg.src = btn.getAttribute("data-image");
      lightboxImg.alt = btn.getAttribute("data-caption") || "";
      lightboxCaption.textContent = btn.getAttribute("data-caption") || "";
      lightbox.classList.add("is-open");
      lightbox.querySelector(".lightbox-close").focus();
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightboxImg.removeAttribute("src");
  }

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
      closeDesktopDropdowns();
      closeMenu();
    }
  });

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  function revealAll() {
    document.querySelectorAll(".reveal, .process-item, .why-item").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

    const processIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        processItems.forEach(function (item, index) {
          window.setTimeout(function () { item.classList.add("is-in"); }, index * 80);
        });
        processIo.disconnect();
      });
    }, { threshold: 0.18 });
    const processList = document.querySelector(".process-list");
    if (processList) processIo.observe(processList);

    const whyIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        whyItems.forEach(function (item, index) {
          window.setTimeout(function () { item.classList.add("is-in"); }, index * 80);
        });
        whyIo.disconnect();
      });
    }, { threshold: 0.2 });
    const whyList = document.querySelector(".why-list");
    if (whyList) whyIo.observe(whyList);
  } else {
    revealAll();
  }

  function showError(input, message) {
    const box = input.closest(".field").querySelector(".error");
    if (box) box.textContent = message || "";
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = form.elements.namedItem("name");
      const company = form.elements.namedItem("company");
      const email = form.elements.namedItem("email");
      const message = form.elements.namedItem("message");
      showError(name, name.value.trim() ? "" : "Please enter your name.");
      showError(company, company.value.trim() ? "" : "Please enter your company.");
      showError(email, validEmail(email.value) ? "" : "Please enter a valid business email.");
      showError(message, message.value.trim() ? "" : "Please add a short project note.");
      if (!name.value.trim() || !company.value.trim() || !validEmail(email.value) || !message.value.trim()) {
        const first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      inquiry.classList.add("is-success");
    });
  }
})();
