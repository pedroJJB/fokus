const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDesC = document.querySelector('.app__card-button--curto');
const botaoDesL = document.querySelector('.app__card-button--longo');
const imagen = document.querySelector('.app__image');
const startPauseBt = document.querySelector('.app__card-primary-button');
const musicaBotao = document.querySelector('#alternar-musica');
const comecarPausar = document.querySelector('#start-pause');
const tempoNaTela = document.getElementById('timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const play = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const beep = new Audio('/sons/beep.mp3');
musica.loop = true;

let tempoEmSegundos = 1500;
let intervalo = null;


musicaBotao.addEventListener('change',() =>{
    if(musica.paused){
        musica.play();
    }else {
        musica.pause();
    }
})

botaoFoco.addEventListener('click', () => {
    tempoEmSegundos = 1500;
    clickBotao('foco');
    titulo('Otimize sua produtividade,','mergulhe no que importa');
    botaoFoco.classList.add('active');
    botaoDesC.classList.remove('active');
    botaoDesL.classList.remove('active');
})

botaoDesC.addEventListener('click', () => {
    tempoEmSegundos = 300;
    clickBotao('descanso-curto');
    titulo('Que tal dar uma respirada?',' Faça uma pausa curta!');
    botaoDesC.classList.add('active');
    botaoFoco.classList.remove('active');
    botaoDesL.classList.remove('active');
})

botaoDesL.addEventListener('click', () => {
    tempoEmSegundos = 900;
    clickBotao('descanso-longo');
    titulo('Hora de voltar à superfície.',' Faça uma pausa longa.');
    botaoDesL.classList.add('active');
    botaoDesC.classList.remove('active');
    botaoFoco.classList.remove('active');
    
})

function clickBotao(mudança){
    html.setAttribute('data-contexto', mudança);
    imagen.setAttribute('src',`/imagens/${mudança}.png`);
    mostratempo();
}

function titulo(texto,strong){
    let campo = document.querySelector('h1');
    campo.innerHTML = `${texto}<br>
    <strong class="app__title-strong">${strong}</strong>`;
}

const contagem = () => {
    if (tempoEmSegundos <= 0){
        beep.play();
        zerar();
        tempoEmSegundos = 5;
        ComecarPausar('Começar','play_arrow')
        alert('tempo finalizado');
        return
    }
    tempoEmSegundos -= 1;
    mostratempo();
}

startPauseBt.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(intervalo){
        zerar();
        ComecarPausar('Começar','play_arrow');
        pause.play();
        return
    }
    play.play();
    ComecarPausar('Pausar','pause');
    intervalo = setInterval(contagem, 1000);
}

function zerar(){
    clearInterval(intervalo);
    intervalo = null;
    
}

function ComecarPausar(texto,img){
    comecarPausar.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/${img}.png" alt="">
    <span>${texto}</span>`
}

function mostratempo(){
    const tempo = new Date(tempoEmSegundos * 1000);
    const tempoEmMinutos = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoEmMinutos}`;
}

mostratempo();





