/**
 * TARIFAS AUTORIZADAS POR SIAMA.
 * La función de cálculo automático está implementada, pero NO publica precios inventados.
 * Para habilitarla, valida la tarifa real de cada servicio con SIAMA, cambia activo a true
 * y configura baseMXN, kmIncluidos y precioPorKmMXN para los servicios que correspondan.
 * Una cotización final depende del recorrido y de la disponibilidad y siempre requiere confirmación.
 */
window.SIAMA_TARIFAS = {
  activo: false,
  moneda: 'MXN',
  servicios: {
    'Traslado programado': {baseMXN: null, kmIncluidos: null, precioPorKmMXN: null},
    'Ambulancia urgente': {baseMXN: null, kmIncluidos: null, precioPorKmMXN: null},
    'Traslado especializado': {baseMXN: null, kmIncluidos: null, precioPorKmMXN: null},
    'Enfermería a domicilio': {baseMXN: null, kmIncluidos: null, precioPorKmMXN: null},
    'Cobertura para eventos': {baseMXN: null, kmIncluidos: null, precioPorKmMXN: null},
    'Capacitación y asesoría': {baseMXN: null, kmIncluidos: null, precioPorKmMXN: null}
  }
};
