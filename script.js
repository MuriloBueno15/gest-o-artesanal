
const formVendas = document.getElementById("formVendas");
const quantidadeVenda = document.getElementById("quantidadeVenda");
const botaoCadastrar = document.getElementById("btnCadastrar");
const botaoEstoque = document.getElementById("btnEstoque");
const botaoVendas = document.getElementById("btnVendas");
const secaoVendas = document.getElementById("secaoVendas");
const produtoVenda = document.getElementById("produtoVenda");
console.log(botaoVendas);
console.log(produtoVenda);
const formulario = document.getElementById("formCadastro");
const secaoEstoque = document.getElementById("secaoEstoque");
const listaProdutos = document.getElementById("listaProdutos");
const botaoSalvar = document.getElementById("btnSalvar");
const botaoCancelar = document.getElementById("btnCancelar");
const totalProdutos = document.getElementById("totalProdutos");


formulario.style.display = "none";
console.log(botaoCadastrar);
secaoEstoque.style.display = "none";
secaoVendas.style.display = "none";

botaoCancelar.addEventListener("click", function () {
    console.log("Cancelando edição");
    formulario.reset();
    produtoEmEdicao = null;
    botaoSalvar.textContent = "Salvar produto";

});

botaoCadastrar.addEventListener("click", function () {
    if (formulario.style.display === "none") {
        console.log("Abrindo formulário de cadastro!");
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
        console.log("Fechando formulário de cadastro!");
    }
});
botaoVendas.addEventListener("click", function () {
    secaoVendas.style.display = "block";
    console.log("Botão de vendas clicado!");
    carregarProdutosVenda();
});

produtoVenda.addEventListener("change", function () {
    console.log("Produto selecionado:", produtoVenda.value);
    const indiceSelecionado = Number(produtoVenda.value);
    const produtoSelecionado = produtos[indiceSelecionado];
    if (produtoVenda.value === "") {
        return;
    }

    console.log("Nome:", produtoSelecionado.nome);
    console.log("Preço:", produtoSelecionado.preco);
    console.log("Quantidade disponível:", produtoSelecionado.quantidade);
});

