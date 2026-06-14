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
