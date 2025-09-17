const { connection } = require("../config/database");

// Crear inscripción
const crearInscripcion = (req, res) => {
  const { nombreEstudiante, nombreCurso, fecha } = req.body;

  if (!nombreEstudiante || !nombreCurso || !fecha) {
    return res.status(400).json({ error: "Completa todos los campos" });
  }

  //Buscar estudiante por nombre
  connection.query(
    "SELECT id FROM estudiantes WHERE nombre = ?",
    [nombreEstudiante],
    (err, estudiante) => {
      if (err) return res.status(500).json({ error: "Error al buscar estudiante" });
      if (estudiante.length === 0)
        return res.status(404).json({ error: "Estudiante no encontrado" });

      const estudiante_id = estudiante[0].id;

      //Buscar curso por nombre
      connection.query(
        "SELECT id FROM cursos WHERE nombre = ?",
        [nombreCurso],
        (err, curso) => {
          if (err) return res.status(500).json({ error: "Error al buscar curso" });
          if (curso.length === 0)
            return res.status(404).json({ error: "Curso no encontrado" });

          const curso_id = curso[0].id;

          // 3️⃣ Insertar en la tabla inscripciones
          connection.query(
            "INSERT INTO inscripciones (id_estudiante, id_curso, fecha) VALUES (?, ?, ?)",
            [estudiante_id, curso_id, fecha],
            (err, result) => {
              if (err) return res.status(500).json({ error: "Error al inscribir" });
              res.status(201).json({ id_inscripcion: result.insertId, estudiante_id, curso_id, fecha });
            }
          );
        }
      );
    }
  );
};

//JOIN
const obtenerInscripciones = (req, res) => {
  const query = `
    SELECT e.nombre AS estudiante,
           e.email AS email,
           c.nombre AS curso,
           c.descripcion AS descripcion,
           i.fecha
    FROM inscripciones i
    JOIN estudiantes e ON i.id_estudiante = e.id
    JOIN cursos c ON i.id_curso = c.id
    ORDER BY i.id_inscripcion
  `;
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener inscripciones" });
    res.json(results);
  });
};

module.exports = {
  crearInscripcion,
  obtenerInscripciones
};
