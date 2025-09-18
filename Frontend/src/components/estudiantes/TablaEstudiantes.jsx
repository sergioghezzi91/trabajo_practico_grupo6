import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EstudiantesService } from '../../services/estudiantesService';
import { useApiList } from '../../hooks/useApi';

const TablaEstudiantes = () => {
  const navigate = useNavigate();
  const {
    items: estudiantes,
    loading,
    error,
    fetchItems: cargarEstudiantes,
    removeItem
  } = useApiList(EstudiantesService.obtenerTodos);

  // Cargar estudiantes al montar el componente
  useEffect(() => {
    cargarEstudiantes();
  }, [cargarEstudiantes]);

  // Navega a la página de edición del estudiante
  const navegarAEditar = (estudiante) => {
    navigate(`/editar/${estudiante.id_estudiante}`);
  };

  // Navega a la página de visualización del estudiante
  const navegarAVer = (estudiante) => {
    navigate(`/ver/${estudiante.id_estudiante}`);
  };

  // Elimina un estudiante con confirmación del usuario
  const eliminarEstudiante = async (estudiante) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar al estudiante "${estudiante.nombre}"?\n\nEsta acción no se puede deshacer.`
    );
    
    if (confirmacion) {
      try {
        await EstudiantesService.eliminar(estudiante.id_estudiante);
        // Actualizar la lista después de eliminar
        cargarEstudiantes();
        alert('Estudiante eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el estudiante: ' + error.message);
      }
    }
  };

  // Navega a la página de creación de nuevo estudiante
  const navegarACrear = () => {
    navigate('/agregar');
  };

  // Recarga la lista de estudiantes
  const actualizarListaEstudiantes = () => {
    cargarEstudiantes();
  };

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div>
      {/* Botón para crear nuevo estudiante */}
      <div className="mb-4">
        <button
          onClick={navegarACrear}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Crear Alumno
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Inscripciones</th>
            <th className="py-2 px-4 border-b text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.length > 0 ? (
            estudiantes.map((estudiante) => (
              <tr key={estudiante.id_estudiante} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{estudiante.nombre}</td>
                <td className="py-2 px-4 border-b">{estudiante.email}</td>
                <td className="py-2 px-4 border-b">{estudiante.inscripciones || 0}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navegarAVer(estudiante)}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm font-medium transition-colors duration-200"
                      title="Ver detalles del estudiante"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => navegarAEditar(estudiante)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm font-medium transition-colors duration-200"
                      title="Editar estudiante"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarEstudiante(estudiante)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm font-medium transition-colors duration-200"
                      title="Eliminar estudiante"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 px-4 text-center">
                No hay estudiantes disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TablaEstudiantes;