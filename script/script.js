import selecionaCotacao from "./printCotacao.js";

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

const workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener('message', event => {
  const tempo = geraHorario();
  const valor = event.data.ask;
  selecionaCotacao("dolar", valor);
  addDate(graficoParaDolar, tempo, valor);
})

const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    }
});

const workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('jyp');

workerIene.addEventListener('message', event => {
  const tempo = geraHorario();
  const valor = event.data.ask;
  selecionaCotacao("iene", valor);
  addDate(graficoParaIene, tempo, valor);
})
