let entradas = 0;
let saidas = 0;

function adicionar() {
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!descricao || isNaN(valor) || valor <= 0) {
    alert("Preencha descrição e valor corretamente.");
    return;
  }

  const lista = document.getElementById("lista");
  const li = document.createElement("li");

  li.innerHTML = `
    ${descricao} - R$ ${valor.toFixed(2)}
    <button onclick="remover(this, ${valor}, '${tipo}')">❌</button>
  `;

  lista.appendChild(li);

  if (tipo === "entrada") {
    entradas += valor;
  } else {
    saidas += valor;
  }

  atualizarSaldo();

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

function remover(botao, valor, tipo) {
  botao.parentElement.remove();

  if (tipo === "entrada") {
    entradas -= valor;
  } else {
    saidas -= valor;
  }

  atualizarSaldo();
}

function atualizarSaldo() {
  document.getElementById("saldo").innerText =
    (entradas - saidas).toFixed(2);
}
