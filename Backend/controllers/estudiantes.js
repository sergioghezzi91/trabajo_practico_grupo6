//controlador para crud de estudiantes. nombre y email. con nonbres de funciones en español. todo en español
 const {connection} = require('../config/database');

// Obtener todos los estudiantes
const obtenerEstudiantes = (req, res) => {
    const query = 'SELECT * FROM estudiantes';
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
    const query = 'SELECT * FROM estudiantes WHERE id = ?';
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
    const { nombre, email } = req.body;
    const query = 'INSERT INTO estudiantes (nombre, email) VALUES (?, ?)';
    connection.query(query, [nombre, email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear el estudiante' });
        }
        res.status(201).json({ id: results.insertId, nombre, email });
    });
}



// Eliminar un estudiante
const eliminarEstudiante = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM estudiantes WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el estudiante' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(204).send();
    });
}

module.exports = {
    obtenerEstudiantes,
    obtenerEstudiantePorId,
    crearEstudiante,
    eliminarEstudiante
};
