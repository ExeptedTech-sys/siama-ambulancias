const menu=document.querySelector('.menu-btn'),nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

const attributionKeys=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid'];
const search=new URLSearchParams(location.search),attribution={};
attributionKeys.forEach(key=>{const value=search.get(key);if(value)attribution[key]=value});
if(Object.keys(attribution).length)localStorage.setItem('siama_attribution',JSON.stringify({...attribution,landing_page:location.pathname,captured_at:new Date().toISOString()}));
let savedAttribution={};try{savedAttribution=JSON.parse(localStorage.getItem('siama_attribution')||'{}')}catch{}

const progress=document.querySelector('.scroll-progress span');
function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max?scrollY/max:0})`}
addEventListener('scroll',onScroll,{passive:true});onScroll();

if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));

const sections=[...document.querySelectorAll('main section[id]')],navLinks=[...nav.querySelectorAll('a[href^="#"]')];
if('IntersectionObserver'in window){const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -55%'});sections.forEach(section=>sectionObserver.observe(section))}

if(matchMedia('(hover:hover) and (pointer:fine)').matches)document.querySelectorAll('.services article').forEach(card=>card.addEventListener('pointermove',event=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${event.clientX-r.left}px`);card.style.setProperty('--my',`${event.clientY-r.top}px`)}));

function convert(action){if(typeof window.gtag!=='function')return;const config=window.SIAMA_GOOGLE_ADS_CONVERSIONS||{},sendTo=action.startsWith('call')?config.call:config.whatsapp;if(sendTo)gtag('event','conversion',{send_to:sendTo});gtag('event',action.startsWith('call')?'phone_click':'whatsapp_click',{event_category:'lead',event_label:action,campaign:savedAttribution.utm_campaign||'(direct)'})}
document.querySelectorAll('.track').forEach(link=>link.addEventListener('click',()=>convert(link.dataset.action||'contact')));

document.querySelector('#quote-form').addEventListener('submit',event=>{
  event.preventDefault();const data=new FormData(event.currentTarget);
  const parts=[`Hola SIAMA, soy ${data.get('name')}.`,`Mi teléfono es ${data.get('phone')}.`,`Necesito: ${data.get('service')}.`,data.get('origin')?`Origen: ${data.get('origin')}.`:'',data.get('destination')?`Destino: ${data.get('destination')}.`:'',data.get('details')?`Detalles: ${data.get('details')}.`:''];
  const campaign=[savedAttribution.utm_source,savedAttribution.utm_campaign,savedAttribution.gclid].filter(Boolean).join(' / ');
  if(campaign)parts.push(`Referencia de campaña: ${campaign}.`);
  convert('whatsapp_form');sessionStorage.setItem('siama_lead_started','1');
  window.open('https://wa.me/525576958468?text='+encodeURIComponent(parts.filter(Boolean).join(' ')),'_blank','noopener,noreferrer');
});

const quoteForm=document.querySelector('#quote-form');let formStarted=false;
quoteForm.addEventListener('input',()=>{if(formStarted)return;formStarted=true;if(typeof gtag==='function')gtag('event','form_start',{event_category:'lead',form_name:'cotizacion_whatsapp'})},{once:true});
const depths=new Set();addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;if(!max)return;const percent=Math.round(scrollY/max*100);[25,50,75,90].forEach(mark=>{if(percent>=mark&&!depths.has(mark)){depths.add(mark);if(typeof gtag==='function')gtag('event','scroll_depth',{percent_scrolled:mark})}})},{passive:true});
