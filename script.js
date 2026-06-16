// ==========================================
// 1. CONFIGURACIÓN Y CONSTANTES PRINCIPALES
// ==========================================
const API_URL = 'https://script.google.com/macros/s/AKfycbzaFdhaRmRhNc-gb1GldPX51a6llSaQ054y6We1v5YS6vEjsw8wuYcOPjCwbgh6RFSF/exec';
const TELEGRAM_TOKEN = "8788807513:AAF4QTx8ee8CHIIn0Zdh1rW_AQJSg8RAPHw";
const TELEGRAM_CHAT_ID = "6504235959"; 

// Elementos del DOM para la galería y el visor
const galleryContainer = document.getElementById("gallery-container") || document.getElementById("gallery-grid");
const imageModal = document.getElementById("imageModal");
const expandedImg = document.getElementById("expandedImg");
const closeImgBtn = document.querySelector(".close-btn");

// ==========================================
// 2. SISTEMA DE ALERTA DE VISITAS
// ==========================================
function notificarVisita() {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const ahora = new Date();
    const horaFormateada = ahora.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    const mensajeVisita = `👀 *¡Alguien acaba de entrar a tu galería de arte virtual!* \nHora: ${horaFormateada}`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: mensajeVisita, parse_mode: "Markdown" })
    }).catch(error => console.error("Error de visita:", error));
}

