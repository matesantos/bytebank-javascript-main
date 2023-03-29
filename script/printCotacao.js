const lista = document.querySelector("[data-lista]");

function printCotacao(nome, valor){
  lista.innerHTML = '';
  for (let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10) {
    const listaItem = document.createElement('li');
    listaItem.innerHTML = `${multiplicador} ${nome}: R$${(valor * multiplicador).toFixed(2)}`
    lista.appendChild(listaItem)
  }
}

export default printCotacao;