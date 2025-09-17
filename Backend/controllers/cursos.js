const connection = require('../config/database');
 
// Obtener todos los cursos
const obtenerCursos = (req, res) => {
    const query = 'SELECT * FROM cursos';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los cursos' });
        }   
        res.json(results);
    });
}

// crear un nuevo curso
const crearCurso = (req, res) => {
    const { nombre, descripcion } = req.body;
    const query = 'INSERT INTO cursos (nombre, descripcion) VALUES (?, ?)';
    connection.query(query, [nombre, descripcion], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear el curso' });
        }
        res.status(201).json({ id: results.insertId, nombre, descripcion });
    });
}

//eliminar un curso
const eliminarCurso = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM cursos WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el curso' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.status(204).send();
    });

}

module.exports = {
    obtenerCursos,
    crearCurso,
    eliminarCurso
};