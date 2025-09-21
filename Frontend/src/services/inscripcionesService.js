import { apiService } from './apiService';
import { API_CONFIG } from '../constants/config';

/**
 * Servicio para manejar operaciones relacionadas con inscripciones
 */
export class InscripcionesService {
  /**
   * Obtiene todas las inscripciones
   * @returns {Promise<Array>} Lista de inscripciones con datos de estudiante y curso
   */
  static async obtenerTodas() {
    try {
      return await apiService.get(API_CONFIG.ENDPOINTS.INSCRIPCIONES);
    } catch (error) {
      throw new Error('Error al obtener la lista de inscripciones');
    }
  }

  /**
   * Obtiene las inscripciones de un estudiante específico
   * @param {number|string} id - ID del estudiante
   * @returns {Promise<Array>} Lista de cursos del estudiante
   */
  static async obtenerPorEstudiante(id) {
    try {
      return await apiService.get(API_CONFIG.ENDPOINTS.INSCRIPCIONES_ESTUDIANTE.replace(':id', id));
    } catch (error) {
      throw new Error(`Error al obtener inscripciones del estudiante ${id}`);
    }
  }

  /**
   * Crea una nueva inscripción
   * @param {Object} datosInscripcion - Datos de la inscripción
   * @param {string} datosInscripcion.nombreEstudiante - Nombre del estudiante
   * @param {string} datosInscripcion.nombreCurso - Nombre del curso
   * @param {string} datosInscripcion.fecha - Fecha de inscripción
   * @returns {Promise<Object>} Inscripción creada
   */
  static async crear(datosInscripcion) {
    try {
      if (!datosInscripcion.nombreEstudiante || !datosInscripcion.nombreCurso || !datosInscripcion.fecha) {
        throw new Error('Todos los campos son requeridos');
      }

      return await apiService.post(API_CONFIG.ENDPOINTS.INSCRIPCIONES, datosInscripcion);
    } catch (error) {
      throw new Error('Error al crear la inscripción');
    }
  }

  /**
   * Actualiza las inscripciones de un estudiante
   * @param {number|string} id - ID del estudiante
   * @param {Array} cursos - Array de IDs de cursos
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async actualizarPorEstudiante(id, cursos) {
    try {
      return await apiService.put(API_CONFIG.ENDPOINTS.ACTUALIZAR_INSCRIPCIONES.replace(':id', id), { cursos });
    } catch (error) {
      throw new Error(`Error al actualizar inscripciones del estudiante ${id}`);
    }
  }

  /**
   * Elimina todas las inscripciones de un estudiante
   * @param {number|string} id - ID del estudiante
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async eliminarPorEstudiante(id) {
    try {
      return await apiService.put(API_CONFIG.ENDPOINTS.ACTUALIZAR_INSCRIPCIONES.replace(':id', id), { cursos: [] });
    } catch (error) {
      throw new Error(`Error al eliminar inscripciones del estudiante ${id}`);
    }
  }
}