// Variável que guarda o endereço da API
const API_URL = "https://6b042d719e7cafb37dc004b4.mockapi.io/clientes/clientes";

// GET - Buscar clientes
async function buscarClientes() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const clientes = await resposta.json();

        console.log("Clientes encontrados:", clientes);

        mostrarClientes(clientes);

    } catch (erro) {
        console.error("Erro ao buscar clientes:", erro);
    }
}

// Mostrar clientes na tela
function mostrarClientes(clientes) {
    const lista = document.getElementById("clientes-lista");

    // Limpar a lista antes de atualizar
    lista.innerHTML = "";

    clientes.forEach(function(cliente) {

        // Criar item da lista
        const item = document.createElement("li");

        // Mostrar nome e e-mail
        item.textContent = `${cliente.nome} - ${cliente.email} `;

        // Criar botão Excluir
        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";

        // Evento de clique do botão
        botaoExcluir.addEventListener("click", async function() {
            console.log("Clique para excluir:", cliente.id);

            const confirmar = confirm(
                "Deseja realmente excluir este cliente?"
            );

            if (confirmar) {
                await excluirCliente(cliente.id);
            }
        });

        // Adicionar botão ao item
        item.appendChild(botaoExcluir);

        // Adicionar item à lista
        lista.appendChild(item);
    });
}

// POST - Cadastrar cliente
async function cadastrarCliente(nome, email) {
    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email
            })
        });

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const cliente = await resposta.json();

        console.log("Cliente cadastrado:", cliente);

        return true;

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        return false;
    }
}

// DELETE - Excluir cliente
async function excluirCliente(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        console.log("Cliente excluído com sucesso!");

        // Atualizar lista após exclusão
        await buscarClientes();

    } catch (erro) {
        console.error("Erro ao excluir cliente:", erro);
    }
}

// Capturar formulário
const formulario = document.getElementById("cliente-form");

// Evento de cadastro
formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    // Capturar dados dos campos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    // Validar campos
    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    // Cadastrar cliente
    const sucesso = await cadastrarCliente(nome, email);

    if (sucesso) {
        alert("Cliente cadastrado com sucesso!");

        // Limpar formulário
        formulario.reset();

        // Atualizar lista
        await buscarClientes();

    } else {
        alert("Erro ao cadastrar cliente!");
    }
});

// Buscar clientes ao carregar a página
buscarClientes();