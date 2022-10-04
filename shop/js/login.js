function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === '') {
    return alert('Usuario requerido');
  }

  if (password === '') {
    return alert('Contraseña requerida');
  }

  window.location.href = './index.html';
}
