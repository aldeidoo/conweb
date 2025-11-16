/* =======================
      MENU LATERAL
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menuLateral");
  const toggle = document.getElementById("toggle-menu");

  if (toggle) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("ativo");
      toggle.textContent = menu.classList.contains("ativo")
        ? "✖ Fechar"
        : "☰ Menu";
    });
  }

  /* =======================
         LISTA DE PEDIDOS
  ======================= */
  const listaEl = document.getElementById("listaPedidos");
  const modalExcluir = document.getElementById("modalExcluir");
  const btnCancelarExcluir = document.getElementById("cancelarExcluir");
  const btnConfirmarExcluir = document.getElementById("confirmarExcluir");

  let pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
  let idxExcluir = null;

  function atualizarLista() {
    if (!listaEl) return;

    pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    listaEl.innerHTML = "";

    if (!pedidos.length) {
      const vazio = document.createElement("div");
      vazio.className = "vazio-central";
      vazio.textContent = "Você ainda não fez nenhum pedido.";
      listaEl.appendChild(vazio);
      return;
    }

    pedidos.forEach((p, idx) => {
      const card = document.createElement("div");

      let statusClasse =
        p.status === "Novo pedido"
          ? "novo"
          : p.status === "Em andamento"
          ? "andamento"
          : "encerrado";

      let statusBadge =
        p.status === "Novo pedido"
          ? "status-novo"
          : p.status === "Em andamento"
          ? "status-andamento"
          : "status-encerrado";

      card.className = `pedido ${statusClasse}`;

      card.innerHTML = `
        <div class="pedido-header">
          <h3>${p.nome || "Sem nome"}</h3>
          <span class="status-badge ${statusBadge}">
            ${p.status}
          </span>
        </div>

        <div class="pedido-detalhes">
          <p><strong>ID:</strong> ${p.id || "-"}</p>
          <p><strong>Data:</strong> ${p.data || "-"}</p>
          <p><strong>Setor:</strong> ${p.setor || "-"}</p>
          <p><strong>Motivo:</strong> ${p.motivo || "-"}</p>
          <p><strong>Horas:</strong> ${p.horas || "-"}</p>
        </div>

        <div class="acoes-pedido">
          <button class="btn-editar" data-idx="${idx}">Editar</button>
          <button class="btn-excluir" data-idx="${idx}">Excluir</button>
        </div>
      `;

      listaEl.appendChild(card);
    });

    document.querySelectorAll(".btn-editar").forEach((b) => {
      b.onclick = () => {
        localStorage.setItem("editando", b.dataset.idx);
        window.location.href = "encarregadonovopedido.html";
      };
    });

    document.querySelectorAll(".btn-excluir").forEach((b) => {
      b.onclick = () => {
        idxExcluir = Number(b.dataset.idx);
        modalExcluir.style.display = "flex";
      };
    });
  }

  if (btnCancelarExcluir) {
    btnCancelarExcluir.onclick = () => {
      modalExcluir.style.display = "none";
      idxExcluir = null;
    };
  }

  if (btnConfirmarExcluir) {
    btnConfirmarExcluir.onclick = () => {
      if (idxExcluir !== null) {
        pedidos.splice(idxExcluir, 1);
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
        modalExcluir.style.display = "none";
        atualizarLista();
      }
    };
  }

  window.addEventListener("click", (e) => {
    if (e.target === modalExcluir) modalExcluir.style.display = "none";
  });

  atualizarLista();

  /* =======================
        NOVO PEDIDO
  ======================= */
  const abrirModalBtn = document.getElementById("abrirModal");
  const modal = document.getElementById("modalConfirm");
  const btnCancelarModal = document.getElementById("btnCancelarModal");
  const btnConfirmarModal = document.getElementById("btnConfirmarModal");

  if (abrirModalBtn) {
    abrirModalBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  if (btnCancelarModal) {
    btnCancelarModal.onclick = () => {
      modal.style.display = "none";
    };
  }

  if (btnConfirmarModal) {
    btnConfirmarModal.onclick = () => {
      const pedido = {
        id: document.getElementById("id").value,
        nome: document.getElementById("nome").value,
        setor: document.getElementById("setor").value,
        cpf: document.getElementById("cpf").value,
        horas: document.getElementById("horas").value,
        motivo: document.getElementById("motivo").value,
        status: document.getElementById("status").value,
        data: new Date().toLocaleDateString(),
      };

      let pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");

      let editIndex = localStorage.getItem("editando");
      if (editIndex !== null) {
        pedidos[editIndex] = pedido;
        localStorage.removeItem("editando");
      } else {
        pedidos.push(pedido);
      }

      localStorage.setItem("pedidos", JSON.stringify(pedidos));

      document.getElementById("modalTitulo").textContent = "Pedido enviado!";
      setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "encarregadopedidos.html";
      }, 900);
    };
  }
});