// ==========================================
// 3. GENERADOR DE GALERÍA HÍBRIDA (Tus obras + Google Sheets)
// ==========================================
async function cargarGaleriaCompleta() {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = ''; // Limpiar mensaje de carga

    // A. Primero cargamos las 6 obras estelares de Ana María
    const obrasBase = [
        { title: "Naturaleza y Paisaje Clásico", artist: "Paisajista Tradicional", origin: "Italia", image: "https://tse1.mm.bing.net/th/id/OIP.EYcIEUrFSlkKw9QVKGmKOwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
        { title: "El Grito", artist: "Edvard Munch", origin: "Noruega", image: "https://galuvi.com/wp-content/uploads/2020/06/el-grito-munch-1280x720-1.jpg" },
        { title: "Abstracción Geométrica y Color", artist: "Expresionista Moderno", origin: "España", image: "https://th.bing.com/th/id/R.ac3641cfd6796994c6c75be92b020dde?rik=J4acEhgRGLtdvg&pid=ImgRaw&r=0" },
        { title: "Arte Urbano Contemporáneo", artist: "Muralista Urbano", origin: "México", image: "https://th.bing.com/th/id/R.563a5be56178bf5307217b66e041200d?rik=5Yf97xi8IjEGAw&riu=http%3a%2f%2fwww.recreoviral.com%2fwp-content%2fuploads%2f2015%2f09%2fArte-urbano-2015-alrededor-del-mundo-4.jpg&ehk=DPGW8sYSAGt98MNRV94DOUaurvZGlQv%2fc%2bkaeIzyTUk%3d&risl=&pid=ImgRaw&r=0" },
        { title: "Composición Surrealista", artist: "Diseñador Creativo", origin: "Francia", image: "https://i.pinimg.com/originals/b8/ad/73/b8ad73a6f64852dc37920c413f668c16.jpg" },
        { title: "Estructura Cubista Premium", artist: "Juan Gris", origin: "España", image: "https://www.singulart.com/blog/wp-content/uploads/2023/11/Juan-Gris-cubism-1140x760.jpg" }
    ];

    obrasBase.forEach(crearTarjetaDeArte);

    // B. Luego consultamos la base de datos para traer las fotos nuevas de Telegram
    try {
        const respuesta = await fetch(API_URL);
        const imagenesNuevas = await respuesta.json();
        
        let contador = 7;
        imagenesNuevas.forEach(url => {
            crearTarjetaDeArte({
                title: `Obra Exclusiva N° ${contador}`,
                artist: "Artista Invitado",
                origin: "Internacional",
                image: url
            });
            contador++;
        });
    } catch (error) {
        console.error("No se pudieron cargar las obras de Telegram:", error);
    }
}

// Función auxiliar para dibujar cada tarjeta con su botón de oferta
function crearTarjetaDeArte(art) {
    const card = document.createElement("div");
    card.className = "art-card gallery-item"; 
    
    // Identificar si es nacional para el estilo
    const tipo = art.origin === "México" ? "nacional" : "extranjero";

    card.innerHTML = `
        <div class="badge ${tipo}">${art.origin}</div>
        <img src="${art.image}" alt="${art.title}" class="art-image" loading="lazy">
        <div class="card-info" style="padding: 15px;">
            <h3 style="margin:0 0 5px 0;">${art.title}</h3>
            <p class="artist" style="margin:0 0 5px 0; color:#888;">Por: <strong>${art.artist}</strong></p>
            <button class="btn-action" onclick="openOfferModal('${art.title}', '${art.artist}')" style="margin-top:10px; padding:10px; width:100%; cursor:pointer;">Hacer una Oferta</button>
        </div>
    `;

    // Añadir el evento para abrir la imagen en pantalla completa
    const imgElement = card.querySelector('img');
    imgElement.addEventListener("click", function() {
        if (imageModal && expandedImg) {
            imageModal.style.display = "block";
            expandedImg.src = this.src;
        }
    });

    galleryContainer.appendChild(card);
}

// ==========================================
// 4. FUNCIONES DEL VISOR DE IMÁGENES (MODAL)
// ==========================================
if (closeImgBtn) {
    closeImgBtn.addEventListener("click", () => imageModal.style.display = "none");
}
window.addEventListener("click", (event) => {
    if (event.target === imageModal) imageModal.style.display = "none";
});

// ==========================================
// 5. SISTEMA DE OFERTAS A TELEGRAM
// ==========================================
function openOfferModal(artName, artistName) {
    const modalCompra = document.getElementById("purchaseModal");
    if (modalCompra) {
        modalCompra.style.display = "block";
        document.getElementById("modalDescription").innerText = `Ofertando por: "${artName}" de ${artistName}`;
        document.getElementById("selectedArt").value = artName;
        document.getElementById("selectedArtist").value = artistName;
    }
}

function closeOfferModal() {
    const modalCompra = document.getElementById("purchaseModal");
    if (modalCompra) {
        modalCompra.style.display = "none";
        const form = document.getElementById("extendedOfferForm");
        if (form) form.reset();
    }
}

const offerForm = document.getElementById("extendedOfferForm");
if (offerForm) {
    offerForm.onsubmit = function(e) {
        e.preventDefault();
        
        const btnSubmit = offerForm.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = "Enviando...";
        btnSubmit.disabled = true;

        const obra = document.getElementById("selectedArt").value;
        const artista = document.getElementById("selectedArtist").value;
        const nombre = document.getElementById("buyerName").value;
        const correo = document.getElementById("buyerEmail").value;
        const telefono = document.getElementById("buyerPhone").value;
        const direccion = document.getElementById("buyerAddress").value;
        const oferta = document.getElementById("buyerOffer").value;
        const pago = document.getElementById("paymentType").value;

        const mensajeTelegram = `🎨 *¡NUEVA OFERTA RECIBIDA!* 🎨\n------------------------------------\n🖼️ *Obra:* ${obra}\n👤 *Autor:* ${artista}\n\n💰 *Oferta:* $${oferta} USD\n💳 *Pago:* ${pago}\n\n📋 *COMPRADOR:*\n• *Nombre:* ${nombre}\n• *Email:* ${correo}\n• *Tel.*: ${telefono}\n• *Dir.*: ${direccion}`;

        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: mensajeTelegram, parse_mode: "Markdown" })
        })
        .then(response => {
            if (response.ok) {
                alert(`¡Propuesta registrada con éxito, ${nombre}!\n\nAna María ha recibido tu oferta.`);
                closeOfferModal();
            } else {
                alert("Hubo un inconveniente al procesar. Inténtalo de nuevo.");
            }
        })
        .catch(error => console.error("Error:", error))
        .finally(() => {
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
        });
    };
}

// ==========================================
// 6. INICIALIZAR PÁGINA
// ==========================================
window.onload = function() {
    cargarGaleriaCompleta();
    notificarVisita(); 
};
