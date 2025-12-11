document.addEventListener("DOMContentLoaded", () => {
  // Clave para guardar el usuario en localStorage
  const STORAGE_KEY = "APP_USER";

  // ==========================
  // ELEMENTOS LOGIN
  // ==========================
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const btnLogin = document.getElementById("btnLogin");
  const loginError = document.getElementById("loginError");
  const linkShowRegister = document.getElementById("linkShowRegister");

  // ==========================
  // ELEMENTOS REGISTRO
  // ==========================
  const registerForm = document.getElementById("registerForm");
  const newUsernameInput = document.getElementById("newUsername");
  const newPasswordInput = document.getElementById("newPassword");
  const newPasswordConfirmInput = document.getElementById("newPasswordConfirm");
  const btnRegister = document.getElementById("btnRegister");
  const registerError = document.getElementById("registerError");
  const linkShowLogin = document.getElementById("linkShowLogin");

  // ==========================
  // HELPERS
  // ==========================

  function mostrarLogin() {
    if (!loginForm || !registerForm) return;
    loginForm.classList.remove("login-form--hidden");
    registerForm.classList.add("login-form--hidden");
    loginError.textContent = "";
    registerError.textContent = "";
  }

  function mostrarRegistro() {
    if (!loginForm || !registerForm) return;
    registerForm.classList.remove("login-form--hidden");
    loginForm.classList.add("login-form--hidden");
    loginError.textContent = "";
    registerError.textContent = "";
  }

  function guardarUsuario(username, password) {
    const data = { username, password };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function obtenerUsuarioGuardado() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  function redirigirHome() {
    // Ajustá esta ruta si tu home está en otro lado
    window.location.href = "./pages/home.html";
  }

  // Evitar que los forms recarguen la página si se presiona Enter
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => e.preventDefault());
  }
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => e.preventDefault());
  }

  // ==========================
  // LOGIN: VALIDAR Y REDIRIGIR
  // ==========================
  if (btnLogin) {
    btnLogin.addEventListener("click", () => {
      const user = usernameInput.value.trim();
      const pass = passwordInput.value.trim();
      loginError.textContent = "";

      if (!user || !pass) {
        loginError.textContent = "Completá usuario y contraseña.";
        return;
      }

      // 1) Caso admin / admin
      if (user === "admin" && pass === "admin123") {
        redirigirHome();
        return;
      }

      // 2) Caso usuario registrado
      const userGuardado = obtenerUsuarioGuardado();

      if (
        userGuardado &&
        user === userGuardado.username &&
        pass === userGuardado.password
      ) {
        redirigirHome();
      } else {
        loginError.textContent = "Usuario o contraseña incorrectos.";
      }
    });
  }

  // ==========================
  // REGISTRO: CREAR CUENTA
  // ==========================
  if (btnRegister) {
    btnRegister.addEventListener("click", () => {
      const newUser = newUsernameInput.value.trim();
      const newPass = newPasswordInput.value.trim();
      const newPassConfirm = newPasswordConfirmInput.value.trim();
      registerError.textContent = "";

      if (!newUser || !newPass || !newPassConfirm) {
        registerError.textContent = "Completá todos los campos.";
        return;
      }

      if (newPass.length < 4) {
        registerError.textContent =
          "La contraseña debe tener al menos 4 caracteres.";
        return;
      }

      if (newPass !== newPassConfirm) {
        registerError.textContent = "Las contraseñas no coinciden.";
        return;
      }

      // Guardar usuario en localStorage
      guardarUsuario(newUser, newPass);

      // Volver al login con el usuario completado
      if (usernameInput && passwordInput) {
        usernameInput.value = newUser;
        passwordInput.value = "";
      }

      mostrarLogin();
      loginError.textContent = "Cuenta creada. Iniciá sesión.";
    });
  }

  // ==========================
  // TOGGLES ENTRE LOGIN / REGISTRO
  // ==========================
  if (linkShowRegister) {
    linkShowRegister.addEventListener("click", () => {
      mostrarRegistro();
    });
  }

  if (linkShowLogin) {
    linkShowLogin.addEventListener("click", () => {
      mostrarLogin();
    });
  }

  // Hint si ya hay usuario guardado
  const existente = obtenerUsuarioGuardado();
  if (existente && usernameInput && !usernameInput.value) {
    usernameInput.placeholder = `Ej: ${existente.username}`;
  }
});

// ===============================
// MOSTRAR / OCULTAR CONTRASEÑA
// ===============================
document.querySelectorAll(".password-toggle").forEach(icon => {
    icon.addEventListener("click", () => {
        const inputId = icon.dataset.target;
        const input = document.getElementById(inputId);

        if (input.type === "password") {
            input.type = "text";
            icon.classList.add("active");
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.remove("active");
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    });
});
