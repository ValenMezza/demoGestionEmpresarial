document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "APP_USER";

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const btnLogin = document.getElementById("btnLogin");
  const loginError = document.getElementById("loginError");
  const linkShowRegister = document.getElementById("linkShowRegister");

  const registerForm = document.getElementById("registerForm");
  const newUsernameInput = document.getElementById("newUsername");
  const newPasswordInput = document.getElementById("newPassword");
  const newPasswordConfirmInput = document.getElementById("newPasswordConfirm");
  const btnRegister = document.getElementById("btnRegister");
  const registerError = document.getElementById("registerError");
  const linkShowLogin = document.getElementById("linkShowLogin");



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
    window.location.href = "./pages/home.html";
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => e.preventDefault());
  }
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => e.preventDefault());
  }

  if (btnLogin) {
    btnLogin.addEventListener("click", () => {
      const user = usernameInput.value.trim();
      const pass = passwordInput.value.trim();
      loginError.textContent = "";

      if (!user || !pass) {
        loginError.textContent = "Completá usuario y contraseña.";
        return;
      }

      if (user === "admin" && pass === "admin123") {
        redirigirHome();
        return;
      }

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

      guardarUsuario(newUser, newPass);

      if (usernameInput && passwordInput) {
        usernameInput.value = newUser;
        passwordInput.value = "";
      }

      mostrarLogin();
      loginError.textContent = "Cuenta creada. Iniciá sesión.";
    });
  }

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

  const existente = obtenerUsuarioGuardado();
  if (existente && usernameInput && !usernameInput.value) {
    usernameInput.placeholder = "Ej: Usuario";
  }
});


//icono del ojito
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
