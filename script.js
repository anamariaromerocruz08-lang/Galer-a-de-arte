// CONFIGURACIÓN DE TU BOT DE TELEGRAM
// El Token ya está integrado. Asegúrate de cambiar el CHAT_ID por el tuyo propio.
const TELEGRAM_TOKEN = "8788807513:AAF4QTx8ee8CHIIn0Zdh1rW_AQJSg8RAPHw";
const TELEGRAM_CHAT_ID = "TU_CHAT_ID_AQUÍ"; // <-- REEMPLAZA ESTO CON TU NÚMERO DE ID

TELEGRAM_CHAT_ID =8788807513:AAF4QTx8ee8CHIIn0Zdh1rW_AQJSg8RAPHw
// LISTA DE OBRAS DE ARTE AUTOMATIZADAS (Mantiene tus 500 obras)
const nombresObras = ["Reflejos del Alma", "Atardecer Eterno", "Susurros de Florencia", "Luces de Tokio", "Abstracción Oceánica", "Horizonte Desértico", "Miradas Ocultas", "Esencia Cósmica", "Siluetas de Invierno", "Canto de Esperanza"];
const artistas = ["Ana María", "Jean-Pierre Clauve", "Elena Rossi", "Kenji Sato", "William Brooks", "Carlos Mendoza", "Sofia Kovalev", "Alessandro Bianchi", "Chloe Dupont", "Liam O'Connor"];
const paises = ["México", "Francia", "Italia", "Japón", "Canadá", "España", "Rusia", "Países Bajos", "Reino Unido", "Argentina"];

const artworks = [];

for (let i = 1; i <= 500; i++) {
    const tituloAleatorio = nombresObras[i % nombresObras.length];
    const artistaAleatorio = artistas[i % artistas.length];
    const paisAleatorio = paises[i % paises.length];
    const esNacional = paisAleatorio === "México";
    const imagenArteReal = `https://picsum.photos/id/${(i * 3) % 1000}/500/400`;

    artworks.push({
        id: i,
        title: `${tituloAleatorio} N° ${i}`,
        artist: artistaAleatorio,
        origin: paisAleatorio,
        type: esNacional ? "nacional" : "extranjero",
        details: `Pieza Coleccionable Única — Temporada Anual 2026`,
        image: imagenArteReal
    });
}

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

// FUNCIÓN CONEXIÓN CON TELEGRAM (PROCESA Y ENVÍA LA OFERTA)
document.getElementById("extendedOfferForm").onsubmit = function(e) {
    e.preventDefault();

    // 1. Recopilar datos del formulario
    const obra = document.getElementById("selectedArt").value;
    const artista = document.getElementById("selectedArtist").value;
    const nombre = document.getElementById("buyerName").value;
    const correo = document.getElementById("buyerEmail").value;
    const telefono = document.getElementById("buyerPhone").value;
    const direccion = document.getElementById("buyerAddress").value;
    const oferta = document.getElementById("buyerOffer").value;
    const pago = document.getElementById("paymentType").value;

    // 2. Redactar el mensaje elegante que llegará a tu celular
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

    // 3. Enviar datos de forma invisible a la API de Telegram usando FETCH
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: mensajeTelegram,
            parse_mode: "Markdown" // Permite usar letras negritas en Telegram
        })
    })
    .then(response => {
        if (response.ok) {
            alert(`¡Propuesta registrada con éxito, ${nombre}!\n\nAna María ha recibido tu oferta y se pondrá en contacto contigo muy pronto.`);
        } else {
            alert("Hubo un pequeño inconveniente al procesar tu oferta en línea. Por favor, inténtalo de nuevo.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error de conexión. Inténtalo más tarde.");
    });
    
    closeOfferModal();
};

window.onload = loadGallery;
