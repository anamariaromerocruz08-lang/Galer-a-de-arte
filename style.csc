/* Configuración General Minimalista */
body {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #ffffff;
    color: #1a1a1a;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 1px solid #eaeaea;
}

h1 {
    font-weight: 300;
    letter-spacing: 2px;
}

/* Botón Catálogo Elegante (Bordes finos) */
.btn-catalogo {
    text-decoration: none;
    color: #1a1a1a;
    border: 1px solid #1a1a1a;
    padding: 10px 20px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.btn-catalogo:hover {
    background-color: #1a1a1a;
    color: #ffffff;
}

/* Contenedor de la Galería */
.galeria-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    padding: 40px;
}

.obra-card {
    border: 1px solid #f0f0f0;
    padding: 15px;
    text-align: center;
}

/* Botón Oferta */
.btn-oferta {
    background-color: transparent;
    border: 1px solid #0070f3; /* Un toque azul sutil */
    color: #0070f3;
    padding: 8px 16px;
    cursor: pointer;
    transition: 0.3s;
}

.btn-oferta:hover {
    background-color: #0070f3;
    color: white;
}
