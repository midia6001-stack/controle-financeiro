let saldo = 0;

function adicionar() {
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!descricao || isNaN(valor)) {
    alert("Preencha descrição e valor.");
    return;
  }

  const lista = document.getElementById("lista");
  const item = document.createElement("li");

  if (tipo === "entrada") {
    saldo += valor;
    item.textContent = `${descricao} + R$ ${valor.toFixed(2)}`;
  } else {
    saldo -= valor;
    item.textContent = `${descricao} - R$ ${valor.toFixed(2)}`;
  }

  lista.appendChild(item);
  document.getElementById("saldo").textContent = saldo.toFixed(2);

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

function limparTudo() {
  if (!confirm("Deseja apagar todas as movimentações?")) return;

  document.getElementById("lista").innerHTML = "";
  saldo = 0;
  document.getElementById("saldo").textContent = "0.00";
}

function fecharPopup() {
  document.getElementById("popup-overlay").remove();
}
