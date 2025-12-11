// =====================================
//   AUTOCOMPLETADO DE CLIENTE POR DNI
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    const dniInput = document.getElementById("dniFormClient");
    const btnBuscarDni = document.getElementById("btnBuscarDni");
    const dniMessage = document.getElementById("dniMessage");

    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");

    if (!dniInput || !btnBuscarDni || !dniMessage) {
        console.warn("Campos DNI no encontrados.");
        return;
    }

    const clientesPorDni = {
        "43691688": {
            nombre: "Valentino Mezzavilla",
            telefono: "3834923578"
        }
    };

    function limpiar() {
        nombreInput.value = "";
        telefonoInput.value = "";
    }

    btnBuscarDni.addEventListener("click", () => {
        const dni = dniInput.value.trim();
        dniMessage.classList.remove("dni-success", "dni-error");

        if (!dni) {
            dniMessage.textContent = "Ingresá un DNI.";
            dniMessage.classList.add("dni-error");
            limpiar();
            return;
        }

        const cliente = clientesPorDni[dni];

        if (cliente) {
            dniMessage.textContent = "Cliente encontrado ✔";
            dniMessage.classList.add("dni-success");

            nombreInput.value = cliente.nombre;
            telefonoInput.value = cliente.telefono;

        } else {
            dniMessage.textContent = "Cliente no encontrado ✘";
            dniMessage.classList.add("dni-error");
            limpiar();
        }
    });
});
