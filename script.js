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