function exibirEstoque() {


    console.log("Consultando estoque...");

    secaoEstoque.style.display = "block";
    listaProdutos.innerHTML = "";

    let totalUnidades = 0;
    let valorTotalEstoque = 0;
    let produtosEstoqueBaixo = 0;
    let produtosEsgotados = 0;


    produtos.forEach(function (produto) {
        console.log("Produtos esgotados:", produtosEsgotados);
        console.log("Produtos com estoque baixo:", produtosEstoqueBaixo);
        totalUnidades += produto.quantidade;
        valorTotalEstoque += produto.preco * produto.quantidade;
        if (produto.quantidade === 0) {
            produtosEsgotados++;
        }
        if (produto.quantidade > 0 && produto.quantidade <= 2) {
            produtosEstoqueBaixo++;
        }
        console.log("Produtos com estoque baixo:", produtosEstoqueBaixo);
    });

    const valorFormatado = formatarMoeda(valorTotalEstoque);

    console.log("Valor total do estoque: ", valorTotalEstoque);

    totalProdutos.innerHTML = "";

    const cartaoTotal = document.createElement("div");

    cartaoTotal.classList.add("resumo-card");
    cartaoTotal.textContent = "Produtos cadastrados: " + produtos.length;

    totalProdutos.appendChild(cartaoTotal);

    const cartaoUnidades = document.createElement("div");

    cartaoUnidades.classList.add("resumo-card");
    cartaoUnidades.textContent = "Total de unidades: " + totalUnidades;

    totalProdutos.appendChild(cartaoUnidades);

    const cartaoValor = document.createElement("div");

    cartaoValor.classList.add("resumo-card");
    cartaoValor.textContent = "Valor do estoque: " + valorFormatado;

    totalProdutos.appendChild(cartaoValor);

    const cartaoEstoqueBaixo = document.createElement("div");

    cartaoEstoqueBaixo.classList.add("resumo-card");
    cartaoEstoqueBaixo.textContent =
        "Estoque baixo: " + produtosEstoqueBaixo;

    totalProdutos.appendChild(cartaoEstoqueBaixo);

    const cartaoEsgotados = document.createElement("div");

    cartaoEsgotados.classList.add("resumo-card");
    cartaoEsgotados.textContent =
        "Produtos esgotados: " + produtosEsgotados;

    totalProdutos.appendChild(cartaoEsgotados);

    if (produtos.length === 0) {
        listaProdutos.textContent = "Nenhum produto cadastrado!";
        return;
    }

    produtos.forEach(function (produto, indice) {

        console.log("Total de unidades no estoque:", totalUnidades);
        console.log("Produto:", produto.nome, "Índice", indice);
        const paragrafo = document.createElement("p");
        const cartao = document.createElement("div");
        cartao.classList.add("produto-card");

        const titulo = document.createElement("h3");
        titulo.textContent = produto.nome;

        cartao.appendChild(titulo);

        const precoFormatado = formatarMoeda(produto.preco);


        const textoPreco = document.createElement("p");
        textoPreco.textContent = `Preço: ${precoFormatado}`;

        cartao.appendChild(textoPreco);

        const textoQuantidade = document.createElement("p");
        textoQuantidade.textContent = `Quantidade: ${produto.quantidade}`;

        cartao.appendChild(textoQuantidade);

        const textoStatus = document.createElement("p");

        if (produto.quantidade === 0) {
            textoStatus.textContent = "Produto Esgotado ! ";
            textoStatus.classList.add("status-esgotado");
        } else if (produto.quantidade <= 2) {
            textoStatus.textContent = "Estoque baixo! ";
            textoStatus.classList.add("estoque-baixo");
        } else {
            textoStatus.textContent = "Estoque normal ";
            textoStatus.classList.add("estoque-normal");
        }

        cartao.appendChild(textoStatus);

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        cartao.appendChild(botaoEditar);
        botaoEditar.addEventListener("click", function () {
            console.log("editando produto " + produto.nome);
            formulario.style.display = "block";
            produtoEmEdicao = produto;
            botaoSalvar.textContent = "Salvar alteração";
            document.getElementById("nome").value = produto.nome;
            document.getElementById("preco").value = produto.preco;
            document.getElementById("quantidade").value = produto.quantidade;

        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";

        cartao.appendChild(botaoExcluir);

        botaoExcluir.addEventListener("click", function () {
            console.log("Botão excluir clicado!");
            const confirmarExclusao = confirm(
                "Deseja realmente excluir o produto " + produto.nome + "?"
            );

            if (!confirmarExclusao) {
                return;
            }
            const indiceAtual = produtos.indexOf(produto);

            if (indiceAtual !== -1) {
                produtos.splice(indiceAtual, 1);

                salvarProdutos();
                exibirEstoque();
            }

            console.log("produtos restantes:", produtos.length);
            console.log("Array atualizado", produtos);

        });

        paragrafo.textContent = `Produto: ${produto.nome} | Preço: ${precoFormatado} | Quantidade: ${produto.quantidade}`;

        listaProdutos.appendChild(cartao);


        console.log("Produto:", produto.nome);
        console.log("Preço:", precoFormatado);
        console.log("Quantidade:", produto.quantidade);
    });
}

botaoEstoque.addEventListener("click", exibirEstoque);

const campoNome = document.getElementById("nome");
console.log(campoNome.value);

const campoPreco = document.getElementById("preco");
console.log(campoPreco.value);

const campoQuantidade = document.getElementById("quantidade");
console.log(campoQuantidade.value);

function carregarDados(chave) {
    try {
        const dados = localStorage.getItem(chave);

        if (dados === null) {
            return [];
        }

        const dadosConvertidos = JSON.parse(dados);

        if (!Array.isArray(dadosConvertidos)) {
            console.error("Formato inválido na chave:", chave);
            return null;
        }

        return dadosConvertidos;

    } catch (erro) {
        console.error("Erro ao carregar " + chave, erro.message);
        return null;
    }
}

const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
const vendasCarregadas = carregarDados("vendas");

const vendas = vendasCarregadas === null ? [] : vendasCarregadas;

const erroCarregamentoVendas = vendasCarregadas === null;
console.log("Histórico de vendas:", vendas);

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}
// ARMAZENAMENTO DO HISTÓRICO DE VENDAS
function salvarVendas() {
    if (erroCarregamentoVendas) {
        console.error("Salvamento de vendas bloqueado!");
        return;
    }
    localStorage.setItem("vendas", JSON.stringify(vendas));
}

console.log("Função salvarVendas executada!");

function carregarProdutosVenda() {
    produtoVenda.innerHTML = '<option value = "">Selecione um produto</option>';
    produtos.forEach(function (produto, indice) {
        console.log(produto.nome, indice);
        const opcao = document.createElement("option");
        opcao.textContent = produto.nome;
        console.log(opcao);
        opcao.value = indice;
        produtoVenda.appendChild(opcao);
    })
}

let produtoEmEdicao = null;

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (erroCarregamentoProdutos) {
        alert("Não foi possível carregar o estoque. Cadastro bloqueado para proteger os dados!");
        return;
    }
    console.log("Formulário enviado com sucesso");

    const nomeDigitado = campoNome.value.trim();
    if (nomeDigitado.trim() === "") {
        alert("Informe o nome do produto!");
        return;
    }

    const precoDigitado = campoPreco.value;
    if (precoDigitado.trim() === "") {
        alert("Informe o preço do produto!");
        return;
    }

    const precoNumero = Number(precoDigitado);

    const quantidadeDigitado = campoQuantidade.value;

    const quantidadeNumero = Number(quantidadeDigitado);
    if (quantidadeNumero < 0 || !Number.isInteger(quantidadeNumero)) {
        alert("Informe uma quantidade inteira e não negativa!");
        return;
    }
    if (!Number.isFinite(precoNumero) || precoNumero < 0) {
        alert("Informe um preço válido e não negativo!");
        return;
    }
    const valorTotal = precoNumero * quantidadeNumero;

    console.log("Valor total é:", valorTotal);
    console.log("Quantidade:", quantidadeDigitado);
    console.log("Nome do produto:", nomeDigitado);
    console.log("Preço do produto:", precoDigitado);

    const produtoDuplicado = produtos.some(function(produto) {
        return produto !== produtoEmEdicao &&
            produto.nome.toLowerCase() === nomeDigitado.toLowerCase();
    });
    if (produtoDuplicado) {
        alert("Já existe um produto cadastrado com esse nome!");
        return;
    }
    console.log("Produto duplicado?", produtoDuplicado);

    const novoProduto = {
        nome: nomeDigitado,
        preco: precoNumero,
        quantidade: quantidadeNumero
    };
    if (produtoEmEdicao !== null) {
        console.log("Estamos editando um produto!");
        produtoEmEdicao.nome = nomeDigitado;
        produtoEmEdicao.preco = Number(campoPreco.value);
        produtoEmEdicao.quantidade = Number(campoQuantidade.value);
        alert("Produto " + produtoEmEdicao.nome + " Atualizado com sucesso!");
        produtoEmEdicao = null;
    } else {
        console.log("Estamos cadastrando um novo produto!");
        produtos.push(novoProduto);
        alert("Produto " + novoProduto.nome + " cadastrado com sucesso!");
    }
    formulario.reset();
    botaoSalvar.textContent = "Salvar Produto";
    salvarProdutos();
    exibirEstoque();

    console.log(produtos);

});
formVendas.addEventListener("submit", function (event) {
    event.preventDefault();

    if (erroCarregamentoProdutos || erroCarregamentoVendas) {
        alert("Não foi possível carregar os dados. Venda bloqueada para proteger o histórico!");
        return;
    }

    console.log("Formulário de venda enviado!");
    const quantidadeDigitada = Number(quantidadeVenda.value);
    console.log("Quantidade vendida:", quantidadeDigitada);
    if (produtoVenda.value === "") {
        alert("Selecione um produto!");
        return;
    }

    const indiceSelecionado = Number(produtoVenda.value);
    const produtoSelecionado = produtos[indiceSelecionado];
    if (!Number.isInteger(quantidadeDigitada) || quantidadeDigitada <= 0) {
        alert("Informe uma quantidade inteira maior que zero!");
        return;
    }
    if (quantidadeDigitada > produtoSelecionado.quantidade) {
        alert("Estoque insuficiente para realizar a venda!");
        return;
    }
    const valorTotalVenda = produtoSelecionado.preco * quantidadeDigitada;
    const novaVenda = {
        produto: produtoSelecionado.nome,
        quantidade: quantidadeDigitada,
        precoUnitario: produtoSelecionado.preco,
        valorTotal: valorTotalVenda,
        data: new Date().toISOString()

    };
    vendas.push(novaVenda);
    salvarVendas();
    relatorioDiario();
    relatorioSemanal();
    relatorioMensal();
    atualizarGraficoVendas();

    console.log("Vendas salvas:", JSON.parse(localStorage.getItem("vendas")));
    console.log("Histórico de vendas:", vendas);
    console.log("Venda criada:", novaVenda);
    console.log("Valor total da venda:", valorTotalVenda);
    produtoSelecionado.quantidade -= quantidadeDigitada;
    console.log("Estoque após a venda:", produtoSelecionado.quantidade);
    salvarProdutos();
    exibirEstoque();
});
// ========================================
// MÓDULO FINANCEIRO — RELATÓRIOS
// ========================================
function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}
function relatorioDiario() {

    const hoje = new Date();
    let faturamentoDiario = 0;

    console.log("Data atual:", hoje);
    vendas.forEach(function (venda) {

        const dataVenda = new Date(venda.data);
        const mesmoDia = dataVenda.getDate() === hoje.getDate();

        const mesmoMes = dataVenda.getMonth() === hoje.getMonth();

        const mesmoAno = dataVenda.getFullYear() === hoje.getFullYear();

        const vendaDeHoje = mesmoDia && mesmoMes && mesmoAno;

        if (vendaDeHoje) {
            console.log("Venda encontrada no relatório diário:", venda);
            faturamentoDiario += venda.valorTotal;
        }

        console.log("Data da venda:", dataVenda);
        console.log("Mesmo dia:", mesmoDia);
        console.log("Mesmo mês:", mesmoMes);
        console.log("Mesmo ano:", mesmoAno);
        console.log("Venda realizada hoje?", vendaDeHoje);


    });

    const faturamentoDiarioFormatado = formatarMoeda(faturamentoDiario);


    console.log("Faturamento diário R$ ", faturamentoDiario);
    elementoFaturamentoDiario.textContent =
        "Faturamento de hoje: " + faturamentoDiarioFormatado;

}

