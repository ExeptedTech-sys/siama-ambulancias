# Resultado de comprobaciones · SIAMA REYO BASIC

Fecha: 1 de noviembre de 2026.

## Ejecutado en este paquete
- 7 páginas HTML inspeccionadas: enlaces internos y archivos referenciados presentes; etiquetas H1 y canonical en páginas comerciales.
- 7 URLs del sitemap comprobadas contra archivos locales.
- Validación sintáctica Node.js de los scripts JS sin errores.
- Análisis sintáctico de hojas CSS con tinycss2 sin errores.
- Datos estructurados JSON-LD procesables sin errores de JSON.
- 9 preguntas de prueba del motor de intención REYO: costos, altas médicas, cobertura, emergencia, tiempos, contacto, equipo, eventos y solicitud sin coincidencia.
- Configuración GitHub Pages corregida: `.github/workflows/deploy.yml` usa la raíz, no `dist`.

## Alcance y limitaciones
- Se intentó una prueba automatizada Chromium/Playwright, pero este entorno bloqueó la navegación con `ERR_BLOCKED_BY_ADMINISTRATOR`, incluso para URLs locales. No se pudo comprobar una captura ni la interacción visual real en navegador.
- No se dispone de credenciales de Google Ads, por lo que los eventos están preparados pero no se han probado contra una cuenta/ID real.
- No se pudo enviar una cotización a WhatsApp, dado que eso exigiría interacción real con el servicio. Se preparan enlaces oficiales `wa.me`.
- El funcionamiento en dispositivos Android, iOS, diversas resoluciones, rendimiento en red real y despliegue público requiere prueba después de publicar.
- Esta versión REYO BASIC es un asistente de reglas y respuestas locales; no usa un LLM ni una API de IA externa.
