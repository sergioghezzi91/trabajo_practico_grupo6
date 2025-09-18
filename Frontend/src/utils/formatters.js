/**
 * Utilidades para formateo de datos
 */

/**
 * Capitaliza la primera letra de una cadena
 * @param {string} str - Cadena a capitalizar
 * @returns {string} - Cadena capitalizada
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitaliza cada palabra de una cadena
 * @param {string} str - Cadena a formatear
 * @returns {string} - Cadena con cada palabra capitalizada
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => capitalize(word)).join(' ');
};

/**
 * Trunca un texto si excede la longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Formatea un email para mostrar solo la parte antes del @
 * @param {string} email - Email a formatear
 * @returns {string} - Parte del usuario del email
 */
export const formatEmailUser = (email) => {
  if (!email) return '';
  return email.split('@')[0];
};

/**
 * Formatea una fecha para mostrar en formato legible
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formatea una lista de elementos para mostrar como texto
 * @param {Array} items - Array de elementos
 * @param {string} property - Propiedad a mostrar de cada elemento
 * @param {string} separator - Separador entre elementos
 * @returns {string} - Lista formateada como texto
 */
export const formatList = (items, property = 'nombre', separator = ', ') => {
  if (!Array.isArray(items) || items.length === 0) return 'Ninguno';
  
  return items.map(item => 
    typeof item === 'object' ? item[property] : item
  ).join(separator);
};

/**
 * Limpia y formatea un nombre eliminando espacios extra
 * @param {string} name - Nombre a limpiar
 * @returns {string} - Nombre limpio
 */
export const cleanName = (name) => {
  if (!name) return '';
  return name.trim().replace(/\s+/g, ' ');
};