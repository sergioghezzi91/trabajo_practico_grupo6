import { useState, useEffect } from 'react';
import { EstudiantesService } from '../../services';

const VerEstudianteModal = ({ estudiante, onClose }) => {
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carga los cursos en los que está inscrito el estudiante
    const obtenerCursosInscritos = async () => {
      try {
        setLoading(true);
        const inscripciones = await getInscripcionesEstudiante(estudiante.id_estudiante);
        setCursosInscritos(inscripciones);
      } catch (error) {
        console.error('Error al obtener cursos inscritos:', error);
        setCursosInscritos([]);
      } finally {
        setLoading(false);
      }
    };

    if (estudiante && estudiante.id_estudiante) {
      obtenerCursosInscritos();
    }
  }, [estudiante]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Detalles del Estudiante</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Información Personal</h3>
          <div className="bg-gray-50 p-4 rounded">
            <p><span className="font-medium">Nombre:</span> {estudiante.nombre}</p>
            <p><span className="font-medium">Email:</span> {estudiante.email}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Cursos Inscritos</h3>
          
          {loading ? (
            <p className="text-center py-4">Cargando cursos...</p>
          ) : cursosInscritos.length > 0 ? (
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
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerEstudianteModal;