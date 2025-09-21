import { apiService } from './apiService';
import { API_CONFIG } from '../constants/config';

/**
 * Servicio para manejar operaciones relacionadas con cursos
 */
export class CursosService {
  /**
   * Obtiene todos los cursos disponibles
   * @returns {Promise<Array>} Lista de cursos
   */
  static async obtenerTodos() {
    try {
      return await apiService.get(API_CONFIG.ENDPOINTS.CURSOS);
    } catch (error) {
      throw new Error('Error al obtener la lista de cursos');
    }
  }

  /**
   * Obtiene un curso por ID
   * @param {number|string} id - ID del curso
   * @returns {Promise<Object>} Datos del curso
   */
  static async obtenerPorId(id) {
    try {
      return await apiService.get(API_CONFIG.ENDPOINTS.CURSO.replace(':id', id));
    } catch (error) {
      throw new Error(`Error al obtener el curso con ID ${id}`);
    }
  }

  /**
   * Crea un nuevo curso
   * @param {Object} datosCurso - Datos del curso (nombre, descripcion, etc.)
   * @returns {Promise<Object>} Curso creado
   */
  static async crear(datosCurso) {
    try {
      if (!datosCurso.nombre) {
        throw new Error('El nombre del curso es requerido');
      }

      return await apiService.post(API_CONFIG.ENDPOINTS.CREAR_CURSO, datosCurso);
    } catch (error) {
      throw new Error('Error al crear el curso');
    }
  }

  /**
   * Actualiza un curso existente
   * @param {number|string} id - ID del curso
   * @param {Object} datosCurso - Nuevos datos del curso
   * @returns {Promise<Object>} Curso actualizado
   */
  static async actualizar(id, datosCurso) {
    try {
      return await apiService.put(API_CONFIG.ENDPOINTS.EDITAR_CURSO.replace(':id', id), datosCurso);
    } catch (error) {
      throw new Error(`Error al actualizar el curso con ID ${id}`);
    }
  }

  /**
   * Elimina un curso
   * @param {number|string} id - ID del curso
   * @returns {Promise<void>}
   */
  static async eliminar(id) {
    try {
      return await apiService.delete(API_CONFIG.ENDPOINTS.ELIMINAR_CURSO.replace(':id', id));
    } catch (error) {
      throw new Error(`Error al eliminar el curso con ID ${id}`);
    }
  }
}