// Captura os elementos necessários
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('.botao-pesquisa');
const resultadosPesquisa = document.querySelector('.resultados-pesquisa');
const itensResultado = document.querySelectorAll('.item-resultado');
const cardGrid = document.querySelector('.card-grid');

// Função para exibir mensagem de "Nenhum resultado encontrado"
function mostrarMensagemNenhumResultado(visivel) {
    let mensagem = resultadosPesquisa.querySelector('.nenhum-resultado');
    if (visivel && !mensagem) {
        mensagem = document.createElement('p');
        mensagem.className = 'nenhum-resultado';
        mensagem.textContent = 'Nenhum resultado encontrado.';
        mensagem.style.textAlign = 'center';
        mensagem.style.color = '#E6E6FA';
        mensagem.style.padding = '1rem';
        cardGrid.appendChild(mensagem);
    } else if (!visivel && mensagem) {
        mensagem.remove();
    }
}

// Função para filtrar os resultados
function filtrarResultados() {
    const termoPesquisa = searchInput.value.toLowerCase().trim();
    let resultadosVisiveis = 0;

    itensResultado.forEach(item => {
        const titulo = item.querySelector('h2').textContent.toLowerCase();
        const descricao = item.querySelector('.descricao-meta').textContent.toLowerCase();

        if (titulo.includes(termoPesquisa) || descricao.includes(termoPesquisa)) {
            item.style.display = 'block';
            resultadosVisiveis++;
        } else {
            item.style.display = 'none';
        }
    });

    // Mostrar ou esconder mensagem de "Nenhum resultado"
    mostrarMensagemNenhumResultado(resultadosVisiveis === 0);
}

// Função de debounce para limitar chamadas durante a digitação
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Adiciona eventos
searchButton.addEventListener('click', (e) => {
    e.preventDefault(); // Evita comportamento padrão do formulário
    filtrarResultados();
});

searchInput.addEventListener('input', debounce(filtrarResultados, 300));

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        filtrarResultados();
    }
});