document.addEventListener("DOMContentLoaded", () => {
    const direccionInput = document.getElementById("direccion");
    const ciudadInput = document.getElementById("ciudad");
    const provinciaInput = document.getElementById("provincia");
    const cpInput = document.getElementById("cp");

    const btnActualizarMapa = document.getElementById("btnActualizarMapa");
    const mapContainer = document.getElementById("mapContainer");

    function armarDireccionCompleta() {
        const partes = [];

        if (direccionInput.value.trim()) partes.push(direccionInput.value.trim());
        if (ciudadInput.value.trim()) partes.push(ciudadInput.value.trim());
        if (provinciaInput.value.trim()) partes.push(provinciaInput.value.trim());
        if (cpInput.value.trim()) partes.push(cpInput.value.trim());

        return partes.join(", ");
    }

    function actualizarMapa() {
        const direccionCompleta = armarDireccionCompleta();
        if (!direccionCompleta) return;

        const url = `https://www.google.com/maps?q=${encodeURIComponent(direccionCompleta)}&z=16&output=embed`;

        let iframe = mapContainer.querySelector("iframe");

        // Crear iframe si no existe
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.width = "100%";
            iframe.height = "300";
            iframe.style.border = "0";
            iframe.loading = "lazy";
            iframe.referrerPolicy = "no-referrer-when-downgrade";
            mapContainer.appendChild(iframe);
        }

        iframe.src = url;
    }

    // Click en el botón
    btnActualizarMapa.addEventListener("click", actualizarMapa);

    // Enter en campos de dirección
    [direccionInput, ciudadInput, provinciaInput, cpInput].forEach(input => {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                actualizarMapa();
            }
        });
    });
});
