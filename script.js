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
// CONFIGURACIÓN DE TU BOT DE TELEGRAM
const TELEGRAM_TOKEN = "8788807513:AAF4QTx8ee8CHIIn0Zdh1rW_AQJSg8RAPHw";
const TELEGRAM_CHAT_ID = "748392015"; // Tu ID de Telegram ya configurado

// LISTA DE OBRAS DE ARTE AUTOMATIZADAS (Tus 500 obras)
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

// 🔔 NUEVA FUNCIÓN: ALERTA DE VISITA AL ENTRAR A LA PÁGINA
function notificarVisita() {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    
    // Obtenemos la fecha y hora actual para saber cuándo entraron
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

// FUNCIÓN DE ENVÍO DE OFERTA FORMAL
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
            alert("Hubo un inconveniente. Inténtalo de nuevo.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
    
    closeOfferModal();
};

// AL ENTRAR A LA PÁGINA: Se cargan las obras Y se manda la alerta de visita
window.onload = function() {
    loadGallery();
    notificarVisita(); // Ejecuta la alerta de inmediato
};
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

    // Integración exacta de tus 6 imágenes en los primeros lugares
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
        pais = "México"; // Esta saldrá con etiqueta de arte nacional
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
