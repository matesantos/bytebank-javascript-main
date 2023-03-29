import printCotacao from "./printCotacao.js";

const graficoDolar = document.querySelector("#graficoDolar");

const graficoParaDolar = new Chart(graficoDolar, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Dólar',
      data: [],
      borderWidth: 1
    }]
  },
});

setInterval(()=>conectaAPI(),5000);
async function conectaAPI(){
  const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
  const conectaTraduzido = await conecta.json();
  const tempo = geraHorario();
  const valor = conectaTraduzido.USDBRL.ask;
  addDate(graficoParaDolar, tempo, valor);
  printCotacao("dolar", valor);
}

function geraHorario() {
  const data = new Date();
  const horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
  return horario;
}

function addDate(grafico, legenda, dados){
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach(dataset => {
    dataset.data.push(dados);
  });
  grafico.update();
}


