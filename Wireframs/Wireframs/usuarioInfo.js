window.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuario) {
    window.location.href = "login.html";
    return;
  }

  const infoBox = document.querySelector(".info, .infoG, .infoE");

  if (infoBox) {
    infoBox.innerHTML = `
      <p><strong>Nome:</strong> ${usuario.nome}</p>
      <p><strong>Setor:</strong> ${usuario.setor}</p>
      <p><strong>Cargo:</strong> ${usuario.cargo}</p>
      <p><strong>Matrícula:</strong> ${usuario.matricula}</p>
    `;
  }
});
