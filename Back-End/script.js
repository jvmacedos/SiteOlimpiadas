// Realizando primeiramente teste para carregamento do arquivo corretamente

console.log("Tentando acessar atletas:", atletas);
console.log("Script carregado com sucesso");

// Função para exibir a lista de esportes
function mostrarEsportes() {
    let listaEsportes = document.getElementById('lista-esportes');
    listaEsportes.innerHTML = ''; // Limpa a lista anterior

    // Acessar os esportes do dados.js
    Object.keys(esportesInfo).forEach(esporte => {
        let esporteData = esportesInfo[esporte];

        let card = document.createElement('div');
        card.classList.add('card-esporte');
        
        card.innerHTML = `
            <img src="${esporteData.imagem}" alt="Imagem de ${esporteData.esporte}">
            <h3>${esporteData.esporte}</h3>
        `;

        // Adiciona o evento de clique para mostrar mais detalhes no modal
        card.addEventListener('click', () => {
            exibirEsporteModal(esporteData);
        });

        listaEsportes.appendChild(card);
    });

    document.getElementById('esportes-2024').style.display = 'block'; // Mostrar a seção de esportes
}

// Função para exibir dados completos de um esporte no modal
function exibirEsporteModal(esporte) {
    let modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ''; // Limpa o conteúdo anterior

    // Adicionar o conteúdo no modal
    let titulo = document.createElement('h2');
    titulo.textContent = esporte.esporte;
    modalBody.appendChild(titulo);

    let descricao = document.createElement('p');
    descricao.textContent = esporte.descricao;
    modalBody.appendChild(descricao);

    if (esporte.conquistas.length > 0) {
        let conquistas = document.createElement('p');
        conquistas.textContent = "Conquistas: " + esporte.conquistas.join(", ");
        modalBody.appendChild(conquistas);
    }

    // Exibir o modal
    let modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Evento para fechar o modal ao clicar no "X"
    let closeModal = document.querySelector('.close');
    closeModal.onclick = function () {
        modal.style.display = 'none';
    };
}

// Função para exibir o modal com os detalhes do esporte
function exibirDadosModalEsporte(esporte) {
    let modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ''; // Limpar conteúdo anterior

    // Adicionar o conteúdo no modal
    let titulo = document.createElement('h2');
    titulo.textContent = esporte.esporte;
    modalBody.appendChild(titulo);

    let descricao = document.createElement('p');
    descricao.textContent = esporte.descricao;
    modalBody.appendChild(descricao);

    if (esporte.conquistas.length > 0) {
        let conquistas = document.createElement('p');
        conquistas.textContent = "Conquistas: " + esporte.conquistas.join(", ");
        modalBody.appendChild(conquistas);
    }

    let link = document.createElement('a');
    link.href = esporte.imagem;
    link.textContent = 'Mais informações';
    link.target = '_blank';
    modalBody.appendChild(link);

    // Exibir o modal
    let modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Evento para fechar o modal ao clicar no "X"
    let closeModal = document.querySelector('.close');
    closeModal.onclick = function () {
        modal.style.display = 'none';
    };
}

// Função para exibir dados de um atleta no modal
function exibirDadosModal(atleta) {
    console.log("Exibindo modal para atleta:", atleta);

    let modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ''; // Limpar conteúdo anterior

    // Adicionar o conteúdo no modal
    let titulo = document.createElement('h2');
    titulo.innerHTML = `<a href="${atleta.link}" target="_blank">${atleta.titulo}</a>`;
    modalBody.appendChild(titulo);

    let esporte = document.createElement('p');
    esporte.textContent = `Esporte: ${atleta.esporte}`;
    modalBody.appendChild(esporte);

    let idade = document.createElement('p');
    idade.textContent = `Idade: ${atleta.idade} anos`;
    modalBody.appendChild(idade);

    let descricao = document.createElement('p');
    descricao.textContent = atleta.descricao;
    modalBody.appendChild(descricao);

    let conquistas = document.createElement('p');
    conquistas.textContent = "Conquistas: " + atleta.conquistas.join(", ");
    modalBody.appendChild(conquistas);

    let link = document.createElement('a');
    link.href = atleta.link;
    link.textContent = 'Mais informações';
    link.target = '_blank';
    modalBody.appendChild(link);

    // Exibir o modal
    let modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Evento para fechar o modal ao clicar no "X"
    let closeModal = document.querySelector('.close');
    closeModal.onclick = function () {
        modal.style.display = 'none';
    };
}

// Fechar o modal ao clicar fora dele
window.onclick = function (event) {
    let modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Função para pesquisar atleta pelo nome
function pesquisarAtleta() {
    let inputPesquisa = document.getElementById('search-bar').value.toLowerCase();
    let atleta = atletas[inputPesquisa]; // Busca o objeto do atleta no mapa

    if (atleta) {
        exibirDadosModal(atleta); // Exibe os dados do atleta encontrado
    } else {
        let modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = 'Atleta não encontrado.';
        let modal = document.getElementById('modal');
        modal.style.display = 'block';
    }
}

// Função para mostrar sugestões
function mostrarSugestoes() {
    let input = document.getElementById('search-bar').value.toLowerCase();
    let suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ''; // Limpa as sugestões anteriores

    if (input.length > 0) {
        // Filtra os atletas com a primeira letra do nome
        let atletasFiltrados = Object.keys(atletas).filter(nome => nome.startsWith(input));

        // Cria a lista de sugestões
        atletasFiltrados.forEach(atleta => {
            let sugestao = document.createElement('div');
            sugestao.classList.add('sugestao');
            sugestao.textContent = capitalizeWords(atleta); // Capitaliza o nome do atleta

            // Quando o usuário clicar em uma sugestão, preenche o campo de pesquisa
            sugestao.addEventListener('click', function () {
                document.getElementById('search-bar').value = capitalizeWords(atleta); // Capitaliza ao preencher o campo de pesquisa
                suggestionsDiv.innerHTML = ''; // Limpa as sugestões após a escolha
            });

            suggestionsDiv.appendChild(sugestao);
        });
    }
}

// Função para capitalizar as palavras (primeira letra do nome em maiúsculo)
function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(letter) {
        return letter.toUpperCase();
    });
}

// Acionar a pesquisa ao clicar no botão
document.getElementById('search-button').addEventListener('click', pesquisarAtleta);

// Acionar a pesquisa ao apertar a tecla "Enter"
document.getElementById('search-bar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        pesquisarAtleta();
    }
});

document.getElementById('logo-brasil').addEventListener('click', function () {
    // Esconde a seção de esportes
    document.getElementById('esportes-2024').style.display = 'none';

    // Mostra somente a pesquisa de atletas
    document.querySelector('.search-container').style.display = 'block';
});


// Evento para mostrar as sugestões conforme o usuário digita a primeira letra 
document.getElementById('search-bar').addEventListener('input', mostrarSugestoes);

document.getElementById('mostrar-esportes').addEventListener('click', mostrarEsportes);