function relatorioSemanal() {

    const hoje = new Date();

    let faturamentoSemanal = 0;

    const diaSemana = hoje.getDay();

    const inicioSemana = new Date(hoje);

    const diasParaVoltar = (diaSemana + 6) % 7;

    inicioSemana.setDate(hoje.getDate() - diasParaVoltar);

    inicioSemana.setHours(0, 0, 0, 0);

    vendas.forEach(function (venda) {

        const dataVenda = new Date(venda.data);

        const vendaDaSemana = dataVenda >= inicioSemana && dataVenda <= hoje;

        if (vendaDaSemana) {
            faturamentoSemanal += venda.valorTotal;
        }

        console.log("Data da venda:", dataVenda);
        console.log("Venda desta semana?", vendaDaSemana);

    });

    console.log("Dia da semana:", diaSemana);
    console.log("Início da semana antes do ajuste:", inicioSemana);
    console.log("Dias para voltar:", diasParaVoltar);
    console.log("Início da semana:", inicioSemana);
    console.log("Início da semana:", inicioSemana);
    console.log("Faturamento semanal:", faturamentoSemanal);
    const faturamentoSemanalFormatado = formatarMoeda(faturamentoSemanal);


    elementoFaturamentoSemanal.textContent =
        "Faturamento semanal: " + faturamentoSemanalFormatado;
}
// CÁLCULO DO FATURAMENTO PARA O GRÁFICO SEMANAL
function calcularVendasPorDia() {

    const valoresPorDia = [0, 0, 0, 0, 0, 0, 0];

    const hoje = new Date();

    const inicioSemana = new Date(hoje);

    const diaSemana = hoje.getDay();

    const diasParaVoltar = (diaSemana + 6) % 7;



    const indiceDia = (diaSemana + 6) % 7;

    inicioSemana.setDate(hoje.getDate() - diasParaVoltar);

    inicioSemana.setHours(0, 0, 0, 0);

    console.log("Início da semana do gráfico:", inicioSemana);

    vendas.forEach(function (venda) {

        const dataVenda = new Date(venda.data);

        const diaDaVenda = dataVenda.getDay();

        const indiceDaVenda = (diaDaVenda + 6) % 7;

        const vendaDaSemana = dataVenda >= inicioSemana && dataVenda <= hoje;

        if (vendaDaSemana) {

            console.log("Venda válida para o gráfico:", venda);

            valoresPorDia[indiceDaVenda] += venda.valorTotal;

        }
        console.log("Faturamento por dia:", valoresPorDia);
        console.log("Venda da semana atual?", vendaDaSemana);
        console.log("Data da venda:", dataVenda);
        console.log("Dia da semana da venda:", diaDaVenda);
        console.log("Índice da venda no array:", indiceDaVenda);


    });

    console.log("Valores iniciais:", valoresPorDia);
    console.log("Índice do dia no array:", indiceDia);
    return valoresPorDia;
}

