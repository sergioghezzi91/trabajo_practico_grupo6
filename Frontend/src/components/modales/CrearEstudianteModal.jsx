import { useState, useEffect } from 'react';
import { EstudiantesService, CursosService } from '../../services';

const CrearEstudianteModal = ({ onClose, onEstudianteCreado }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: ''
  });
  const [cursos, setCursos] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingCursos, setLoadingCursos] = useState(true);

  useEffect(() => {
    // Carga la lista de cursos disponibles al abrir el modal
    const cargarCursos = async () => {
      try {
        setLoadingCursos(true);
        const todosCursos = await getCursos();
        setCursos(todosCursos);
      } catch (err) {
        setError('Error al cargar los cursos');
        console.error(err);
      } finally {
        setLoadingCursos(false);
      }
    };

    cargarCursos();
  }, []);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Alterna la selección de cursos para inscripción
  const handleCursoChange = (cursoId) => {
    setCursosSeleccionados(prev => {
      if (prev.includes(cursoId)) {
        // Si ya está seleccionado, lo quitamos
        return prev.filter(id => id !== cursoId);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prev, cursoId];
      }
    });
  };

  // Procesa el envío del formulario para crear el estudiante
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre.trim() || !formData.email.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      setLoading(true);
      
      // Crear el estudiante
      const nuevoEstudiante = await createEstudiante(formData);
      
      // Si hay cursos seleccionados, inscribir al estudiante
      if (cursosSeleccionados.length > 0) {
        await updateInscripcionesEstudiante(nuevoEstudiante.id, cursosSeleccionados);
      }
      
      onEstudianteCreado();
      onClose();
    } catch (err) {
      setError('Error al crear el estudiante');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Estudiante</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Materias a Inscribirse
            </label>
            <div className="border rounded p-4 max-h-60 overflow-y-auto">
              {loadingCursos ? (
                <p className="text-gray-500">Cargando materias...</p>
              ) : cursos.length === 0 ? (
                <p className="text-gray-500">No hay materias disponibles</p>
              ) : (
                cursos.map(curso => (
                  <div key={curso.id_curso} className="mb-2">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={cursosSeleccionados.includes(curso.id_curso)}
                        onChange={() => handleCursoChange(curso.id_curso)}
                        className="mr-2 mt-1"
                      />
                      <div>
                        <span className="font-medium">{curso.nombre}</span>
                        <p className="text-sm text-gray-600">{curso.descripcion}</p>
                      </div>
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? 'Creando...' : 'Crear Estudiante'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearEstudianteModal;