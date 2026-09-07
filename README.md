# Sitio SIAMA Ambulancias

Sitio estático listo para GitHub Pages. Los archivos publicables están en `dist/` y el flujo incluido los publica automáticamente.

## Publicar en GitHub Pages

1. Sube toda esta carpeta a un repositorio de GitHub.
2. En GitHub abre **Settings → Pages**.
3. En **Source**, selecciona **GitHub Actions**.
4. Abre la pestaña **Actions** y espera a que termine `Publicar sitio en GitHub Pages`.

## Google Ads

Edita `dist/assets/google-ads-config.js`:

- `SIAMA_GOOGLE_ADS_ID`: ID global, por ejemplo `AW-123456789`.
- `call` y `whatsapp`: destinos de conversión completos, por ejemplo `AW-123456789/AbCdEfGh`.

La página registra clics en llamada, WhatsApp y el formulario de cotización.

También conserva de forma local los parámetros UTM, GCLID, GBRAID y WBRAID para asociar las solicitudes de WhatsApp con su campaña de origen. Antes de publicar, confirma teléfonos, correo y el texto del aviso de privacidad.
