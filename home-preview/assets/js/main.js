(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.fullscreen-menu');
  const toggle = document.querySelector('.menu-toggle');
  const close = document.querySelector('.menu-close');
  let lastFocus = null;

  const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 36);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? 'Close' : 'Menu';
    body.classList.toggle('menu-open', open);
    if (open) { lastFocus = document.activeElement; close.focus(); }
    else if (lastFocus) { lastFocus.focus(); }
  }
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  close.addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
    if (event.key === 'Tab' && menu.classList.contains('is-open')) {
      const items = [...menu.querySelectorAll('button,a')].filter(el => !el.closest('.menu-links:not(.is-active)'));
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  if (new URLSearchParams(location.search).get('menu') === 'open') setMenu(true);

  const menuCategories = [...document.querySelectorAll('.menu-category')];
  function showMenuPanel(button) {
    menuCategories.forEach(item => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-selected', String(active)); });
    document.querySelectorAll('.menu-links').forEach(panel => panel.classList.toggle('is-active', panel.dataset.panel === button.dataset.menu));
  }
  menuCategories.forEach(button => {
    button.addEventListener('mouseenter', () => showMenuPanel(button));
    button.addEventListener('focus', () => showMenuPanel(button));
    button.addEventListener('click', () => showMenuPanel(button));
  });

  const solutionData = {
    fragrance: {number:'01',title:'Fragrance',text:'Develop fine fragrance, body mist and fragrance sets across formula, bottle, decoration and finished production. Choose from established formulas or work with our team to shape a collection for your market.',url:'https://www.zuofun.com/perfume2/'},
    home: {number:'02',title:'Home Fragrance',text:'Create reed diffusers, scented candles and ambient fragrance products with coordinated scent, vessel and packaging development for branded collections.',url:'https://www.zuofun.com/aromatherapy2/'},
    skincare: {number:'03',title:'Skincare & Body Care',text:'Develop skincare, body care and personal care products with formulation, sampling, packaging coordination and scalable manufacturing support.',url:'https://www.zuofun.com/skincares/'},
    makeup: {number:'04',title:'Makeup',text:'Build color cosmetic collections across formula, shade, component, decoration and finished production, supported by coordinated development and quality control.',url:'https://www.zuofun.com/makeups/'}
  };
  const solutionKeys = Object.keys(solutionData);
  const solutionDots = [...document.querySelectorAll('.solution-dot')];
  const solutionMessage = document.querySelector('.solution-message');
  let activeSolution = 'fragrance';
  function renderSolution(key, focusDot = false) {
    const data = solutionData[key];
    if (!data || key === activeSolution && !focusDot) return;
    activeSolution = key;
    solutionDots.forEach(item => { const active = item.dataset.solution === key; item.classList.toggle('is-active', active); item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    document.querySelectorAll('.solution-image').forEach(image => image.classList.toggle('is-active', image.dataset.solution === key));
    document.querySelector('#solution-title').textContent = data.title;
    document.querySelector('#solution-description').textContent = data.text;
    const link = document.querySelector('#solution-link'); link.innerHTML = `Explore ${data.title} <span>→</span>`; link.href = data.url;
    solutionMessage.classList.remove('is-changing');
    void solutionMessage.offsetWidth;
    solutionMessage.classList.add('is-changing');
    if (focusDot) solutionDots.find(item => item.dataset.solution === key && item.offsetParent !== null)?.focus();
  }
  solutionDots.forEach(dot => {
    dot.addEventListener('click', () => renderSolution(dot.dataset.solution));
    dot.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = solutionKeys.indexOf(activeSolution);
      let next = index;
      if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = solutionKeys.length - 1;
      else next = (index + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + solutionKeys.length) % solutionKeys.length;
      renderSolution(solutionKeys[next], true);
    });
  });
  const solutionStage = document.querySelector('.solution-stage');
  let swipeStartX = 0;
  solutionStage.addEventListener('pointerdown', event => { swipeStartX = event.clientX; });
  solutionStage.addEventListener('pointerup', event => { const delta = event.clientX - swipeStartX; if (Math.abs(delta) < 48) return; const index = solutionKeys.indexOf(activeSolution); renderSolution(solutionKeys[(index + (delta < 0 ? 1 : -1) + solutionKeys.length) % solutionKeys.length]); });

  const serviceData = {
    private: 'Launch with proven formulas and available packaging under your own identity.',
    low: 'Adapt selected fragrances, bottles and packaging for a controlled first launch.',
    oem: 'Build from concept and formula through packaging, production and delivery.',
    wholesale: 'Source finished fragrance products prepared for retail distribution.'
  };
  const serviceTabs = [...document.querySelectorAll('.service-tab')];
  serviceTabs.forEach((tab, index) => tab.addEventListener('click', () => {
    const key = tab.dataset.service;
    serviceTabs.forEach(item => { const active = item === tab; item.classList.toggle('is-active', active); item.setAttribute('aria-selected', String(active)); });
    document.querySelectorAll('.service-image').forEach(image => image.classList.toggle('is-active', image.dataset.service === key));
    document.querySelector('#service-number').textContent = `0${index + 1} / 04`;
    document.querySelector('#service-description').textContent = serviceData[key];
  }));

  const form = document.querySelector('.inquiry-form');
  form.addEventListener('submit', event => { event.preventDefault(); const status = form.querySelector('.form-status'); if (!form.checkValidity()) { form.reportValidity(); status.textContent = 'Please complete the required fields.'; return; } status.textContent = 'Preview validated. Live delivery still requires WordPress SMTP connection.'; });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progressNav = document.querySelector('.section-progress');
  const progressRail = document.querySelector('.section-progress-rail');
  const progressLabel = progressNav.querySelector('.section-progress-label');
  const progressNodes = [...progressNav.querySelectorAll('.progress-node')];
  const progressItems = [
    {id:'hero',label:'HOME',theme:'dark',target:document.querySelector('#hero'),sections:[['#hero','dark']]},
    {id:'solutions',label:'PRODUCTS',theme:'light',target:document.querySelector('#solutions'),sections:[['#solutions','light']]},
    {id:'about',label:'ABOUT',theme:'light',target:document.querySelector('#about'),sections:[['#about','light']]},
    {id:'services',label:'SERVICES',theme:'dark',target:document.querySelector('#services'),sections:[['#services','dark']]},
    {id:'process',label:'PROCESS',theme:'light',target:document.querySelector('#process'),sections:[['#process','light'],['#expertise','light']]},
    {id:'factory',label:'FACTORY',theme:'dark',target:document.querySelector('#factory'),sections:[['#factory','dark'],['#markets','light']]},
    {id:'certifications',label:'CERTIFICATIONS',theme:'light',target:document.querySelector('#certifications'),sections:[['#certifications','light'],['#news','light']]},
    {id:'contact',label:'CONTACT',theme:'dark',target:document.querySelector('#contact'),sections:[['#contact','dark'],['.site-footer','dark']]}
  ];
  const sectionToProgress = new Map();
  progressItems.forEach(item => item.sections.forEach(([selector,theme]) => {
    const section = document.querySelector(selector);
    if (section) {
      section.dataset.progressSection = item.id === 'solutions' ? 'products' : item.id;
      section.dataset.progressTheme = theme;
      sectionToProgress.set(section,{item,theme});
    }
  }));
  let activeProgressId = 'hero', scrollFrame = 0, navigationLock = '', clickedLabel = null, labelExpiry = 0, labelHideTimer = 0, labelPreview = false;
  function positionProgressLabel(node) {
    progressLabel.style.top = `${node.offsetTop + node.offsetHeight / 2}px`;
  }
  function showProgressLabel(label,node) {
    progressLabel.textContent = label;
    positionProgressLabel(node);
    progressLabel.classList.add('is-visible');
  }
  function hideProgressLabel() { progressLabel.classList.remove('is-visible'); }
  function showClickedLabel(item,node) {
    clickedLabel = {item,node};
    labelExpiry = Date.now() + 2500;
    clearTimeout(labelHideTimer);
    showProgressLabel(item.label,node);
    labelHideTimer = setTimeout(() => { clickedLabel = null; labelPreview = false; hideProgressLabel(); },2500);
  }
  function endLabelPreview() {
    labelPreview = false;
    if (clickedLabel && Date.now() < labelExpiry) showProgressLabel(clickedLabel.item.label,clickedLabel.node); else hideProgressLabel();
  }
  function setActiveProgress(id,themeOverride) {
    const item = progressItems.find(entry => entry.id === id);
    if (!item) return;
    activeProgressId = id;
    progressNodes.forEach(node => { const active = node.dataset.target === id; node.classList.toggle('is-active', active); if (active) node.setAttribute('aria-current','true'); else node.removeAttribute('aria-current'); });
    const dark = (themeOverride || item.theme) === 'dark';
    progressNav.classList.toggle('is-dark', dark);
    progressRail.classList.toggle('is-dark', dark);
  }
  progressNodes.forEach(node => {
    const item = progressItems.find(entry => entry.id === node.dataset.target);
    const activateProgressNode = () => { navigationLock = item.id; setActiveProgress(item.id); showClickedLabel(item,node); item.target.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'}); setTimeout(() => { navigationLock = ''; syncProgressSection(); },reduced?0:1500); };
    node.addEventListener('click', activateProgressNode);
    node.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activateProgressNode(); } });
    node.addEventListener('mouseenter', () => { if (innerWidth > 1200) { labelPreview = true; showProgressLabel(item.label,node); } });
    node.addEventListener('mouseleave', () => { if (innerWidth > 1200) endLabelPreview(); });
    node.addEventListener('focus', () => { if (innerWidth > 1200) { labelPreview = true; showProgressLabel(item.label,node); } });
    node.addEventListener('blur', () => { if (innerWidth > 1200) endLabelPreview(); });
  });
  const heroIndicator = document.querySelector('.hero-scroll-indicator');
  heroIndicator.addEventListener('click', () => document.querySelector('#solutions').scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'}));
  function updatePageProgress() {
    scrollFrame = 0;
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    const ratio = maxScroll > 0 ? Math.min(1,Math.max(0,scrollY / maxScroll)) : 0;
    progressNav.style.setProperty('--page-progress',ratio.toFixed(4));
    heroIndicator.classList.toggle('is-hidden',scrollY > innerHeight * .55);
    if (!navigationLock && ratio >= .998) setActiveProgress('contact');
    else if (!navigationLock) syncProgressSection();
  }
  function queuePageProgress() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updatePageProgress); }
  updatePageProgress();
  addEventListener('scroll',queuePageProgress,{passive:true});
  addEventListener('resize',queuePageProgress,{passive:true});
  function syncProgressSection() {
    if (navigationLock) return;
    const marker = innerHeight * .46;
    let current = progressItems[0];
    let theme = current.theme;
    sectionToProgress.forEach((entry,section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= marker && rect.bottom > marker) { current = entry.item; theme = entry.theme; }
    });
    setActiveProgress(current.id,theme);
  }
  if ('IntersectionObserver' in window) {
    const progressObserver = new IntersectionObserver(() => syncProgressSection(),{threshold:[0,.01],rootMargin:'-46% 0px -53% 0px'});
    sectionToProgress.forEach((entry,section) => progressObserver.observe(section));
  }
  syncProgressSection();
  const reveals = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('is-visible'));
  else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .08, rootMargin: '0px 0px -6%' });
    reveals.forEach(el => observer.observe(el));
  }
})();
