let entradas = 0;
let saidas = 0;

function adicionar() {
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!descricao || isNaN(valor) || valor <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const lista = document.getElementById("lista");
  const li = document.createElement("li");

  li.innerHTML = `
    ${descricao} - R$ ${valor.toFixed(2)} (${tipo})
    <button onclick="this.parentElement.remove()">❌</button>
  `;

  lista.appendChild(li);

  if (tipo === "entrada") entradas += valor;
  else saidas += valor;

  document.getElementById("saldo").innerText =
    (entradas - saidas).toFixed(2);

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}
