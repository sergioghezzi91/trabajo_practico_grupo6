const express = require('express');
const router = express.Router();
const {
    obtenerEstudiantes,
    obtenerEstudiantePorId,
    crearEstudiante,
    eliminarEstudiante
} = require('../controllers/estudiantes');

// Rutas para estudiantes
router.get('/estudiantes', obtenerEstudiantes);
router.get('/estudiante/:id', obtenerEstudiantePorId);
router.post('/estudiante', crearEstudiante);
router.delete('/estudiante/:id', eliminarEstudiante);

module.exports = router;

