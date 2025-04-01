const html = document.querySelector("html");
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const music = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa= new Audio('/sons/pause.mp3');
const audioTempoEncerrado = new Audio('/sons/beep.mp3');
music.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicFocoInput.addEventListener('change', () => {
    if(music.paused) {
        music.play()
    } else {
        music.pause()
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')

});

function alterarContexto(contexto) {
    mostrarTempo()
    buttons.forEach((button) => {
        button.classList.remove('active')
    });
    
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
        titulo.innerHTML = `
        Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
        `
        break;

        case "descanso-curto":
        titulo.innerHTML = `
        Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `
        break;

        case "descanso-longo":
        titulo.innerHTML = `
        Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
        `
        default:
        break;
        
    }
};  

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioTempoEncerrado.play()
        alert('O tempo acabou!');
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId) {
        audioPausa.play();
        zerar()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    iniciarOuPausarBtIcone.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    iniciarOuPausarBtIcone.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()