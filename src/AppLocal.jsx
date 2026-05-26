import { useState, useEffect } from 'react';
import EstudianteCard from './components/EstudianteCard';
import Header from './components/Header';

function AppLocal() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarEstudiantesLocales() {
      try {
        // Lee todos los archivos JSON de la carpeta estudiantes
        const archivosJSON = import.meta.glob('./estudiantes/*.json');
        const listaTemporal = [];

        for (const path in archivosJSON) {
          const modulo = await archivosJSON[path]();
          listaTemporal.push(modulo.default || modulo);
        }

        setEstudiantes(listaTemporal);
      } catch (error) {
        console.error("Error al cargar los archivos locales:", error);
      } finally {
        setLoading(false);
      }
    }

    cargarEstudiantesLocales();
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
          Cargando estudiantes de manera local...
        </p>
      ) : estudiantes.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center', fontSize: '1.2rem', fontWeight: '500' }}>
          No se encontraron archivos en la carpeta de estudiantes.
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

export default AppLocal;