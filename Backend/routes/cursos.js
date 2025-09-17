const express = require('express');
const router = express.Router();
const {
    obtenerCursos,
    crearCurso,
    eliminarCurso
} = require('../controllers/cursos');

// Rutas para cursos
router.get('/cursos', obtenerCursos);
router.post('/curso', crearCurso);
router.delete('/curso/:id', eliminarCurso);

module.exports = router;
