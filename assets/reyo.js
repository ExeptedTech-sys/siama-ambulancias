/* REYO ASSISTANT BASIC · SIAMA / ExeptedTech Luvia Company.
   Transparent local knowledge assistant: no external AI calls, no chat storage, no fake live availability.
   A cloud LLM would require a separate secure backend; no API credentials in GitHub Pages. */
(()=>{'use strict';
  const $=(s,root=document)=>root.querySelector(s);
  const body=document.body;
  const wrapper=document.createElement('div');
  wrapper.innerHTML=`
    <button type="button" id="reyo-launch" class="reyo-launch" aria-haspopup="dialog" aria-controls="reyo-panel" aria-expanded="false" aria-label="Abrir REYO ASSISTANT, orientación SIAMA"><img src="assets/reyo-assistant.webp" alt="" width="48" height="48"><span><b>REYO ASSISTANT</b><small>Ayuda y cotización · BASIC</small></span></button>
    <div class="reyo-overlay" id="reyo-overlay" hidden></div>
    <section class="reyo-panel" id="reyo-panel" role="dialog" aria-modal="true" aria-labelledby="reyo-title" aria-describedby="reyo-subtitle" hidden>
      <div class="reyo-head"><img src="assets/reyo-assistant.webp" width="49" height="49" alt="Emblema de REYO ASSISTANT"><div class="reyo-head-meta"><h2 id="reyo-title">REYO ASSISTANT</h2><p id="reyo-subtitle">Dev ExeptedTech Luvia Company<br>Versión Prueba para Clientes - BASIC</p></div><button id="reyo-close" type="button" class="reyo-close" aria-label="Cerrar asistente">×</button></div>
      <div class="reyo-status"><strong>Asistente virtual SIAMA</strong> · Respuestas automáticas locales. No diagnostica, cotiza precios finales ni despacha unidades.</div>
      <div class="reyo-switch" role="tablist" aria-label="Opciones REYO"><button type="button" id="reyo-tab-chat" role="tab" aria-selected="true" aria-controls="reyo-view-chat">Consultar a REYO</button><button type="button" id="reyo-tab-quote" role="tab" aria-selected="false" aria-controls="reyo-view-quote">Cotización express</button></div>
      <div id="reyo-view-chat" class="reyo-view" role="tabpanel" aria-labelledby="reyo-tab-chat"><div id="reyo-log" class="reyo-messages" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversación REYO"></div><div id="reyo-pills" class="reyo-pills"><button type="button" data-ask="Necesito un traslado de hospital a domicilio">Hospital a casa</button><button type="button" data-ask="¿Cuánto cuesta un traslado?">Precios</button><button type="button" data-ask="¿Cubren el Estado de México?">Cobertura</button><button type="button" data-ask="¿Cuánto tarda en llegar?">Disponibilidad</button></div><form class="reyo-chat-form" id="reyo-chat-form"><input id="reyo-input" maxlength="320" autocomplete="off" aria-label="Escribe tu pregunta sin datos médicos sensibles" placeholder="Pregúntame por tu traslado..." required><button type="submit">Enviar</button></form></div>
      <div id="reyo-view-quote" class="reyo-view" role="tabpanel" aria-labelledby="reyo-tab-quote" hidden><div class="reyo-quote"><h3>Prepara tu traslado</h3><p>En menos pasos. REYO organiza la solicitud para WhatsApp; un asesor de SIAMA confirma tarifa y disponibilidad.</p><form id="reyo-quote-form" novalidate><label>Tipo de servicio *<select name="service" required><option value="">Seleccionar servicio</option><option>Traslado programado</option><option>Ambulancia urgente</option><option>Traslado especializado</option><option>Enfermería a domicilio</option><option>Cobertura para eventos</option></select></label><label>¿Desde dónde? *<input name="origin" maxlength="140" autocomplete="street-address" placeholder="Hospital, colonia o municipio" required></label><label>¿Hacia dónde? *<input name="destination" maxlength="140" placeholder="Domicilio, hospital o clínica" required></label><div class="reyo-fields"><label>¿Cuándo? *<select name="when" required><option value="">Seleccionar</option><option>Lo antes posible</option><option>Hoy, programado</option><option>Mañana</option><option>Otra fecha (acordar)</option></select></label><label>Movilidad <small>(opcional)</small><select name="mobility"><option value="">Por confirmar</option><option>Camilla</option><option>Silla de ruedas</option><option>Camina con apoyo</option><option>Solicito orientación</option></select></label></div><div class="reyo-fields"><label>Tu nombre *<input name="name" maxlength="80" autocomplete="name" required placeholder="Nombre de contacto"></label><label>Tu celular *<input name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" required placeholder="10 dígitos"></label></div><label class="reyo-consent"><input type="checkbox" name="privacy" required><span>Acepto compartir estos datos con SIAMA mediante WhatsApp y he leído el <a href="privacidad.html" target="_blank" rel="noopener">aviso de privacidad</a>.</span></label><p id="reyo-form-error" class="reyo-warning" role="alert" hidden></p><button class="reyo-submit" type="submit">Preparar solicitud en WhatsApp →</button><p class="reyo-quote-note">No se envía nada sin tu acción en WhatsApp. Evita escribir diagnósticos o información clínica. Si hay peligro de vida, llama al <a href="tel:911">911</a>.</p></form></div></div>
    </section>`;
  while(wrapper.firstChild)body.appendChild(wrapper.firstChild);
  const launch=$('#reyo-launch'),panel=$('#reyo-panel'),overlay=$('#reyo-overlay'),close=$('#reyo-close'),input=$('#reyo-input'),log=$('#reyo-log');
  let beforeOpen=null,hasWelcomed=false;
  const WA='525555004337';
  // On iOS/Android, keep the dialog within the real visible area when the keyboard opens.
  function syncViewport(){
    if(window.matchMedia('(max-width:600px)').matches&&window.visualViewport){
      panel.style.height=Math.round(window.visualViewport.height)+'px';
      panel.style.top=Math.round(window.visualViewport.offsetTop)+'px';
      panel.style.bottom='auto';
    }else{panel.style.height='';panel.style.top='';panel.style.bottom='';}
  }
  window.visualViewport?.addEventListener('resize',()=>{if(!panel.hidden)requestAnimationFrame(syncViewport)});
  window.visualViewport?.addEventListener('scroll',()=>{if(!panel.hidden)requestAnimationFrame(syncViewport)});
  window.addEventListener('resize',()=>{if(!panel.hidden)requestAnimationFrame(syncViewport)},{passive:true});
  const reduced=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  function open(tab='chat'){
    beforeOpen=document.activeElement;
    panel.hidden=false;syncViewport();overlay.hidden=false;body.classList.add('reyo-open');launch.setAttribute('aria-expanded','true');launch.hidden=true;
    switchTab(tab);if(!hasWelcomed){message('Hola. Soy REYO ASSISTANT de SIAMA. Resuelvo preguntas frecuentes sobre traslados en CDMX y Edomex, y te ayudo a preparar una cotización. No tengo información de ambulancias en tiempo real. Si hay riesgo inmediato para la vida, llama al 911.','assistant','general');hasWelcomed=true}
    if(tab==='quote')$('#reyo-quote-form select[name=service]').focus({preventScroll:true});else input.focus({preventScroll:true});
    window.SIAMA_TRACK?.('reyo_open',{origin:'assistant'});
  }
  function hide(){panel.style.height='';panel.style.top='';panel.style.bottom='';panel.hidden=true;overlay.hidden=true;body.classList.remove('reyo-open');launch.hidden=false;launch.setAttribute('aria-expanded','false');(beforeOpen?.isConnected?beforeOpen:launch).focus({preventScroll:true})}
  function switchTab(tab){const quote=tab==='quote';$('#reyo-view-chat').hidden=quote;$('#reyo-view-quote').hidden=!quote;$('#reyo-tab-chat').setAttribute('aria-selected',String(!quote));$('#reyo-tab-quote').setAttribute('aria-selected',String(quote));}
  function createLink(txt,url){const el=document.createElement('a');el.textContent=txt;el.href=url; if(url.startsWith('https://')){el.target='_blank';el.rel='noopener noreferrer';}return el;}
  function message(text,role='assistant',category='general',urgent=false){
    const el=document.createElement('div');el.className='reyo-message';el.dataset.role=role;if(urgent)el.dataset.alert='true';
    const paragraph=document.createElement('p');paragraph.textContent=text;el.append(paragraph);
    if(role==='assistant'){
      const actions=document.createElement('div');actions.className='reyo-msg-actions';
      if(urgent){actions.append(createLink('Llamar al 911','tel:911'))}
      else{
        const quote=document.createElement('button');quote.type='button';quote.textContent='Cotización express';quote.addEventListener('click',()=>switchTab('quote'));actions.append(quote);
        actions.append(createLink('WhatsApp SIAMA','https://wa.me/'+WA+'?text='+encodeURIComponent('Hola SIAMA, consulté a REYO sobre '+category+' y quiero atención de un asesor.')));
        actions.append(createLink('Llamar a SIAMA','tel:+525555004337'));
      }
      el.append(actions);
    }
    log.append(el);while(log.children.length>25)log.firstElementChild.remove();log.scrollTop=log.scrollHeight;
  }
  function normalize(t){return String(t||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
  function classify(raw){const t=normalize(raw),has=re=>re.test(t);
    if(has(/(?:no respira|sin respirar|inconsciente|no despierta|convulsion|paro cardiaco|dolor (muy )?(fuerte|intenso) (en el )?pecho|se desangra|derrame cerebral|accidente grave|intento de suicidio|riesgo de muerte|riesgo vital|se esta ahogando|asfixi)/))return {urgent:true,category:'emergencia',answer:'Esto puede representar una emergencia vital. Llama al 911 ahora; explica tu ubicación y sigue las instrucciones del operador. REYO no es un servicio de urgencias ni puede enviar ambulancias. No esperes una cotización.'};
    if(has(/(?:emergencia|urgente|auxilio|ya mismo|ahora mismo)/))return {urgent:true,category:'urgencia',answer:'Si hay peligro inmediato para la vida, llama al 911. Para preguntar por una ambulancia privada sin riesgo vital inmediato, llama a SIAMA al 55 5500 4337. REYO no confirma tiempos ni activa unidades.'};
    if(has(/(?:evento|eventos|concierto|festival|rodaje|deportivo)/)&&!has(/(?:cuanto cuesta|precio|costo|tarifa)/))return {category:'eventos',answer:'Puedes solicitar a SIAMA información de cobertura preventiva para eventos. Indica sede, fecha, horarios y aforo aproximado para que el equipo revise una propuesta y confirme disponibilidad.'};
    if(has(/(?:precio|costo|cuanto cuesta|tarifa|cotiz|presupuesto|factur|deposito|pago)/))return {category:'precios',answer:'La tarifa de una ambulancia privada depende de origen, destino, fecha, modalidad y apoyo requerido. No tengo precios autorizados ni calculo importes ficticios. Puedes preparar una solicitud en Cotización express y SIAMA confirmará la tarifa final.'};
    if(has(/(?:edomex|estado de mexico|naucalpan|tlalnepantla|atizapan|huixquilucan|ecatepec|izcalli|nezahualcoyotl|municipio|cobertura|colonia|alcaldia|zona)/))return {category:'cobertura',answer:'SIAMA recibe solicitudes de traslados en Ciudad de México y zonas del Estado de México. Para una ruta desde Naucalpan, Tlalnepantla u otro municipio, proporciona punto de salida, destino y fecha. La disponibilidad se confirma con el personal de SIAMA.'};
    if(has(/(?:disponib|cuanto tarda|en cuanto tiempo|llega|demora|tiempo de llegada|hoy|horario|24 horas|24\/7)/))return {category:'disponibilidad',answer:'SIAMA informa contacto telefónico las 24 horas. La disponibilidad de unidad, horario y tiempo de llegada no se consultan en tiempo real desde REYO. Para confirmar ahora, llama al 55 5500 4337.'};
    if(has(/(?:camilla|silla de ruedas|oxigeno|ventilador|monitor|soporte|equip|medico|paramedico|enfermer)/))return {category:'equipamiento',answer:'El tipo de unidad, equipo y acompañamiento se revisa de acuerdo con las necesidades del traslado. Para solicitar camilla, apoyo de movilidad o equipamiento específico, indícalo a SIAMA; REYO no evalúa condiciones clínicas ni confirma unidades.'};
    if(has(/(?:eventos|evento|empresa|festival|concierto|rodaje|deportivo)/))return {category:'eventos',answer:'Puedes solicitar a SIAMA información de cobertura preventiva para eventos. Indica sede, fecha, horarios y aforo aproximado para que el equipo revise una propuesta y confirme disponibilidad.'};
    if(has(/(?:hospital|alta medica|domicilio|casa|consulta|estudio|traslado|ambulancia particular|paciente|clinica)/))return {category:'traslado hospitalario',answer:'Para traslado de hospital a domicilio, domicilio a hospital o entre clínicas, prepara origen, destino, fecha y cómo se moverá la persona (camilla, silla de ruedas u otro apoyo). REYO puede organizar la solicitud; un asesor confirma la opción disponible.'};
    if(has(/(?:privacidad|datos|seguridad|graban|guardan|ia|inteligencia artificial|robot)/))return {category:'privacidad',answer:'Esta versión BASIC responde mediante una base local de preguntas y no utiliza un modelo generativo ni envía tu conversación a servicios externos. No escribas datos médicos sensibles. La cotización solo se comparte al abrir y enviar el mensaje en WhatsApp. Consulta el aviso de privacidad para más información.'};
    if(has(/(?:hola|buenas|ayuda|contacto|telefono|whatsapp|como funciona)/))return {category:'contacto',answer:'Soy REYO ASSISTANT BASIC, el asistente virtual de SIAMA, desarrollado por ExeptedTech Luvia Company. Puedo orientarte sobre traslados, precios, cobertura y disponibilidad; también preparar la solicitud para que un asesor humano te responda.'};
    return {category:'consulta general',answer:'No tengo una respuesta verificada para esa pregunta. Puedo orientarte sobre traslados, tarifas, cobertura, horarios y equipamiento. Para recibir información exacta de tu servicio, utiliza Cotización express o comunícate con SIAMA.'};
  }
  function ask(question){const txt=String(question||'').trim().slice(0,320);if(!txt)return;message(txt,'user');const res=classify(txt);message(res.answer,'assistant',res.category,!!res.urgent);window.SIAMA_TRACK?.('reyo_question',{topic:res.category});}
  launch.addEventListener('click',()=>open());close.addEventListener('click',hide);overlay.addEventListener('click',hide);
  $('#reyo-tab-chat').addEventListener('click',()=>{switchTab('chat');input.focus({preventScroll:true})});$('#reyo-tab-quote').addEventListener('click',()=>{switchTab('quote');$('#reyo-quote-form select[name=service]').focus({preventScroll:true})});
  $('#reyo-chat-form').addEventListener('submit',e=>{e.preventDefault();const val=input.value;input.value='';ask(val);input.focus({preventScroll:true})});
  document.querySelectorAll('[data-ask]').forEach(el=>el.addEventListener('click',()=>ask(el.dataset.ask)));
  document.querySelectorAll('[data-open-reyo]').forEach(el=>el.addEventListener('click',()=>open(el.dataset.openReyo||'chat')));
  panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();hide()}else if(e.key==='Tab'){
    const els=[...panel.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled])')].filter(x=>x.getClientRects().length);if(!els.length)return;const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)hide()});
  const qform=$('#reyo-quote-form');qform.addEventListener('submit',e=>{
    e.preventDefault();const error=$('#reyo-form-error');error.hidden=true;
    if(!qform.checkValidity()){error.hidden=false;error.textContent='Completa los campos obligatorios y autoriza compartir la solicitud. No incluyas datos clínicos.';qform.reportValidity();return}
    const d=Object.fromEntries(new FormData(qform).entries());const digits=String(d.phone||'').replace(/\D/g,'');if(digits.length<10||digits.length>13){error.hidden=false;error.textContent='Escribe un número de contacto válido, de preferencia 10 dígitos.';qform.elements.phone.focus();return}
    const message=['*COTIZACIÓN EXPRESS · REYO ASSISTANT BASIC · SIAMA*','Servicio: '+d.service,'Origen: '+d.origin,'Destino: '+d.destination,'Cuándo: '+d.when,d.mobility?'Apoyo: '+d.mobility:null,'Contacto: '+d.name,'Teléfono: '+d.phone,'Solicito confirmar precio, disponibilidad y tipo de unidad.','Preparado con REYO Assistant de ExeptedTech Luvia Company.'].filter(Boolean).join('\n');
    window.SIAMA_TRACK?.('reyo_quote_whatsapp_open',{service_type:d.service});
    // The user must confirm the actual message in WhatsApp; no booking is falsely recorded.
    window.location.assign('https://wa.me/'+WA+'?text='+encodeURIComponent(message));
  });
  window.REYO_ASSISTANT={open,ask};
})();
