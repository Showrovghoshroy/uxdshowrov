// ------- theme toggle -------
const themeBtn=document.getElementById('themeBtn');
const setIcon=()=>{
  const dark=document.documentElement.classList.contains('dark');
  themeBtn.innerHTML=dark
    ?'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
    :'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
};
if(window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark');
setIcon();
themeBtn.addEventListener('click',()=>{document.documentElement.classList.toggle('dark');setIcon();});

// ------- mobile menu -------
const menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
menuBtn.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',open);
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));

// ------- services list -------
const services=["UI Design","UX Design","Product Design","UX Research","UX Audit","UX Strategy","Mobile App Design","Web Design","SaaS Design","Dashboard Design","Design Systems","Information Architecture","Wireframing","Interactive Prototyping","Accessibility Review","User Testing","AI-assisted UX Consulting","Product Discovery","Developer Handoff"];
const icon='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>';
document.getElementById('svcGrid').innerHTML=services.map((s,i)=>`<div class="svc reveal ${i%3===1?'d1':i%3===2?'d2':''}">${icon}${s}</div>`).join('');

// ------- scroll reveal -------
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ------- active nav link -------
const sections=[...document.querySelectorAll('section[id]')];
const links=[...document.querySelectorAll('.nav-links a')];
const spy=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id));
    }
  });
},{rootMargin:'-40% 0px -55% 0px'});
sections.forEach(s=>spy.observe(s));

// ------- contact form (mailto) -------
function handleForm(e){
  e.preventDefault();
  const f=e.target;
  const subject=encodeURIComponent('Project inquiry from '+f.name.value);
  const body=encodeURIComponent(`Name: ${f.name.value}\nEmail: ${f.email.value}\nCompany: ${f.company.value||'—'}\n\n${f.message.value}`);
  window.location.href=`mailto:showrovghoshroy@gmail.com?subject=${subject}&body=${body}`;
  return false;
}
// ------- custom cursor (Portavia style) -------
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const dot=document.createElement('div'),ring=document.createElement('div');
  dot.className='cursor-dot';ring.className='cursor-ring';
  document.body.append(dot,ring);
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;});
  (function loop(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;requestAnimationFrame(loop);})();
  document.querySelectorAll('a,button,.skill-card,.svc').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
  });
}
