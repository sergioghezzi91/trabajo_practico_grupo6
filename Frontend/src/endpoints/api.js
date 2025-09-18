// Archivo para manejar las peticiones al backend

const API_URL = 'http://localhost:8000'; // URL del backend

// Función para obtener todos los estudiantes
export const getEstudiantes = async () => {
  try {
    const response = await fetch(`${API_URL}/estudiantes`);
    if (!response.ok) {
      throw new Error('Error al obtener estudiantes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para obtener un estudiante por ID
export const getEstudiante = async (estudianteId) => {
  try {
    const response = await fetch(`${API_URL}/estudiante/${estudianteId}`);
    if (!response.ok) {
      throw new Error('Error al obtener el estudiante');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para obtener los cursos de un estudiante
export const getCursosEstudiante = async (estudianteId) => {
  try {
    const response = await fetch(`${API_URL}/inscripciones/estudiante/${estudianteId}`);
    if (!response.ok) {
      throw new Error('Error al obtener cursos del estudiante');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para obtener detalles de un curso
export const getCursoDetalle = async (cursoId) => {
  try {
    const response = await fetch(`${API_URL}/cursos/${cursoId}`);
    if (!response.ok) {
      throw new Error('Error al obtener detalles del curso');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para crear un nuevo estudiante
export const createEstudiante = async (datosEstudiante) => {
  try {
    const response = await fetch(`${API_URL}/estudiante`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosEstudiante),
    });
    if (!response.ok) {
      throw new Error('Error al crear estudiante');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para actualizar un estudiante
export const updateEstudiante = async (estudianteId, datosEstudiante) => {
  try {
    const response = await fetch(`${API_URL}/estudiante/${estudianteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosEstudiante),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar estudiante');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para obtener todos los cursos
export const getCursos = async () => {
  try {
    const response = await fetch(`${API_URL}/cursos`);
    if (!response.ok) {
      throw new Error('Error al obtener cursos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para obtener inscripciones de un estudiante
export const getInscripcionesEstudiante = async (estudianteId) => {
  try {
    const response = await fetch(`${API_URL}/inscripciones/estudiante/${estudianteId}`);
    if (!response.ok) {
      throw new Error('Error al obtener inscripciones del estudiante');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para actualizar inscripciones de un estudiante
export const updateInscripcionesEstudiante = async (estudianteId, cursos) => {
  try {
    const response = await fetch(`${API_URL}/inscripciones/estudiante/${estudianteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cursos }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar inscripciones');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};