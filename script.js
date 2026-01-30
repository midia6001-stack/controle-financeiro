let saldo = 0;
let movimentacoes = [];

// 🔄 CARREGAR DADOS AO ABRIR O SITE
window.onload = function () {
  const dadosSalvos = localStorage.getItem("controleFinanceiro");

  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    saldo = dados.saldo;
    movimentacoes = dados.movimentacoes;

    atualizarTela();
  }
};

// ➕ ADICIONAR MOVIMENTAÇÃO
function adicionar() {
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!descricao || isNaN(valor)) {
    alert("Preencha descrição e valor.");
    return;
  }

  const movimento = {
    descricao,
    valor,
    tipo
  };

  movimentacoes.push(movimento);

  if (tipo === "entrada") {
    saldo += valor;
  } else {
    saldo -= valor;
  }

  salvarDados();
  atualizarTela();

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

// 🧾 ATUALIZAR LISTA E SALDO
function atualizarTela() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  movimentacoes.forEach((m) => {
    const item = document.createElement("li");

    if (m.tipo === "entrada") {
      item.textContent = `${m.descricao} + R$ ${m.valor.toFixed(2)}`;
    } else {
      item.textContent = `${m.descricao} - R$ ${m.valor.toFixed(2)}`;
    }

    lista.appendChild(item);
  });

  document.getElementById("saldo").textContent = saldo.toFixed(2);
}

// 💾 SALVAR NO LOCALSTORAGE
function salvarDados() {
  const dados = {
    saldo,
    movimentacoes
  };

  localStorage.setItem("controleFinanceiro", JSON.stringify(dados));
}

// 🗑 APAGAR TUDO
function limparTudo() {
  if (!confirm("Deseja apagar todas as movimentações?")) return;

  saldo = 0;
  movimentacoes = [];
  localStorage.removeItem("controleFinanceiro");
  atualizarTela();
}

// ❌ FECHAR POP-UP
function fecharPopup() {
  document.getElementById("popup-overlay").remove();
}
