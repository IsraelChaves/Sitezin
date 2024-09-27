// Captura os elementos necessários
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button');
const resultadosPesquisa = document.querySelector('.resultados-pesquisa');
const itensResultado = document.querySelectorAll('.item-resultado');

// Função para filtrar os resultados de acordo com a pesquisa
function filtrarResultados() {
    const termoPesquisa = searchInput.value.toLowerCase(); // Pega o valor da pesquisa e converte para minúsculas
    
    itensResultado.forEach(item => {
        const titulo = item.querySelector('h2').textContent.toLowerCase();
        const descricao = item.querySelector('.descricao-meta').textContent.toLowerCase();

        // Verifica se o termo pesquisado está no título ou na descrição
        if (titulo.includes(termoPesquisa) || descricao.includes(termoPesquisa)) {
            item.style.display = ''; // Mostra o item
        } else {
            item.style.display = 'none'; // Esconde o item
        }
    });
}

// Adiciona o evento de clique no botão de pesquisa
searchButton.addEventListener('click', filtrarResultados);

// Também filtra os resultados quando o usuário pressiona "Enter" no campo de pesquisa
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        filtrarResultados();
    }
});
