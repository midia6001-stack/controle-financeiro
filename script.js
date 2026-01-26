let dados = JSON.parse(localStorage.getItem("financeiro")) || [];

function salvar() {
  localStorage.setItem("financeiro", JSON.stringify(dados));
}

function atualizar() {
  let entradas = 0;
  let saidas = 0;

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  dados.forEach(item => {
    if (item.tipo === "entrada") entradas += item.valor;
    else saidas += item.valor;

    const li = document.createElement("li");
    li.textContent = `${item.descricao} - ${item.tipo} - R$ ${item.valor.toFixed(2)}`;
    lista.appendChild(li);
  });

  document.getElementById("entradas").innerText = `R$ ${entradas.toFixed(2)}`;
  document.getElementById("saidas").innerText = `R$ ${saidas.toFixed(2)}`;
  document.getElementById("saldo").innerText = `R$ ${(entradas - saidas).toFixed(2)}`;
}

function adicionar() {
  const descricao = document.getElementById("descricao").value;
  const valor = Number(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!descricao || valor <= 0) {
    alert("Preencha corretamente");
    return;
  }

  dados.push({ descricao, valor, tipo });
  salvar();
  atualizar();

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

atualizar();
