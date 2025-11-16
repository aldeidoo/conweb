const usuarios = [
  {
    matricula: "1234",
    senha: "123456",
    nome: "Emerson",
    setor: "Manutenção",
    cargo: "Tecnico Eletricista",
    tipo: "tecnico"
  },
  {
    matricula: "5678",
    senha: "123456",
    nome: "Rayan Santos",
    setor: "Produção",
    cargo: "Encarregado de Linha",
    tipo: "encarregado"
  },
  {
    matricula: "9999",
    senha: "123456",
    nome: "Neto Aldir",
    setor: "Administração",
    cargo: "Gestor de Operações",
    tipo: "gestor"
  }
];

// Evento de login
document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const matricula = document.getElementById("matricula").value.trim();
  const senha = document.getElementById("senha").value.trim();

  const usuario = usuarios.find(u => u.matricula === matricula && u.senha === senha);

  if (usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    if (usuario.tipo === "tecnico") {
      window.location.href = "homeT.html";
    } else if (usuario.tipo === "encarregado") {
      window.location.href = "homeE.html";
    } else if (usuario.tipo === "gestor") {
      window.location.href = "homeG.html";
    }
  } else {
    alert("Matrícula ou senha incorretas!");
  }
});