function Header({ titulo, subtitulo, logoSrc }) {
  return (
    <header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '25px', 
      marginBottom: '40px', 
      borderBottom: '2px solid #e2e8f0', 
      paddingBottom: '20px' 
    }}>
      <img 
        src={logoSrc} 
        alt="Logo Institucional" 
        style={{ height: '70px', objectFit: 'contain' }}
      />
      <div>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '800', 
          margin: 0,
          color: '#014898'
        }}>
          {titulo}
        </h1>
        <p style={{ color: '#475569', margin: '5px 0 0 0', fontSize: '1.1rem' }}>
          {subtitulo}
        </p>
      </div>
    </header>
  );
}

export default Header;