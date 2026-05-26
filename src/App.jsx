import { useState, useEffect } from 'react';
import EstudianteCard from './components/EstudianteCard';
import Header from './components/Header';

// Configuración de github
const OWNER = import.meta.env.VITE_GITHUBUSER;
const REPO = import.meta.env.VITE_GITHUBREPO;
const PATH = import.meta.env.VITE_GITHUBPATH;

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarEstudiantesDesdeGitHub() {
      try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`);
        
        if (!response.ok) {
          throw new Error("Repositorio no configurado o carpeta vacía.");
        }
        
        const archivos = await response.json();
        const archivosJSON = archivos.filter(file => file.name.endsWith('.json') && file.name);
        
        const listaTemporal = [];
        
        for (const archivo of archivosJSON) {
          const resContenido = await fetch(archivo.download_url);
          const datosEstudiante = await resContenido.json();
          listaTemporal.push(datosEstudiante);
        }
        
        setEstudiantes(listaTemporal);
      } catch (error) {
        console.warn("API de GitHub no disponible o vacía. Cargando simulación local de estudiantes.");
      } finally {
        setLoading(false);
      }
    }

    cargarEstudiantesDesdeGitHub();
  }, []);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Componente de encabezado con título, subtítulo y logo */}
      <Header 
        titulo="Muro de la Fama UBB" 
        subtitulo="Demostración Práctica: Frontend React & Control de Versiones con Git" 
        logoSrc="/logoubb.png" 
      />
      {/* Renderizado de tarjetas */}
      {loading ? (
        <p style={{ color: '#64748b', textAlign: 'center', fontSize: '1.2rem', fontWeight: '500' }}>
          Conectando con la carpeta de estudiantes en GitHub...
        </p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {estudiantes.map((estudiante, index) => (
            <EstudianteCard 
              key={index}
              nombre={estudiante.nombre}
              generacion={estudiante.generacion}
              comentario={estudiante.comentario}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
