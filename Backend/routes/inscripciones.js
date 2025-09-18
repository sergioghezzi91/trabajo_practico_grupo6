const express = require('express');
const router = express.Router()

const {
  crearInscripcion,
  obtenerInscripciones,
  obtenerInscripcionesPorEstudiante,
  actualizarInscripcionesEstudiante
} = require('../controllers/inscripciones');

// Rutas para inscripciones
router.post('/inscripcion', crearInscripcion);
router.get('/inscripciones', obtenerInscripciones);
router.get('/inscripciones/estudiante/:id', obtenerInscripcionesPorEstudiante);
router.put('/inscripciones/estudiante/:id', actualizarInscripcionesEstudiante);

module.exports = router;