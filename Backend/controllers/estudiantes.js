//controlador para crud de estudiantes. nombre y email. con nonbres de funciones en español. todo en español
const {connection} = require('../config/database');

// Obtener todos los estudiantes
const obtenerEstudiantes = (req, res) => {
    const query = `
        SELECT 
            e.id_estudiante,
            e.nombre,
            e.email,
            COUNT(i.id_curso) as inscripciones
        FROM estudiantes e
        LEFT JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
        GROUP BY e.id_estudiante, e.nombre, e.email
        ORDER BY e.nombre
    `;
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los estudiantes' });
        }   
        res.json(results);
    });
}

// Obtener un estudiante por ID
const obtenerEstudiantePorId = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM estudiantes WHERE id_estudiante = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el estudiante' });
        }   
        if (results.length === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(results[0]);
    });
}

// Crear un nuevo estudiante
const crearEstudiante = (req, res) => {
    console.log('Datos recibidos:', req.body);
    const { nombre, email } = req.body;
    
    // Validación básica
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }
    
    const query = 'INSERT INTO estudiantes (nombre, email) VALUES (?, ?)';
    connection.query(query, [nombre, email], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).json({ error: 'Error al crear el estudiante' });
        }
        console.log('Estudiante creado exitosamente:', results.insertId);
        res.status(201).json({ id: results.insertId, nombre, email });
    });
}



// Actualizar un estudiante
const actualizarEstudiante = (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    const query = 'UPDATE estudiantes SET nombre = ?, email = ? WHERE id_estudiante = ?';
    connection.query(query, [nombre, email, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el estudiante' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json({ id, nombre, email });
    });
}

// Eliminar un estudiante
const eliminarEstudiante = (req, res) => {
    const { id } = req.params;
    console.log('Intentando eliminar estudiante con ID:', id);
    
    // Primero eliminar las inscripciones del estudiante
    const deleteInscripcionesQuery = 'DELETE FROM inscripciones WHERE id_estudiante = ?';
    connection.query(deleteInscripcionesQuery, [id], (err, inscripcionesResult) => {
        if (err) {
            console.error('Error al eliminar inscripciones:', err);
            return res.status(500).json({ error: 'Error al eliminar las inscripciones del estudiante' });
        }
        
        console.log('Inscripciones eliminadas:', inscripcionesResult.affectedRows);
        
        // Luego eliminar el estudiante
        const deleteEstudianteQuery = 'DELETE FROM estudiantes WHERE id_estudiante = ?';
        connection.query(deleteEstudianteQuery, [id], (err, estudianteResult) => {
            if (err) {
                console.error('Error al eliminar estudiante:', err);
                return res.status(500).json({ error: 'Error al eliminar el estudiante' });
            }
            if (estudianteResult.affectedRows === 0) {
                return res.status(404).json({ error: 'Estudiante no encontrado' });
            }
            
            console.log('Estudiante eliminado exitosamente');
            res.status(204).send();
        });
    });
}

module.exports = {
    obtenerEstudiantes,
    obtenerEstudiantePorId,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};
