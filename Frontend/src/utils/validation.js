/**
 * Utilidades para validación de datos
 */

/**
 * Valida si un email tiene formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si un string no está vacío
 * @param {string} value - Valor a validar
 * @returns {boolean} - True si no está vacío
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Valida si un número es positivo
 * @param {number} value - Número a validar
 * @returns {boolean} - True si es positivo
 */
export const isPositiveNumber = (value) => {
  return !isNaN(value) && value > 0;
};

/**
 * Valida los datos de un estudiante
 * @param {Object} estudiante - Datos del estudiante
 * @returns {Object} - Objeto con isValid y errores
 */
export const validateEstudiante = (estudiante) => {
  const errors = {};
  
  if (!isNotEmpty(estudiante.nombre)) {
    errors.nombre = 'El nombre es requerido';
  }
  
  if (!isNotEmpty(estudiante.email)) {
    errors.email = 'El email es requerido';
  } else if (!isValidEmail(estudiante.email)) {
    errors.email = 'El formato del email no es válido';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valida los datos de un curso
 * @param {Object} curso - Datos del curso
 * @returns {Object} - Objeto con isValid y errores
 */
export const validateCurso = (curso) => {
  const errors = {};
  
  if (!isNotEmpty(curso.nombre)) {
    errors.nombre = 'El nombre del curso es requerido';
  }
  
  if (curso.descripcion && curso.descripcion.length > 500) {
    errors.descripcion = 'La descripción no puede exceder 500 caracteres';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};