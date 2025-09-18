/**
 * Archivo de exportación centralizada para todos los servicios
 */

export { apiService } from './apiService';
export { EstudiantesService } from './estudiantesService';
export { CursosService } from './cursosService';

// Re-exportar para compatibilidad con código existente
export { EstudiantesService as estudiantesService } from './estudiantesService';
export { CursosService as cursosService } from './cursosService';