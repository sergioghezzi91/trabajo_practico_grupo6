import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import EstudiantesPage from './pages/EstudiantesPage'
import EditarEstudiantePage from './pages/EditarEstudiantePage'
import VerEstudiantePage from './pages/VerEstudiantePage'
import AgregarEstudiantePage from './pages/AgregarEstudiantePage'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Layout title="Sistema de Gestión Académica">
        <Routes>
          <Route path="/" element={<EstudiantesPage />} />
          <Route path="/editar/:id" element={<EditarEstudiantePage />} />
          <Route path="/ver/:id" element={<VerEstudiantePage />} />
          <Route path="/agregar" element={<AgregarEstudiantePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
