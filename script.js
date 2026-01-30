let saldo = 0;
let movimentacoes = [];
let grafico = null;

// 🔄 CARREGAR DADOS
window.onload = function () {
  const dadosSalvos = localStorage.getItem("controleFinanceiro");

  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    saldo = dados.saldo;
    movimentacoes = dados.movimentacoes;
  }

  atualizarTela();
  criarGrafico();
};

// ➕ ADICIONAR
function adicionar() {
  const data = document.getElementById("data").value;
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!data || !descricao || isNaN(valor)) {
    alert("Preencha data, descrição e valor.");
    return;
  }

  movimentacoes.push({ data, descricao, valor, tipo });

  saldo += tipo === "entrada" ? valor : -valor;

  salvarDados();
  atualizarTela();
  atualizarGrafico();

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

// 🧾 ATUALIZAR TELA
function atualizarTela() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  movimentacoes.forEach(m => {
    const li = document.createElement("li");
    const dataFormatada = new Date(m.data).toLocaleDateString("pt-BR");

    li.textContent =
      `${dataFormatada} | ${m.descricao} ` +
      (m.tipo === "entrada"
        ? `+ R$ ${m.valor.toFixed(2)}`
        : `- R$ ${m.valor.toFixed(2)}`);

    lista.appendChild(li);
  });

  document.getElementById("saldo").textContent = saldo.toFixed(2);
}

// 💾 SALVAR
function salvarDados() {
  localStorage.setItem(
    "controleFinanceiro",
    JSON.stringify({ saldo, movimentacoes })
  );
}

// 🗑 LIMPAR
function limparTudo() {
  if (!confirm("Deseja apagar tudo?")) return;
  saldo = 0;
  movimentacoes = [];
  localStorage.removeItem("controleFinanceiro");
  atualizarTela();
  atualizarGrafico();
}

// 📊 GRÁFICO
function criarGrafico() {
  const ctx = document.getElementById("grafico").getContext("2d");

  grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Entradas", "Saídas"],
      datasets: [{
        data: [0, 0],
        backgroundColor: ["#2e9d45", "#d80f0f"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });

  atualizarGrafico();
}

function atualizarGrafico() {
  let entradas = 0;
  let saidas = 0;

  movimentacoes.forEach(m => {
    if (m.tipo === "entrada") entradas += m.valor;
    else saidas += m.valor;
  });

  grafico.data.datasets[0].data = [entradas, saidas];
  grafico.update();
}

// ❌ FECHAR POP-UP
function fecharPopup() {
  document.getElementById("popup-overlay").remove();
}
