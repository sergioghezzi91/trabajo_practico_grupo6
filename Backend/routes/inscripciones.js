const express = require('express');
const router = express.Router()

const {
  crearInscripcion,
  obtenerInscripciones
} = require('../controllers/inscripciones');

// Rutas para inscripciones
router.post('/inscripcion', crearInscripcion);
router.get('/inscripciones', obtenerInscripciones);

module.exports = router;