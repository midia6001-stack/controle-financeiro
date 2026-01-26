let entradas = 0;
let saidas = 0;

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
const dadosEntradas = [0, 0, 0, 0, 0, 0];
const dadosSaidas = [0, 0, 0, 0, 0, 0];

const ctxBarra = document.getElementById("graficoBarra");
const ctxLinha = document.getElementById("graficoLinha");

const graficoBarra = new Chart(ctxBarra, {
  type: "bar",
  data: {
    labels: meses,
    datasets: [
      {
        label: "Entradas",
        data: dadosEntradas,
        backgroundColor: "#1976d2"
      },
      {
        label: "Saídas",
        data: dadosSaidas,
        backgroundColor: "#f57c00"
      }
    ]
  }
});

const graficoLinha = new Chart(ctxLinha, {
  type: "line",
  data: {
    labels: meses,
    datasets: [
      {
        label: "Resultado",
        data: meses.map(() => 0),
        borderColor: "#2e7d32",
        fill: false
      }
    ]
  }
});

function adicionar() {
  const valor = Number(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!valor || valor <= 0) return alert("Valor inválido");

  const mesAtual = new Date().getMonth() % 6;

  if (tipo === "entrada") {
    entradas += valor;
    dadosEntradas[mesAtual] += valor;
  } else {
    saidas += valor;
    dadosSaidas[mesAtual] += valor;
  }

  atualizar();
}

function atualizar() {
  document.getElementById("kpi-entradas").innerText = `R$ ${entradas.toFixed(2)}`;
  document.getElementById("kpi-saidas").innerText = `R$ ${saidas.toFixed(2)}`;
  document.getElementById("kpi-saldo").innerText = `R$ ${(entradas - saidas).toFixed(2)}`;

  graficoBarra.update();

  graficoLinha.data.datasets[0].data =
    dadosEntradas.map((v, i) => v - dadosSaidas[i]);

  graficoLinha.update();
}
