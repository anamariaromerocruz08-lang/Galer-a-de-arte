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
