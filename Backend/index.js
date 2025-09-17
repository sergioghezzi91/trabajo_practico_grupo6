const express = require('express');
const estudiantesroutes = require('./routes/estudiantes');
const cursosroutes = require('./routes/cursos');
const inscripcionesroutes = require('./routes/inscripciones');

const app = express();
const PORT = 8000;

app.use(express.json());


// Usamos las rutas
app.use('/', estudiantesroutes);
app.use('/', cursosroutes);
app.use('/', inscripcionesroutes);

// Ruta principal
app.get('/', (req, res) => {
    res.send('API de Gestión de Estudiantes 🚀');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
