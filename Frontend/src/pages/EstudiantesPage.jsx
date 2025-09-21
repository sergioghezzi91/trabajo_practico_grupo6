import TablaEstudiantes from '../components/estudiantes/TablaEstudiantes';

const EstudiantesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Estudiantes</h1>
      <TablaEstudiantes />
    </div>
  );
};

export default EstudiantesPage;