import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EstudiantesService, CursosService } from '../services';

const EditarEstudiantePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estudiante, setEstudiante] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: ''
  });
  const [cursos, setCursos] = useState([]);
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    // Carga los datos del estudiante, cursos disponibles e inscripciones
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        // Cargar datos del estudiante
        const dataEstudiante = await EstudiantesService.obtenerPorId(id);
        setEstudiante(dataEstudiante);
        setFormData({
          nombre: dataEstudiante.nombre || '',
          email: dataEstudiante.email || ''
        });
        
        // Cargar todos los cursos disponibles
        const todosCursos = await CursosService.obtenerTodos();
        setCursos(todosCursos);
        
        // Cargar cursos en los que está inscrito el estudiante
        try {
          const inscripciones = await EstudiantesService.obtenerInscripciones(id);
          setCursosInscritos(inscripciones.map(curso => curso.id_curso));
        } catch (err) {
          // Si no hay inscripciones, no es un error
          setCursosInscritos([]);
        }
        
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      cargarDatos();
    }
  }, [id]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Alterna la inscripción del estudiante en un curso
  const handleCursoChange = (cursoId) => {
    setCursosInscritos(prev => {
      if (prev.includes(cursoId)) {
        // Si ya está seleccionado, lo quitamos
        return prev.filter(id => id !== cursoId);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prev, cursoId];
      }
    });
  };

  // Procesa el envío del formulario para actualizar el estudiante
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre.trim() || !formData.email.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      setGuardando(true);
      
      // Actualizar datos del estudiante
      await EstudiantesService.actualizar(id, formData);
      
      // Actualizar inscripciones de cursos
      await EstudiantesService.actualizarInscripciones(id, cursosInscritos);
      
      navigate('/');
    } catch (err) {
      setError('Error al actualizar el estudiante');
      console.error(err);
    } finally {
      setGuardando(false);
    }
  };

  // Cancela la edición y regresa a la página principal
  const handleCancelar = () => {
    navigate('/');
  };

  if (loading) return <div className="text-center p-4">Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Editar Estudiante</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cursos
          </label>
          <div className="border rounded p-4 max-h-60 overflow-y-auto">
            {cursos.length === 0 ? (
              <p className="text-gray-500">Cargando cursos...</p>
            ) : (
              cursos.map(curso => (
                <div key={curso.id_curso} className="mb-2">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={cursosInscritos.includes(curso.id_curso)}
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
            onClick={handleCancelar}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {guardando ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarEstudiantePage;