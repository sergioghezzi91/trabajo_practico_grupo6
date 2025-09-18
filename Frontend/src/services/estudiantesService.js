import { apiService } from './apiService';
import { API_CONFIG } from '../constants/config';

/**
 * Servicio para manejar operaciones relacionadas con estudiantes
 */
export class EstudiantesService {
  /**
   * Obtiene todos los estudiantes
   * @returns {Promise<Array>} Lista de estudiantes
   */
  static async obtenerTodos() {
    try {
      return await apiService.get(API_CONFIG.ENDPOINTS.ESTUDIANTES);
    } catch (error) {
      throw new Error('Error al obtener la lista de estudiantes');
    }
  }

  /**
   * Obtiene un estudiante por ID
   * @param {number|string} id - ID del estudiante
   * @returns {Promise<Object>} Datos del estudiante
   */
  static async obtenerPorId(id) {
    try {
      return await apiService.get(API_CONFIG.ENDPOINTS.ESTUDIANTE.replace(':id', id));
    } catch (error) {
      throw new Error(`Error al obtener el estudiante con ID ${id}`);
    }
  }

  /**
   * Crea un nuevo estudiante
   * @param {Object} datosEstudiante - Datos del estudiante (nombre, email)
   * @returns {Promise<Object>} Estudiante creado
   */
  static async crear(datosEstudiante) {
    try {
      // Validación básica
      if (!datosEstudiante.nombre || !datosEstudiante.email) {
        throw new Error('Nombre y email son requeridos');
      }

      return await apiService.post(API_CONFIG.ENDPOINTS.CREAR_ESTUDIANTE, datosEstudiante);
    } catch (error) {
      throw new Error('Error al crear el estudiante');
    }
  }

  /**
   * Actualiza un estudiante existente
   * @param {number|string} id - ID del estudiante
   * @param {Object} datosEstudiante - Nuevos datos del estudiante
   * @returns {Promise<Object>} Estudiante actualizado
   */
  static async actualizar(id, datosEstudiante) {
    try {
      return await apiService.put(API_CONFIG.ENDPOINTS.EDITAR_ESTUDIANTE.replace(':id', id), datosEstudiante);
    } catch (error) {
      throw new Error(`Error al actualizar el estudiante con ID ${id}`);
    }
  }

  /**
   * Elimina un estudiante
   * @param {number|string} id - ID del estudiante
   * @returns {Promise<void>}
   */
  static async eliminar(id) {
    try {
      return await apiService.delete(API_CONFIG.ENDPOINTS.ELIMINAR_ESTUDIANTE.replace(':id', id));
    } catch (error) {
      throw new Error(`Error al eliminar el estudiante con ID ${id}`);
    }
  }

  /**
   * Obtiene las inscripciones de un estudiante
   * @param {number|string} id - ID del estudiante
   * @returns {Promise<Array>} Lista de cursos inscritos
   */
  static async obtenerInscripciones(id) {
    try {
      return await apiService.get(API_CONFIG.ENDPOINTS.INSCRIPCIONES_ESTUDIANTE.replace(':id', id));
    } catch (error) {
      // Si no hay inscripciones, retornar array vacío en lugar de error
      console.warn(`No se encontraron inscripciones para el estudiante ${id}`);
      return [];
    }
  }

  /**
   * Actualiza las inscripciones de un estudiante
   * @param {number|string} id - ID del estudiante
   * @param {Array} cursos - Array de IDs de cursos
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async actualizarInscripciones(id, cursos) {
    try {
      return await apiService.put(API_CONFIG.ENDPOINTS.ACTUALIZAR_INSCRIPCIONES.replace(':id', id), { cursos });
    } catch (error) {
      throw new Error(`Error al actualizar las inscripciones del estudiante ${id}`);
    }
  }
}