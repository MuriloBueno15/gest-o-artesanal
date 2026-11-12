        console.log("Sistema de Gestão Artesanal Iniciado!");
        console.log("Bem-Vindo ao cadastro de produtos")
        const nomeProduto = "Bolsa Artesanal";
        let preco = 80.50;
        let quantidade = 5;
        quantidade = 8;
        console.log(nomeProduto);
        console.log(preco);
        console.log(quantidade);

      const botaoCadastrar =document.getElementById("btnCadastrar");
      const botaoEstoque=document.getElementById("btnEstoque");
      const formulario= document.getElementById("formCadastro");
      const secaoEstoque = document.getElementById("secaoEstoque");
      const listaProdutos=document.getElementById("listaProdutos");
      const botaoSalvar = document.getElementById("btnSalvar");
      const botaoCancelar = document.getElementById("btnCancelar");
      const totalProdutos = document.getElementById("totalProdutos");

formulario.style.display = "none";
        console.log(botaoCadastrar);
        secaoEstoque.style.display="none";

        botaoCancelar.addEventListener("click", function (){
         console.log("Cancelando edição");
         formulario.reset();
         produtoEmEdicao=null;
         botaoSalvar.textContent = "Salvar produto";

        });

botaoCadastrar.addEventListener("click", function (){
    if (formulario.style.display === "none") {
        console.log("Abrindo formulário de cadastro!");
        formulario.style.display = "block";
    }
    else{
        formulario.style.display = "none";
        console.log("Fechando formulário de cadastro!");

    }
});

        function exibirEstoque() {


            console.log("Consultando estoque...");

            secaoEstoque.style.display="block";
            listaProdutos.innerHTML="";

            let totalUnidades = 0;
            let valorTotalEstoque = 0;
            let produtosEstoqueBaixo = 0;
            let produtosEsgotados = 0;


            produtos.forEach(function(produto) {
                console.log("Produtos esgotados:", produtosEsgotados);
                console.log("Produtos com estoque baixo:", produtosEstoqueBaixo);
                totalUnidades += produto.quantidade;
                valorTotalEstoque += produto.preco*produto.quantidade;
                if (produto.quantidade === 0) {
                    produtosEsgotados++;
                }
                if (produto.quantidade > 0 && produto.quantidade <= 2) {
                    produtosEstoqueBaixo++;
                }
                console.log("Produtos com estoque baixo:", produtosEstoqueBaixo);
            });

            const valorFormatado = valorTotalEstoque.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

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

                const precoFormatado = produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });


                const textoPreco = document.createElement("p");
                textoPreco.textContent=`Preço: ${precoFormatado}`;

                cartao.appendChild(textoPreco);

                const textoQuantidade=document.createElement("p");
                textoQuantidade.textContent= `Quantidade: ${produto.quantidade}`;

                cartao.appendChild(textoQuantidade);

                const textoStatus = document.createElement("p");

                if(produto.quantidade===0) {
                    textoStatus.textContent = "Produto Esgotado ! ";
                    textoStatus.classList.add("status-esgotado");
                }else if (produto.quantidade <= 2) {
                    textoStatus.textContent = "Estoque baixo! ";
                    textoStatus.classList.add("estoque-baixo");
                }else{
                    textoStatus.textContent = "Estoque normal ";
                    textoStatus.classList.add("estoque-normal");
                }

                cartao.appendChild(textoStatus);

                const botaoEditar=document.createElement("button");
                botaoEditar.textContent = "Editar";
                cartao.appendChild(botaoEditar);
                botaoEditar.addEventListener("click", function (){
                    console.log("editando produto " +produto.nome );
                    formulario.style.display = "block";
                    produtoEmEdicao = produto;
                    botaoSalvar.textContent="Salvar alteração";
                    document.getElementById("nome").value = produto.nome;
                    document.getElementById("preco").value = produto.preco;
                    document.getElementById("quantidade").value = produto.quantidade;

                });

                const botaoExcluir = document.createElement("button");
                botaoExcluir.textContent = "Excluir";

                cartao.appendChild(botaoExcluir);

                botaoExcluir.addEventListener("click", function (){
                    console.log("Botão excluir clicado!");
                    const confirmarExclusao = confirm(
                        "Deseja realmente excluir o produto " + produto.nome + "?"
                    );

                    if (!confirmarExclusao) {
                        return;
                    }
                    const indiceAtual = produtos.indexOf(produto);

                    if(indiceAtual !== -1){
                        produtos.splice(indiceAtual, 1);

                        salvarProdutos();
                        exibirEstoque();
                    }

                console.log("produtos restantes:", produtos.length);
                console.log("Array atualizado", produtos);

                });

                paragrafo.textContent= `Produto: ${produto.nome} | Preço: ${precoFormatado} | Quantidade: ${produto.quantidade}`;

                listaProdutos.appendChild(cartao);



                console.log("Produto:", produto.nome);
                console.log("Preço:", precoFormatado);
                console.log("Quantidade:", produto.quantidade);
            });
        }
        botaoEstoque.addEventListener("click", exibirEstoque);

    const campoNome = document.getElementById("nome");
        console.log(campoNome.value);

    const campoPreco=document.getElementById("preco");
        console.log(campoPreco.value);

    const campoQuantidade=document.getElementById("quantidade");
        console.log(campoQuantidade.value);

    const produtos= JSON.parse(localStorage.getItem("produtos")) || [];
        function salvarProdutos() {
            localStorage.setItem("produtos", JSON.stringify(produtos));
        }
        let produtoEmEdicao = null;
    const produtoTeste ={
            nome:"Tapete de crochê",
            preco:120.00,
            quantidade:3
        };


    //produtos.push("Bolsa");
    //produtos.push("Tapete");
    //produtos.push("Cesto artesanal");
   // produtos.push(produtoTeste);

    console.log(produtos);
    console.log(produtoTeste.nome);



formulario.addEventListener("submit", function (event){
    event.preventDefault();
        console.log("Formulário enviado com sucesso");

    const nomeDigitado=campoNome.value;
    const precoDigitado=campoPreco.value;
    const precoNumero=Number(precoDigitado);
    const quantidadeDigitado=campoQuantidade.value;
    const quantidadeNumero=Number(quantidadeDigitado);
    const valorTotal=precoNumero*quantidadeNumero;

        console.log("Valor total é:", valorTotal);
        console.log("Quantidade:", quantidadeDigitado);
        console.log("Nome do produto:", nomeDigitado);
        console.log("Preço do produto:", precoDigitado);

    const novoProduto={
        nome:nomeDigitado,
        preco:precoNumero,
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
    botaoSalvar.textContent="Salvar Produto";
    salvarProdutos();
        exibirEstoque();

        console.log(produtos);

});
