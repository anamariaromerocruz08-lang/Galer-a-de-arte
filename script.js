// CONFIGURACIÓN DE TU BOT DE TELEGRAM
const TELEGRAM_TOKEN = "8788807513:AAF4QTx8ee8CHIIn0Zdh1rW_AQJSg8RAPHw";
const TELEGRAM_CHAT_ID = "748392015"; 

// LISTA DE DATOS BASE PARA COMPLETAR LAS 500 OBRAS AUTOMÁTICAS
const nombresObras = ["Reflejos del Alma", "Atardecer Eterno", "Susurros de Florencia", "Luces de Tokio", "Abstracción Oceánica", "Horizonte Desértico", "Miradas Ocultas", "Esencia Cósmica", "Siluetas de Invierno", "Canto de Esperanza"];
const artistas = ["Ana María", "Jean-Pierre Clauve", "Elena Rossi", "Kenji Sato", "William Brooks", "Carlos Mendoza", "Sofia Kovalev", "Alessandro Bianchi", "Chloe Dupont", "Liam O'Connor"];
const paises = ["México", "Francia", "Italia", "Japón", "Canadá", "España", "Rusia", "Países Bajos", "Reino Unido", "Argentina"];

const artworks = [];

// BUCLE PARA CREAR LAS 500 OBRAS INCLUYENDO TUS 6 IMÁGENES AL PRINCIPIO
for (let i = 1; i <= 500; i++) {
    let titulo = `${nombresObras[i % nombresObras.length]} N° ${i}`;
    let artista = artistas[i % artistas.length];
    let pais = paises[i % paises.length];
    let imagenArteReal = `https://picsum.photos/id/${(i * 3) % 1000}/500/400`;

    // INTEGRACIÓN DE TUS 6 ENLACES DIRECTOS DE IMÁGENES
    if (i === 1) {
        titulo = "Naturaleza y Paisaje Clásico";
        artista = "Paisajista Tradicional";
        pais = "Italia";
        imagenArteReal = "https://tse1.mm.bing.net/th/id/OIP.EYcIEUrFSlkKw9QVKGmKOwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
    } else if (i === 2) {
        titulo = "El Grito";
        artista = "Edvard Munch";
        pais = "Noruega";
        imagenArteReal = "https://galuvi.com/wp-content/uploads/2020/06/el-grito-munch-1280x720-1.jpg";
    } else if (i === 3) {
        titulo = "Abstracción Geométrica y Color";
        artista = "Expresionista Moderno";
        pais = "España";
        imagenArteReal = "https://th.bing.com/th/id/R.ac3641cfd6796994c6c75be92b020dde?rik=J4acEhgRGLtdvg&pid=ImgRaw&r=0";
    } else if (i === 4) {
        titulo = "Arte Urbano Contemporáneo";
        artista = "Muralista Urbano";
        pais = "México";
        imagenArteReal = "https://th.bing.com/th/id/R.563a5be56178bf5307217b66e041200d?rik=5Yf97xi8IjEGAw&riu=http%3a%2f%2fwww.recreoviral.com%2fwp-content%2fuploads%2f2015%2f09%2fArte-urbano-2015-alrededor-del-mundo-4.jpg&ehk=DPGW8sYSAGt98MNRV94DOUaurvZGlQv%2fc%2bkaeIzyTUk%3d&risl=&pid=ImgRaw&r=0";
    } else if (i === 5) {
        titulo = "Composición Surrealista";
        artista = "Diseñador Creativo";
        pais = "Francia";
        imagenArteReal = "https://i.pinimg.com/originals/b8/ad/73/b8ad73a6f64852dc37920c413f668c16.jpg";
    } else if (i === 6) {
        titulo = "Estructura Cubista Premium";
        artista = "Juan Gris";
        pais = "España";
        imagenArteReal = "https://www.singulart.com/blog/wp-content/uploads/2023/11/Juan-Gris-cubism-1140x760.jpg";
    }

    const esNacional = pais === "México";

    artworks.push({
        id: i,
        title: titulo,
        artist: artista,
        origin: pais,
        type: esNacional ? "nacional" : "extranjero",
        details: `Pieza de Exposición Exclusiva — Temporada Anual 2026`,
        image: imagenArteReal
    });
}

// FUNCIÓN: ALERTA DE VISITA AL ENTRAR A LA PÁGINA
function notificarVisita() {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const ahora = new Date();
    const horaFormateada = ahora.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

    const mensajeVisita = `👀 *¡Alguien acaba de entrar a tu galería de arte!* \nHora: ${horaFormateada}`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: mensajeVisita,
            parse_mode: "Markdown"
        })
    }).catch(error => console.error("Error al enviar alerta de visita:", error));
}

// CARGAR LA GALERÍA EN LA PÁGINA
function loadGallery() {
    const galleryGrid = document.getElementById("gallery-grid");
    if(!galleryGrid) return;
    galleryGrid.innerHTML = "";

    artworks.forEach(art => {
        const card = document.createElement("div");
        card.className = "art-card";

        card.innerHTML = `
            <div class="badge ${art.type}">${art.origin}</div>
            <img src="${art.image}" alt="${art.title}" class="art-image" loading="lazy">
            <div class="card-info">
                <h3>${art.title}</h3>
                <p class="artist">Por: <strong>${art.artist}</strong></p>
                <p class="details">${art.details}</p>
                <button class="btn-action" onclick="openOfferModal('${art.title}', '${art.artist}')">Hacer una Oferta / Comprar</button>
            </div>
        `;
        galleryGrid.appendChild(card);
    });
}

function openOfferModal(artName, artistName) {
    document.getElementById("purchaseModal").style.display = "block";
    document.getElementById("modalDescription").innerText = `Ofertando por: "${artName}" de ${artistName}`;
    document.getElementById("selectedArt").value = artName;
    document.getElementById("selectedArtist").value = artistName;
}

function closeOfferModal() {
    document.getElementById("purchaseModal").style.display = "none";
    document.getElementById("extendedOfferForm").reset();
}

// ENVÍO DE OFERTA DE COMPRA A TELEGRAM
document.getElementById("extendedOfferForm").onsubmit = function(e) {
    e.preventDefault();

    const obra = document.getElementById("selectedArt").value;
    const artista = document.getElementById("selectedArtist").value;
    const nombre = document.getElementById("buyerName").value;
    const correo = document.getElementById("buyerEmail").value;
    const telefono = document.getElementById("buyerPhone").value;
    const direccion = document.getElementById("buyerAddress").value;
    const oferta = document.getElementById("buyerOffer").value;
    const pago = document.getElementById("paymentType").value;

    const mensajeTelegram = `
🎨 *¡NUEVA OFERTA RECIBIDA!* 🎨
------------------------------------
🖼️ *Obra:* ${obra}
👤 *Autor:* ${artista}

💰 *Oferta del Cliente:* $${oferta} USD
💳 *Método de Pago:* ${pago}

📋 *DATOS DEL COMPRADOR:*
• *Nombre:* ${nombre}
• *Email:* ${correo}
• *Teléfono:* ${telefono}
• *Dirección:* ${direccion}
------------------------------------
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: mensajeTelegram,
            parse_mode: "Markdown"
        })
    })
    .then(response => {
        if (response.ok) {
            alert(`¡Propuesta registrada con éxito, ${nombre}!\n\nAna María ha recibido tu oferta.`);
        } else {
            alert("Hubo un inconveniente al procesar. Inténtalo de nuevo.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
    
    closeOfferModal();
};

window.onload = function() {
    loadGallery();
    notificarVisita(); 
};      
