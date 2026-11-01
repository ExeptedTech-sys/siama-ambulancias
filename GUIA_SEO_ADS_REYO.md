# SIAMA + REYO ASSISTANT BASIC · Guía de publicación y adquisición

## Implementación realizada (2026-11-01)

- Conservado el diseño y los recursos de la web SIAMA original; componentes nuevos con el rojo SIAMA sobre negro. No se reescribió el estilo existente de móvil.
- Añadido **REYO ASSISTANT**, con el emblema facilitado por el cliente optimizado en `assets/reyo-assistant.webp`, identificación exacta «Dev ExeptedTech Luvia Company · Versión Prueba para Clientes - BASIC».
- Chat de respuestas locales para traslados, cobertura, precios, equipamiento, disponibilidad, privacidad y urgencias; sin credenciales o promesas ficticias. Mensajes no guardados en backend.
- Cotización express desde REYO: servicio, ruta, horario, movilidad, contacto y consentimiento; prepara un WhatsApp dirigido a SIAMA. **La persona debe enviarlo en WhatsApp**. No se puede verificar el envío, ni atribuir una venta real a ese clic.
- SEO mejorado con la guía de altas médicas, títulos/canonical, texto de utilidad, enlaces internos, servicios en datos estructurados y sitemap actualizado.
- REYO disponible en inicio y todas las páginas de servicio; vista móvil ocupa pantalla completa con altura `100dvh`, cierre accesible, modo sin animaciones y foco controlado. La interfaz se crea con JS después de cargar la página.
- Etiqueta de Google Ads configurada solo si el visitante da consentimiento y rellenas **IDs reales**. Acciones independientes: clic llamar, clic WhatsApp y clic tras completar cotización por WhatsApp. Los clics NO confirman venta, atención ni recepción del mensaje.

## Publicar en GitHub Pages

1. Sube el **contenido del ZIP** a la raíz de tu repositorio, sin añadir otra carpeta.
2. El archivo `CNAME` establece `siamaambulancias.com.mx`. Conserva el DNS y HTTPS del dominio real.
3. Ve a Settings > Pages, publica desde **Deploy from a branch**: `main` + `/(root)`, o usa el workflow que tengas realmente configurado. Los archivos son estáticos: no se requiere npm o build.
4. Comprueba `https://siamaambulancias.com.mx/`, las otras páginas y el certificado HTTPS.
5. Search Console: comprueba propiedad, manda `https://siamaambulancias.com.mx/sitemap.xml` y usa Inspección de URLs para probar acceso e indexación. Google decide cuándo y cómo clasificar la página.
6. Verifica también Perfil de Empresa de Google y unifica nombre, teléfono, y domicilio real **solo si existe y tienes permiso para publicarlo**. No se ha inventado una dirección ni se han incluido reseñas o acreditaciones no verificadas.

## Configuración importante de Google Ads

Edita `assets/google-ads-config.js`:

```js
window.SIAMA_GOOGLE_ADS_ID = 'AW-123456789';
window.SIAMA_GOOGLE_ADS_CONVERSIONS = {
  call: 'AW-123456789/ETIQUETA_LLAMAR',
  whatsapp: 'AW-123456789/ETIQUETA_WHATSAPP',
  quote: 'AW-123456789/ETIQUETA_COTIZACION'
};
```

Los anteriores son **ejemplos no válidos**. Sustitúyelos por los valores de tus acciones de conversión REALES de Google Ads. No incluyas una etiqueta en una acción si no la creaste. Un CTA puede contarse si el usuario abre una app aunque no termine la conversación. Para **llamadas efectivas** y **cotizaciones calificadas** considera medición de llamadas desde Ads y conversiones offline/CRM, con el consentimiento y procesos correspondientes.

Eventos emitidos si hay consentimiento: `call_click`, `whatsapp_click`, `quote_whatsapp_open`, `reyo_quote_whatsapp_open`, `reyo_open`, `reyo_question`. Los tres primeros de contacto llevan send_to específico, REYO sin configuración de conversión extra. NO marques a la vez todas esas acciones como **conversiones principales** de optimización de puja, si distorsionan el costo por lead calificado. Recomendación: utilizar **cotización iniciada** como microconversión; una cotización contactada y validada como conversión principal cuando tengas CRM/registro verificable.

**Google Ads Search — propuesta de estructura**:
- Grupo 1: `traslado ambulancia hospital domicilio cdmx`, `ambulancia alta médica cdmx` → `alta-medica-en-ambulancia-cdmx.html`.
- Grupo 2: `traslado en ambulancia cdmx`, `ambulancia particular cdmx cotización` → `index.html#cotizar` o `/traslados-ambulancia-cdmx.html`. Confirma compatibilidad de URL final.
- Grupo 3: `ambulancia privada naucalpan`, `ambulancia edomex traslado` → `/ambulancias-edomex.html`.
- Exclusiones iniciales por intención (revisar periódicamente, no bloquear búsquedas valiosas): `empleo`, `vacantes`, `cursos gratis`, `pdf`, `dibujos`, `imágenes`, `sirena`, `juguete`, `renta sin chofer`.
- Ubicación en campañas: CDMX y municipios de Edomex realmente cubiertos; usa la opción de presencia (no interés) si solo vendes localmente. Valida horarios de respuesta real y asigna presupuesto a búsquedas de alta intención. No prometas «llega en 10 min», «gratis» o disponibilidad si no puedes probarlo.

**Medición de calidad comercial:** número de conversaciones reales atendidas, porcentaje con precio enviado, porcentaje de cotizaciones contratadas, costo por cotización válida, costo por traslado confirmado, rutas más solicitadas. Un clic de WhatsApp NO equivale a un lead atendido.

**Privacidad:** los mensajes escritos al chat permanecen localmente en la sesión, sin conexión externa. La solicitud de cotización se comparte con WhatsApp solo cuando la persona decide enviarla. No almacenar diagnósticos ni información clínica en analítica. Los eventos de Ads no incluyen nombre, dirección, número de teléfono ni respuestas libres.

## Pendientes del propietario

- Introducir IDs verificados de Ads, probar con Tag Assistant y comprobar la acción de conversión.
- Confirmar número `55 5500 4337`, email, nombre y servicios/cobertura vigentes.
- Revisar con asesor jurídico textos `privacidad.html` y `terminos.html`, responsables y datos legales aún pendientes del proyecto base.
- Confirmar recursos y consentimiento para uso comercial de fotografías.
- En caso de querer IA **generativa real** (LLM), desplegar un servidor seguro que guarde las credenciales fuera de GitHub Pages, con políticas de privacidad, control de gasto, registros limitados y filtrado de urgencias. Esta entrega BASIC **no se conecta a una API de IA**. Jamás incrustes una clave de OpenAI en un JS público.

Referencias oficiales: Google Search Central (SEO e indexación) https://developers.google.com/search/docs/fundamentals/seo-starter-guide ; datos estructurados https://developers.google.com/search/docs/appearance/structured-data/local-business ; Google Ads conversiones https://support.google.com/google-ads/answer/6331314 .
