# Estructura del Proyecto Frontend

Este documento explica la organización del código fuente del frontend para facilitar el desarrollo y mantenimiento.

## 📁 Estructura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── estudiantes/     # Componentes específicos de estudiantes
│   ├── modales/         # Componentes de modales
│   ├── layout/          # Componentes de layout (header, footer, etc.)
│   └── index.js         # Exportaciones centralizadas
├── pages/               # Páginas/vistas principales
├── services/            # Servicios para comunicación con API
├── hooks/               # Hooks personalizados de React
├── utils/               # Utilidades y funciones auxiliares
├── constants/           # Constantes y configuraciones
├── endpoints/           # (Legacy) APIs endpoints - migrar a services/
└── assets/              # Recursos estáticos (imágenes, iconos)
```

## 🔧 Servicios (services/)

Los servicios manejan toda la comunicación con el backend:

- **`apiService.js`**: Clase base para peticiones HTTP
- **`estudiantesService.js`**: Operaciones CRUD para estudiantes
- **`cursosService.js`**: Operaciones CRUD para cursos
- **`index.js`**: Exportaciones centralizadas

### Ejemplo de uso:
```javascript
import { EstudiantesService } from '../services';

const estudiantes = await EstudiantesService.obtenerTodos();
```

## 🎣 Hooks Personalizados (hooks/)

Hooks para manejar lógica común:

- **`useApi.js`**: Hook para manejar estados de carga, error y datos
- **`useApiList.js`**: Hook especializado para listas con operaciones CRUD

### Ejemplo de uso:
```javascript
import { useApiList } from '../hooks';
import { EstudiantesService } from '../services';

const {
  items: estudiantes,
  loading,
  error,
  fetchItems
} = useApiList(EstudiantesService.obtenerTodos);
```

## 🛠️ Utilidades (utils/)

Funciones auxiliares organizadas por propósito:

- **`validation.js`**: Funciones de validación de datos
- **`formatters.js`**: Funciones para formateo de texto y datos

### Ejemplo de uso:
```javascript
import { validateEstudiante, capitalizeWords } from '../utils';

const { isValid, errors } = validateEstudiante(datosEstudiante);
const nombreFormateado = capitalizeWords(nombre);
```

## ⚙️ Constantes (constants/)

Configuraciones centralizadas:

- **`config.js`**: URLs de API, mensajes, configuraciones de UI

### Ejemplo de uso:
```javascript
import { API_CONFIG, MESSAGES } from '../constants/config';

const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ESTUDIANTES}`;
```

## 🧩 Componentes (components/)

Organizados por funcionalidad:

- **`estudiantes/`**: Componentes relacionados con estudiantes
- **`modales/`**: Todos los componentes de modales
- **`layout/`**: Componentes de estructura (Layout, Header, Footer)

## 📄 Páginas (pages/)

Componentes que representan rutas/páginas completas:

- `EstudiantesPage.jsx`
- `AgregarEstudiantePage.jsx`
- `EditarEstudiantePage.jsx`
- `VerEstudiantePage.jsx`

## 🚀 Mejores Prácticas

### Imports
```javascript
// ✅ Usar imports desde index.js cuando sea posible
import { EstudiantesService, CursosService } from '../services';
import { useApi, useApiList } from '../hooks';
import { validateEstudiante } from '../utils';

// ✅ Imports específicos cuando sea necesario
import { API_CONFIG } from '../constants/config';
```

### Estructura de Componentes
```javascript
// ✅ Estructura recomendada
import React from 'react';
import { useApiList } from '../../hooks';
import { EstudiantesService } from '../../services';

const MiComponente = () => {
  // Hooks
  const { items, loading, error } = useApiList(EstudiantesService.obtenerTodos);
  
  // Funciones del componente
  const handleAction = () => {
    // lógica
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MiComponente;
```

### Manejo de Errores
```javascript
// ✅ Usar try-catch en servicios
try {
  const resultado = await EstudiantesService.crear(datos);
  // manejar éxito
} catch (error) {
  // manejar error
  console.error('Error:', error.message);
}
```

## 🔄 Migración desde Estructura Anterior

Si encuentras imports antiguos, actualízalos:

```javascript
// ❌ Antiguo
import { getEstudiantes } from '../endpoints/api';

// ✅ Nuevo
import { EstudiantesService } from '../services';
// Cambiar: getEstudiantes() → EstudiantesService.obtenerTodos()
```

## 📚 Recursos Adicionales

- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)