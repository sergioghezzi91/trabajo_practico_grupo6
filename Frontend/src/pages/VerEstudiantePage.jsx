import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EstudiantesService } from '../services';

const VerEstudiantePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estudiante, setEstudiante] = useState(null);
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Carga los datos del estudiante y sus cursos inscritos
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        // Cargar datos del estudiante
        const dataEstudiante = await EstudiantesService.obtenerPorId(id);
        setEstudiante(dataEstudiante);
        
        // Cargar cursos inscritos
        try {
          const inscripciones = await EstudiantesService.obtenerInscripciones(id);
          setCursosInscritos(inscripciones);
        } catch (err) {
          // Si no hay inscripciones, no es un error
          setCursosInscritos([]);
        }
        
      } catch (err) {
        setError('Error al cargar los datos del estudiante');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      cargarDatos();
    }
  }, [id]);

  // Navega de vuelta a la página principal
  const handleVolver = () => {
    navigate('/');
  };

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!estudiante) return <div className="text-center p-4">Estudiante no encontrado</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <button
          onClick={handleVolver}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mb-4"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold">Detalles del Estudiante</h1>
      </div>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
          <div className="bg-gray-50 p-4 rounded">
            <div className="mb-2">
              <span className="font-medium text-gray-700">Nombre:</span>
              <span className="ml-2">{estudiante.nombre}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="ml-2">{estudiante.email}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Cursos Inscritos</h3>
          
          {cursosInscritos.length > 0 ? (
            <div className="space-y-4">
              {cursosInscritos.map((curso, index) => (
                <div key={`${curso.id_curso}-${index}`} className="border rounded p-4">
                  <h4 className="font-bold text-blue-600">{curso.nombre}</h4>
                  <p className="mt-2 text-gray-700">{curso.descripcion}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 bg-gray-50 rounded">El estudiante no está inscrito en ningún curso</p>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate(`/editar/${estudiante.id_estudiante}`)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Editar Estudiante
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerEstudiantePage;