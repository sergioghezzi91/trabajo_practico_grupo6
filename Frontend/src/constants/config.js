// Configuraciones de la aplicación
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    ESTUDIANTES: '/estudiantes',
    ESTUDIANTE: '/estudiante',
    CURSOS: '/cursos',
    CURSO: '/curso',
    INSCRIPCIONES: '/inscripciones'
  }
};

// Mensajes de la aplicación
export const MESSAGES = {
  LOADING: 'Cargando...',
  ERROR: {
    GENERIC: 'Ha ocurrido un error',
    NETWORK: 'Error de conexión',
    NOT_FOUND: 'No encontrado',
    VALIDATION: 'Por favor complete todos los campos'
  },
  SUCCESS: {
    CREATED: 'Creado exitosamente',
    UPDATED: 'Actualizado exitosamente',
    DELETED: 'Eliminado exitosamente'
  }
};

// Configuraciones de UI
export const UI_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100
  },
  MODAL: {
    ANIMATION_DURATION: 300
  }
};