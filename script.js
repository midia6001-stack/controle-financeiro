let movimentacoes = [];
let entradas = 0;
let saidas = 0;

function adicionar() {
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!descricao || isNaN(valor) || valor <= 0) {
    alert("Preencha corretamente.");
    return;
  }

  const mov = { descricao, valor, tipo };
  movimentacoes.push(mov);

  if (tipo === "entrada") entradas += valor;
  else saidas += valor;

  atualizarTela();
  limparCampos();
}

function remover(index) {
  const mov = movimentacoes[index];

  if (mov.tipo === "entrada") entradas -= mov.valor;
  else saidas -= mov.valor;

  movimentacoes.splice(index, 1);
  atualizarTela();
}

function atualizarTela() {
  document.getElementById("lista").innerHTML = "";

  movimentacoes.forEach((mov, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${mov.descricao} - R$ ${mov.valor.toFixed(2)} (${mov.tipo})
      <button onclick="remover(${index})">❌</button>
    `;
    document.getElementById("lista").appendChild(li);
  });

  document.getElementById("saldo").innerText =
    (entradas - saidas).toFixed(2);
}

function limparCampos() {
  documen