function relatorioMensal() {

    const hoje = new Date();

    let faturamentoMensal = 0;

    console.log("Mês atual:", hoje.getMonth());
    console.log("Ano atual:", hoje.getFullYear());

    vendas.forEach(function (venda) {

        const dataVenda = new Date(venda.data);

        const mesmoMes = dataVenda.getMonth() === hoje.getMonth();

        const mesmoAno = dataVenda.getFullYear() === hoje.getFullYear();

        const vendaDoMes = mesmoMes && mesmoAno;

        if (vendaDoMes) {
            faturamentoMensal += venda.valorTotal;
        }

        console.log("Data da venda:", dataVenda);
        console.log("Mesmo mês:", mesmoMes);
        console.log("Mesmo ano:", mesmoAno);
        console.log("Venda do mês atual?", vendaDoMes);
        console.log("Faturamento mensal:", faturamentoMensal);
    });
    const faturamentoMensalFormatado = formatarMoeda(faturamentoMensal);
    elementoFaturamentoMensal.textContent =
        "Faturamento mensal: " + faturamentoMensalFormatado;
}

const elementoFaturamentoDiario =
    document.getElementById("faturamentoDiario");

const elementoFaturamentoSemanal =
    document.getElementById("faturamentoSemanal");

const elementoFaturamentoMensal =
    document.getElementById("faturamentoMensal");


relatorioDiario();

relatorioSemanal();

relatorioMensal();

calcularVendasPorDia();

// ========================================
// MÓDULO DE GRÁFICOS
// ========================================
const canvasVendas = document.getElementById("graficoVendas");
const graficoVendas = new Chart(canvasVendas, {
    type: "bar",
    data: {
        labels: [
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
            "Domingo"
        ],
        datasets: [
            {
                label: "Faturamento",
                data: calcularVendasPorDia(),
                backgroundColor: [
                    "#3b82f6",
                    "#22c55e",
                    "#a855f7"
                ],
                borderRadius: 8,
                barPercentage: 0.6
            }
        ]
    }
});
function atualizarGraficoVendas() {

    graficoVendas.data.datasets[0].data = calcularVendasPorDia();

    graficoVendas.update();

}



