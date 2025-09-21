const express = require('express');
const estudiantesroutes = require('./routes/estudiantes');
const cursosroutes = require('./routes/cursos');
const inscripcionesroutes = require('./routes/inscripciones');

const app = express();
const PORT = 8000;

// Configuración de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Manejar las solicitudes OPTIONS para preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

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
