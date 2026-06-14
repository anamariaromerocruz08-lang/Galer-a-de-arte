// Función para abrir la ventana de ofertas
function abrirModal(nombreObra) {
    // Por ahora mostrará un mensaje, luego podemos programar el modal visual elegante
    const monto = prompt(`¿Cuánto deseas ofrecer por la obra "${nombreObra}"?`);
    const cliente = prompt("Introduce tu nombre:");
    
    if (monto && cliente) {
        alert(`Gracias ${cliente}. Procesando tu oferta de $${monto} para la obra "${nombreObra}"...`);
        // Aquí se llamaría a la función del Bot de Telegram para enviarte el mensaje
    }
}
function openModal() { document.getElementById("offerModal").style.display = "block"; }
function closeModal() { document.getElementById("offerModal").style.display = "none"; }

document.getElementById("offerForm").onsubmit = function(e) {
    e.preventDefault();
    alert("¡Oferta enviada! Ana se pondrá en contacto pronto.");
    closeModal();
};
// Funciones para abrir y cerrar la ventana de compra
function openOfferModal(artName, artistName) {
    document.getElementById("purchaseModal").style.display = "block";
    document.getElementById("modalDescription").innerText = `Ofertando por: "${artName}" de ${artistName}`;
    
    // Guardar valores en campos ocultos
    document.getElementById("selectedArt").value = artName;
    document.getElementById("selectedArtist").value = artistName;
}

function closeOfferModal() {
    document.getElementById("purchaseModal").style.display = "none";
    document.getElementById("extendedOfferForm").reset(); // Limpia el formulario
}

// Procesar el formulario al hacer click en enviar
document.getElementById("extendedOfferForm").onsubmit = function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // Captura de todos los datos recopilados
    const obra = document.getElementById("selectedArt").value;
    const artista = document.getElementById("selectedArtist").value;
    const nombre = document.getElementById("buyerName").value;
    const correo = document.getElementById("buyerEmail").value;
    const telefono = document.getElementById("buyerPhone").value;
    const direccion = document.getElementById("buyerAddress").value;
    const oferta = document.getElementById("buyerOffer").value;
    const pago = document.getElementById("paymentType").value;

    // Mensaje de confirmación en pantalla
    alert(`¡Gracias ${nombre}! Tu propuesta de $${oferta} por "${obra}" ha sido registrada.\n\nNos comunicaremos a tu correo (${correo}) o teléfono para coordinar el envío a: ${direccion}. Método de pago seleccionado: ${pago}.`);
    
    closeOfferModal();
};
// LISTA DE OBRAS DE ARTE (Aquí puedes añadir entre 100 y 500 obras siguiendo el mismo formato)
const artworks = [
    {
        title: "Reflejos del Alma",
        artist: "Ana María",
        origin: "México",
        type: "nacional",
        details: "Óleo sobre lienzo — Temporada 2026",
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=60"
    },
    {
        title: "Atardecer en París",
        artist: "Jean-Pierre Clauve",
        origin: "Francia",
        type: "extranjero",
        details: "Acuarela sobre papel — Temporada 2026",
        image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=500&auto=format&fit=crop&q=60"
    },
    {
        title: "Susurros de Florencia",
        artist: "Elena Rossi",
        origin: "Italia",
        type: "extranjero",
        details: "Técnica mixta — Temporada 2026",
        image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=500&auto=format&fit=crop&q=60"
    },
    {
        title: "Luces de Tokio",
        artist: "Kenji Sato",
        origin: "Japón",
        type: "extranjero",
        details: "Tinta acrílica — Temporada 2026",
        image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=500&auto=format&fit=crop&q=60"
    },
    {
        title: "Abstracción Oceánica",
        artist: "William Brooks",
        origin: "Canadá",
        type: "extranjero",
        details: "Espátula sobre lienzo — Temporada 2025",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60"
    },
    {
        title: "Horizonte Desértico",
        artist: "Carlos Mendoza",
        origin: "México",
        type: "nacional",
        details: "Óleo texturizado — Temporada 2026",
        image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=500&auto=format&fit=crop&q=60"
    }
    // Puedes seguir agregando más obras aquí abajo separadas por una coma (,)
];

// FUNCIÓN PARA GENERAR TODA LA GALERÍA AUTOMÁTICAMENTE
function loadGallery() {
    const galleryGrid = document.getElementById("gallery-grid");
    galleryGrid.innerHTML = ""; // Limpiar contenedor

    artworks.forEach(art => {
        // Crear la estructura de la tarjeta
        const card = document.createElement("div");
        card.className = "art-card";

        card.innerHTML = `
            <div class="badge ${art.type}">${art.origin}</div>
            <img src="${art.image}" alt="${art.title}" class="art-image">
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

// Controladores del Modal (Ventana Emergente)
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

// Procesamiento y captura de la compra
document.getElementById("extendedOfferForm").onsubmit = function(e) {
    e.preventDefault();

    const obra = document.getElementById("selectedArt").value;
    const nombre = document.getElementById("buyerName").value;
    const correo = document.getElementById("buyerEmail").value;
    const telefono = document.getElementById("buyerPhone").value;
    const direccion = document.getElementById("buyerAddress").value;
    const oferta = document.getElementById("buyerOffer").value;
    const pago = document.getElementById("paymentType").value;

    alert(`¡Oferta Registrada con Éxito!\n\nCliente: ${nombre}\nObra: "${obra}"\nMonto Ofertado: $${oferta}\nMétodo de Pago: ${pago}\n\nNos comunicaremos al correo ${correo} o al teléfono ${telefono} para organizar el envío seguro a la dirección: ${direccion}.`);
    
    closeOfferModal();
};

// Arrancar la carga de la galería al entrar a la página
window.onload = loadGallery;
