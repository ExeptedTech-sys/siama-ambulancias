/* SIAMA Ambulancias — sitio estático sin dependencias, GitHub Pages compatible */
(() => {
  'use strict';
  const TEL = '525555004337';
  const $ = (selector, scope=document) => scope.querySelector(selector);
  const $$ = (selector, scope=document) => Array.from(scope.querySelectorAll(selector));
  const safeStore = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key,value) { try { localStorage.setItem(key,value); } catch {} }
  };
  $('#year') && ($('#year').textContent = new Date().getFullYear());

  // Lightweight visual entrance transitions: disabled for reduced-motion users.
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    const obs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('motion-enter');obs.unobserve(entry.target)}})},{threshold:0.12});
    $$('.section-heading,.service-card,.equipment-feature,.quote-card,.coverage-layout,.about-photo,.faq-list').forEach(el=>obs.observe(el));
  }

  // Mobile accessible menu
  const toggle=$('.nav-toggle'); const nav=$('#primary-nav');
  if(toggle && nav) {
    toggle.addEventListener('click',()=>{
      const open = toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-expanded',String(!open));
      toggle.setAttribute('aria-label',open?'Abrir menú':'Cerrar menú');
      nav.classList.toggle('open',!open);
    });
    $$('#primary-nav a').forEach(link=>link.addEventListener('click',()=>{
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');
    }));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
  }

  // Side contact hub: actual company logo, phone and WhatsApp as separate direct actions
  const contact=$('#float-contact'), trigger=$('#float-main');
  if(contact && trigger){
    const change=open=>{contact.classList.toggle('open',open);trigger.setAttribute('aria-expanded',String(open));trigger.setAttribute('aria-label',open?'Cerrar opciones de contacto':'Abrir opciones de contacto SIAMA')};
    trigger.addEventListener('click',()=>change(!contact.classList.contains('open')));
    document.addEventListener('click',e=>{if(!contact.contains(e.target))change(false)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')change(false)});
  }

  // Area tabs
  $$('.coverage-tabs button').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.coverage-tabs button').forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))});
    $$('.coverage-panel').forEach(panel=>{panel.hidden=panel.id!=='panel-'+btn.dataset.tab});
  }));

  // Marketing measurement only on explicit consent. No fake conversion IDs or ad pixels.
  const CONSENT_KEY='siama_ads_consent_v2';
  const consent=safeStore.get(CONSENT_KEY);
  const adsBanner=$('#consent-banner');
  const attributionKeys=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid'];
  let attribution={};
  function storeAttribution(){
    const params=new URLSearchParams(location.search);
    attributionKeys.forEach(k=>{const v=params.get(k);if(v)attribution[k]=v.slice(0,180)});
    if(Object.keys(attribution).length){attribution.landing_page=location.pathname;attribution.captured_at=new Date().toISOString();safeStore.set('siama_campaign',JSON.stringify(attribution))}
    else {try{attribution=JSON.parse(safeStore.get('siama_campaign')||'{}')||{}}catch{attribution={}}}
  }
  function startAds(){
    storeAttribution();
    const id=window.SIAMA_GOOGLE_ADS_ID;
    if(!/^AW-\d{6,20}$/.test(id||''))return;
    if(window.gtag)return;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments)};
    window.gtag('js',new Date());
    window.gtag('config',id,{send_page_view:true});
    const script=document.createElement('script');
    script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    document.head.appendChild(script);
  }
  if(consent==='yes')startAds();
  if(adsBanner && consent!=='yes' && consent!=='no')adsBanner.hidden=false;
  $('#accept-ads')?.addEventListener('click',()=>{safeStore.set(CONSENT_KEY,'yes');adsBanner.hidden=true;startAds()});
  $('#reject-ads')?.addEventListener('click',()=>{const previouslyAccepted=safeStore.get(CONSENT_KEY)==='yes';safeStore.set(CONSENT_KEY,'no');adsBanner.hidden=true;if(previouslyAccepted)location.reload()});
  $('#manage-consent')?.addEventListener('click',()=>{if(adsBanner){adsBanner.hidden=false;adsBanner.scrollIntoView({block:'nearest'})}});
  function eventTrack(action,extras={}) {
    if(safeStore.get(CONSENT_KEY)!=='yes'||typeof window.gtag!=='function')return;
    const kind=action.startsWith('call')?'call':'whatsapp';
    window.gtag('event',kind==='call'?'phone_click':'whatsapp_click',{event_category:'contact_click',event_label:action,...extras});
    const config=window.SIAMA_GOOGLE_ADS_CONVERSIONS||{};
    const sendTo=kind==='call'?config.call:config.whatsapp;
    if(typeof sendTo==='string'&&/^AW-\d{6,20}\/.+/.test(sendTo))window.gtag('event','conversion',{send_to:sendTo});
  }
  $$('.track').forEach(link=>link.addEventListener('click',()=>eventTrack(link.dataset.action||'whatsapp_general')));

  // Quote form always opens an actionable WhatsApp draft; no server, no medical records stored.
  const quote=$('#quote-form');
  if(quote){
    const summary=$('#estimate-summary'),priceEl=$('#estimate-price'),disclaimer=$('#estimate-disclaimer'),error=$('#form-error');
    const entries=()=>Object.fromEntries(new FormData(quote).entries());
    const digits=(s)=>String(s||'').replace(/\D/g,'');
    const money=value=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(value);
    const safeNumber=x=>Number.isFinite(Number(x))?Number(x):null;
    function estimateQuote(data){
      const tariffs=window.SIAMA_TARIFAS;
      if(!tariffs?.activo)return null;
      const cfg=tariffs.servicios?.[data.service];
      if(!cfg)return null;
      const base=safeNumber(cfg.baseMXN),included=safeNumber(cfg.kmIncluidos),perKm=safeNumber(cfg.precioPorKmMXN),km=safeNumber(data.distance);
      if(cfg.baseMXN==null||cfg.kmIncluidos==null||cfg.precioPorKmMXN==null||km==null||km<=0||base<0||included<0||perKm<0)return null;
      const amount=base+Math.max(0,km-included)*perKm;
      return Number.isFinite(amount)&&amount>=0?Math.round(amount):null;
    }
    function updateQuote(){
      const d=entries(),route=(d.origin&&d.destination)?`${d.origin} → ${d.destination}`:'Ruta pendiente',service=d.service||'Servicio pendiente',when=d.when||'Horario por definir';
      const complete=[d.service,d.when,d.origin,d.destination,d.name,d.phone].filter(x=>String(x||'').trim()).length;
      const label=$('#quote-progress-label'),fill=$('#quote-progress-fill');
      if(label)label.textContent=`${complete} de 6 datos esenciales`;
      if(fill)fill.style.width=`${complete*(100/6)}%`;
      summary.textContent=`${service} · ${route} · ${when}${d.distance?' · '+d.distance+' km estimados':''}`;
      const estimate=estimateQuote(d);
      priceEl.textContent=estimate!==null?`${money(estimate)} MXN · estimado no vinculante`:'Tarifa por confirmar con SIAMA';
      disclaimer.textContent=estimate!==null?'Monto orientativo calculado con tarifas configuradas. No incluye situaciones extraordinarias. SIAMA debe confirmar el precio final.':'No se realiza ningún cobro en esta página.';
    }
    $$('.intent-card').forEach(btn=>btn.addEventListener('click',()=>{
      const service=$('#service'),when=quote.elements.when;
      service.value=btn.dataset.intentService||'';
      if(when)when.value=btn.dataset.intentWhen||'';
      updateQuote();
      document.querySelector('#cotizar')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
    }));
    $('#swap-route')?.addEventListener('click',()=>{
      const origin=$('#origin'),destination=$('#destination');
      [origin.value,destination.value]=[destination.value,origin.value];
      updateQuote();
    });
    $('#locate-me')?.addEventListener('click',()=>{
      const note=$('#location-note'),btn=$('#locate-me');
      if(!navigator.geolocation){note.textContent='Tu navegador no admite geolocalización. Escribe tu colonia o un punto de referencia.';return}
      note.textContent='Solicitando permiso para usar tu ubicación…';btn.disabled=true;
      navigator.geolocation.getCurrentPosition(position=>{
        const {latitude,longitude,accuracy}=position.coords;
        $('#origin').value=`Mi ubicación (${latitude.toFixed(5)}, ${longitude.toFixed(5)}) · https://maps.google.com/?q=${latitude.toFixed(5)},${longitude.toFixed(5)}`;
        note.textContent=`Ubicación agregada al origen (precisión estimada ${Math.round(accuracy)} m). Revisa la información antes de enviarla.`;
        btn.disabled=false;updateQuote();
      },()=>{note.textContent='No se pudo obtener tu ubicación. Puedes escribir tu colonia, hospital o dirección manualmente.';btn.disabled=false;},{enableHighAccuracy:false,timeout:11000,maximumAge:60000});
    });
    quote.addEventListener('input',updateQuote);
    quote.addEventListener('change',updateQuote);
    updateQuote();
    // Prefill from service cards
    $$('.prefill[data-service]').forEach(a=>a.addEventListener('click',()=>{
      const field=$('#service');if(field){field.value=a.dataset.service;updateQuote()}
    }));
    const dateField=$('#service-date');if(dateField){
      const today=new Date();const local=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;dateField.min=local;
    }
    quote.addEventListener('submit',e=>{
      e.preventDefault();error.hidden=true;
      const d=entries(),phone=digits(d.phone);
      if(!quote.checkValidity()){
        error.textContent='Completa los campos obligatorios y acepta el aviso de privacidad para preparar tu solicitud.';
        error.hidden=false;quote.reportValidity();return;
      }
      if(phone.length<10||phone.length>13){
        error.textContent='Introduce un teléfono de contacto válido (10 dígitos en México).';error.hidden=false;quote.elements.phone.focus();return;
      }
      if(d.when==='Otra fecha'&&!d.date){error.textContent='Selecciona la fecha en la que necesitas el servicio.';error.hidden=false;dateField.focus();return}
      // Avoid accidental outdated date; date control already restricts earlier dates for direct changes
      const reference=`SIAMA-${Date.now().toString(36).toUpperCase().slice(-7)}`;
      const parts=[
        '*SOLICITUD DE COTIZACIÓN · SIAMA*',
        `Folio: ${reference}`,
        `Servicio: ${d.service}`,
        `Momento: ${d.when}`,
        d.date?`Fecha solicitada: ${d.date}`:null,
        `Origen: ${d.origin}`,
        `Destino: ${d.destination}`,
        d.distance?`Distancia aproximada (indicada por el cliente): ${d.distance} km`:null,
        d.mobility?`Movilidad: ${d.mobility}`:null,
        d.journey?`Recorrido: ${d.journey}`:null,
        `Contacto: ${d.name}`,
        `Teléfono: ${d.phone}`,
        d.notes?`Observaciones: ${d.notes}`:null,
      ].filter(Boolean);
      const estimate=estimateQuote(d);
      if(estimate!==null)parts.push(`Estimado web NO VINCULANTE: ${money(estimate)} MXN. Solicito confirmar precio y disponibilidad.`);
      else parts.push('Solicito confirmar disponibilidad y tarifa del servicio.');
      if(safeStore.get(CONSENT_KEY)==='yes'&&attribution.utm_campaign)parts.push(`Referencia de campaña: ${attribution.utm_campaign}`);
      parts.push('Enviado desde siamaambulancias.com.mx');
      eventTrack('whatsapp_quote_form',{form_name:'cotizacion_siama',service_type:d.service});
      const url=`https://wa.me/${TEL}?text=${encodeURIComponent(parts.join('\n'))}`;
      // Direct navigation avoids popup blocking on Android, iOS and desktop browsers.
      window.location.assign(url)
    });
  }
  // Visual progress, uses passive scroll listener and requests animation frames for efficiency.
  const meter=$('#scroll-meter-fill');
  if(meter){let ticking=false;const update=()=>{const range=document.documentElement.scrollHeight-innerHeight;meter.style.transform=`scaleX(${range>0?Math.min(1,scrollY/range):0})`;ticking=false};addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});update();}
  // FAQ search filters answers on device; never sends visitor questions to a server.
  const faqSearch=$('#faq-search');
  if(faqSearch){const details=$$('.faq-list details'),empty=$('#faq-empty');faqSearch.addEventListener('input',()=>{const term=faqSearch.value.toLocaleLowerCase('es-MX').trim();let count=0;details.forEach(d=>{const show=!term||d.textContent.toLocaleLowerCase('es-MX').includes(term);d.hidden=!show;if(show)count++});if(empty)empty.hidden=count!==0});}

})();
