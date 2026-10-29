# SIAMA Ambulancias · Renovación 2026

Web estática y responsive para GitHub Pages, sin compilador, pagos ni base de datos. Incluye diseño rojo candy + negro, fotografías aportadas del personal SIAMA y recursos optimizados, accesos de llamada y WhatsApp, formulario inteligente, SEO local, páginas específicas por intención de búsqueda, páginas legales y medición publicitaria bajo consentimiento.

## Desplegar en GitHub Pages

1. Descomprime el ZIP y **sube el contenido de `siama-ambulancias-main/` a la raíz del repositorio** (incluye `.github/`, `assets/`, `index.html` y `CNAME`). No subas la carpeta contenedora como un nivel extra.
2. Revisa que `CNAME` tenga el dominio `siamaambulancias.com.mx`, tal como estaba en tu proyecto anterior.
3. En GitHub, en **Settings → Pages**, selecciona **GitHub Actions** como fuente de publicación.
4. Haz un commit a `main` o `master`. El workflow `.github/workflows/deploy.yml` publica la raíz automáticamente.
5. Verifica en la web los botones, enlaces, consentimiento y cotizador.

## Verificaciones OBLIGATORIAS antes de publicar

- **Google Ads**: el ZIP original ya tenía valores de ejemplo `AW-XXXXXXXXX` y conversiones vacías, no el ID real. Configura `assets/google-ads-config.js` con el **ID y las conversiones actuales de tu cuenta**. No es posible inferirlos desde el ZIP ni acceder a tu Google Ads. El sitio carga la etiqueta **solo después del consentimiento**. Verifica en Tag Assistant y Google Ads.
- **Datos legales**: `privacidad.html` y `terminos.html` son borradores actualizados y requieren completar **razón social/nombre legal y domicilio del responsable**, políticas de pagos, cancelaciones, seguridad y conservación, además de revisión jurídica. Las indicaciones pendientes se muestran dentro de ambas páginas para evitar falsa apariencia de cumplimiento.
- **Cotización con precios**: el formulario ya organiza la solicitud, genera un folio y abre WhatsApp **+52 55 5500 4337**; no hace reservas ni cobra. Para habilitar un estimado numérico, configura exclusivamente **tarifas aprobadas y vigentes** en `assets/tarifas.js` y activa `activo:true`. Al no contar con tarifas oficiales, se muestra "Tarifa por confirmar con SIAMA". El cálculo requiere distancia introducida manualmente; no hay geocodificación integrada ni garantía de distancia real.
- **Servicios y disponibilidad**: valida que los servicios descritos y cobertura de zonas sigan vigentes. No se prometen minutos de respuesta, acreditaciones, convenios, reseñas o cifras no demostradas.
- **Logotipo e imágenes**: se mantienen los recursos originales; se agregan imágenes ilustrativas generadas para presentación visual. La ilustración de ambulancia no necesariamente corresponde a una unidad real.
- **Google Search Console**: verifica dominio y envía `https://siamaambulancias.com.mx/sitemap.xml`. Conviene conectar el Perfil de Empresa de Google y revisar consistencia del nombre/teléfono/domicilio real con el sitio.

## Cómo usar el cotizador

El visitante elige servicio, momento, origen, destino, teléfono y observaciones opcionales. Ve un resumen dinámico. Al pulsar **Enviar cotización a WhatsApp**, abre un mensaje precargado para `https://wa.me/525555004337`. El envío se finaliza en WhatsApp; no existe envío silencioso por API ni backend. No almacenar información médica sensible en los campos.

### Configurar precios autorizados

Edita `assets/tarifas.js`. Cada servicio puede tener: `baseMXN`, `kmIncluidos`, `precioPorKmMXN` y activar `activo:true` si tu política de precios lo permite. Ejemplo de fórmula (no es una tarifa sugerida):

`monto = baseMXN + max(0, kmDeclarados - kmIncluidos) * precioPorKmMXN`.

Se aplica solo si los cuatro parámetros reales están disponibles y el visitante introdujo km. El precio sigue siendo **estimativo y no vinculante**. Para calcular distancias automáticas por direcciones, tarifas según horario o logística compleja, necesitarás un servicio de geocodificación/rutas con API y credenciales, y términos de uso adecuados.

## Privacidad y medición

Se muestra un aviso de consentimiento publicitario. Si la persona rechaza, este código no carga la etiqueta de Google Ads. Si acepta, el sitio puede medir eventos `phone_click`, `whatsapp_click` y conversiones de clic cuando haya etiquetas válidas. **Un clic no equivale a una ambulancia asignada o venta confirmada.** El evento del formulario se envía al abrir el enlace de WhatsApp, no al cerrar una operación. Revisar otros scripts de terceros antes de publicarlos.

## SEO incluido

Metadatos únicos, canonical, Open Graph, `robots.txt`, `sitemap.xml`, datos estructurados de empresa/servicio, jerarquía de encabezados y enlaces internos. Páginas:
- `/traslados-ambulancia-cdmx.html`
- `/ambulancias-edomex.html`
- `/traslados-hospitalarios.html`

Esto mejora el fundamento técnico, **no garantiza la posición 1** ni sustituye contenidos verificables, autoridad, ficha de Google o trabajo continuo de SEO y Ads.

## Créditos

Diseño web SIAMA 2026, sitio preparado con la imagen de marca original. Se mantiene crédito de desarrollo de ExeptedTech. Para consultas urgentes o riesgo vital: 911.


## Novedades versión móvil 2026.2

- Imágenes de paramédico y médico **aportadas por SIAMA**, convertidas a WebP sin manipulación facial, en calidades específicas para móvil y escritorio. Se eliminó la imagen anterior de paramédico sintético de la web. La ambulancia de la tarjeta de equipo sigue identificada como ilustración.
- Módulo de selección rápida de traslado que preselecciona servicio y fecha aproximada.
- Formulario con barra de avance, intercambio de origen/destino, datos opcionales de movilidad y viaje, resumen para WhatsApp.
- Botón voluntario de ubicación actual: usa la API de geolocalización del navegador solamente tras clic y permiso; rellena coordenadas/enlace de Maps en origen, no las almacena ni las envía automáticamente. La persona decide si envía el mensaje de WhatsApp. Requiere sitio HTTPS.
- Filtro local de preguntas frecuentes, barra de lectura, microanimaciones CSS que respetan `prefers-reduced-motion`.
- Metadatos locales reforzados para búsquedas de ambulancias privadas, particulares y traslados en CDMX. Google **no garantiza primeros resultados**. Evitamos páginas engañosas con palabras clave repetidas.

Para un rendimiento óptimo en redes celulares, las fotografías se cargan según el tamaño de pantalla; no hay librerías UI externas.

**Nota:** ninguna cotización se envía sola, el usuario debe pulsar enviar en WhatsApp. Los datos no se reciben en servidor propio. Información de servicios y áreas, Google Ads y documentos legales requieren verificación antes de publicarse.
