let movimentacoes = [];

document.getElementById("btnAdicionar").addEventListener("click", adicionar);
document.getElementById("mesSelecionado").addEventListener("change", atualizarTela);

function adicionar() {
    const descricao = document.getElementById("descricao").value;
    const valor = Number(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;
    const data = document.getElementById("data").value;

    if (!descricao || valor <= 0 || !data) {
        alert("Preencha descrição, valor e data.");
        return;
    }

    movimentacoes.push({ descricao, valor, tipo, data });

    salvarDados();
    atualizarTela();

    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
}

function atualizarTela() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    let totalEntradas = 0;
    let totalSaidas = 0;

    const mesSelecionado = document.getElementById("mesSelecionado").value;

    movimentacoes.forEach((item, index) => {
        if (mesSelecionado && !item.data.startsWith(mesSelecionado)) return;

        const li = document.createElement("li");
        li.textContent = `${item.data} - ${item.descricao} - R$ ${item.valor.toFixed(2)}`;
        lista.appendChild(li);

        if (item.tipo === "entrada") totalEntradas += item.valor;
        else totalSaidas += item.valor;
    });

    document.getElementById("totalEntradas").innerText = totalEntradas.toFixed(2);
    document.getElementById("totalSaidas").innerText = totalSaidas.toFixed(2);
    document.getElementById("saldoMes").innerText = (totalEntradas - totalSaidas).toFixed(2);
}

function salvarDados() {
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));
}

function carregarDados() {
    const dados = localStorage.getItem("movimentacoes");
    if (dados) movimentacoes = JSON.parse(dados);
    atualizarTela();
}

carregarDados();
