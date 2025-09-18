import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EstudiantesService, CursosService } from '../services';

const AgregarEstudiantePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: ''
  });
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingCursos, setLoadingCursos] = useState(true);

  useEffect(() => {
    // Carga la lista de cursos disponibles al montar el componente
    const cargarCursos = async () => {
      try {
        setLoadingCursos(true);
        const cursos = await CursosService.obtenerTodos();
        setCursosDisponibles(cursos);
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Alterna la selección de cursos
  const handleCursoToggle = (cursoId) => {
    setCursosSeleccionados(prev => {
      if (prev.includes(cursoId)) {
        return prev.filter(id => id !== cursoId);
      } else {
        return [...prev, cursoId];
      }
    });
  };

  // Procesa el envío del formulario para crear el estudiante
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim() || !formData.email.trim()) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Crear el estudiante
      const nuevoEstudiante = await EstudiantesService.crear({
        nombre: formData.nombre.trim(),
        email: formData.email.trim()
      });
      
      // Si hay cursos seleccionados, inscribir al estudiante
      if (cursosSeleccionados.length > 0) {
        await EstudiantesService.actualizarInscripciones(nuevoEstudiante.id, cursosSeleccionados);
      }
      
      // Redirigir a la lista de estudiantes
      navigate('/');
      
    } catch (err) {
      setError(err.message || 'Error al crear el estudiante');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Navega de vuelta a la página principal
  const handleVolver = () => {
    navigate('/');
  };

  if (loadingCursos) {
    return <div className="text-center p-4">Cargando cursos...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <button
          onClick={handleVolver}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mb-4"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold">Agregar Nuevo Estudiante</h1>
      </div>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Información del Estudiante</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ingrese el nombre del estudiante"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese el email del estudiante"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Seleccionar Cursos (Opcional)</h3>
            
            {cursosDisponibles.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto border rounded p-4">
                {cursosDisponibles.map((curso) => (
                  <div key={curso.id_curso} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`curso-${curso.id_curso}`}
                      checked={cursosSeleccionados.includes(curso.id_curso)}
                      onChange={() => handleCursoToggle(curso.id_curso)}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`curso-${curso.id_curso}`} className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">{curso.nombre}</div>
                      <div className="text-sm text-gray-600">{curso.descripcion}</div>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay cursos disponibles</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleVolver}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Estudiante'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarEstudiantePage;