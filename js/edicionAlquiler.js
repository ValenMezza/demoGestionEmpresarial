document.addEventListener("DOMContentLoaded", () => {
  // ======================================================
  // FUNCIÓN COMPARTIDA: arma dirección completa
  // ======================================================
  function armarDireccion(calle, numero, ciudad, provincia, cp) {
    const partes = [];
    if (calle && calle.trim()) partes.push(calle.trim());
    if (numero && numero.trim()) partes.push(numero.trim());
    if (ciudad && ciudad.trim()) partes.push(ciudad.trim());
    if (provincia && provincia.trim()) partes.push(provincia.trim());
    if (cp && cp.trim()) partes.push(cp.trim());
    return partes.join(", ");
  }

  // ======================================================
  // FUNCIÓN COMPARTIDA: crea/actualiza iframe en un contenedor
  // (se usa en "Nuevo alquiler")
  // ======================================================
  function actualizarMapaEnContainer(container, direccionCompleta) {
    if (!container || !direccionCompleta) return;

    const url = `https://www.google.com/maps?q=${encodeURIComponent(
      direccionCompleta
    )}&z=16&output=embed`;

    let iframe = container.querySelector("iframe");

    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.width = "100%";
      iframe.height = "300";
      iframe.style.border = "0";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      container.appendChild(iframe);
    }

    iframe.src = url;
  }

  // ======================================================
  // 1) NUEVO ALQUILER (checkout.html)
  // ======================================================
  const calleInput = document.getElementById("calle");
  const numeroInput = document.getElementById("numero");
  const ciudadInput = document.getElementById("ciudad");
  const provinciaInput = document.getElementById("provincia");
  const cpInput = document.getElementById("cp");
  const btnActualizarMapa = document.getElementById("btnActualizarMapa");
  const mapContainer = document.getElementById("mapContainer");

  function actualizarMapaNuevoAlquiler() {
    // Si no estamos en esta pantalla, corto
    if (!mapContainer || !calleInput) return;

    const direccionCompleta = armarDireccion(
      calleInput.value,
      numeroInput?.value,
      ciudadInput?.value,
      provinciaInput?.value,
      cpInput?.value
    );

    if (!direccionCompleta) return;

    actualizarMapaEnContainer(mapContainer, direccionCompleta);
  }

  if (btnActualizarMapa && mapContainer && calleInput) {
    btnActualizarMapa.addEventListener("click", (e) => {
      e.preventDefault();
      actualizarMapaNuevoAlquiler();
    });

    [calleInput, numeroInput, ciudadInput, provinciaInput, cpInput].forEach(
      (input) => {
        if (!input) return;
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            actualizarMapaNuevoAlquiler();
          }
        });
      }
    );
  }

  // ======================================================
  // 2) EDICIÓN DE ALQUILER (edicionAlquiler.html)
  // ======================================================
  const calleEdit = document.getElementById("calleEdit");
  const numeroEdit = document.getElementById("numeroEdit");
  const ciudadEdit = document.getElementById("ciudadEdit");
  const provinciaEdit = document.getElementById("provinciaEdit");
  const cpEdit = document.getElementById("cpEdit");
  const btnActualizarEdit = document.querySelector(".btn-actualizar-mapa");
  const mapFrameEdit = document.getElementById("mapFrame");

  function actualizarMapaEditarAlquiler() {
    // Si no estamos en esta pantalla, corto
    if (!calleEdit || !mapFrameEdit) return;

    const direccionCompleta = armarDireccion(
      calleEdit.value,
      numeroEdit?.value,
      ciudadEdit?.value,
      provinciaEdit?.value,
      cpEdit?.value
    );

    if (!direccionCompleta) return;

    const url = `https://www.google.com/maps?q=${encodeURIComponent(
      direccionCompleta
    )}&z=16&output=embed`;

    mapFrameEdit.src = url;
  }

  if (btnActualizarEdit && calleEdit && mapFrameEdit) {
    btnActualizarEdit.addEventListener("click", (e) => {
      e.preventDefault();
      actualizarMapaEditarAlquiler();
    });

    [calleEdit, numeroEdit, ciudadEdit, provinciaEdit, cpEdit].forEach(
      (input) => {
        if (!input) return;
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            actualizarMapaEditarAlquiler();
          }
        });
      }
    );
  }
});
