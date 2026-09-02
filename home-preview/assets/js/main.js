(function(){
  const body=document.body;
  const menu=document.querySelector('.menu');
  const toggle=document.querySelector('.menu-toggle');
  const close=document.querySelector('.menu-close');
  function setMenu(open){menu.classList.toggle('is-open',open);body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu')}
  toggle.addEventListener('click',()=>setMenu(!menu.classList.contains('is-open')));
  close.addEventListener('click',()=>setMenu(false));
  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window)){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));return}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -8%'});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
})();
