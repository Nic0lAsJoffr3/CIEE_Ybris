import { Respostas } from "./Respostas.js";
import { AdicionarPontuacao, DefinirErros, PegarJogador } from "./Save.js";
import { ClasseErro, GerarMensagem } from "./utils.js";
const Conteudos = document.getElementById("Conteudos");

let Mensagens = []
let MensagensCXPG = []
let PontuacaoTotal = 0;
let mensagensDesdePergunta = 0;
let proximoIntervalo = 0;
let feedbackAberto = false;
let QuantErros = 0;

let Jogador = PegarJogador();
console.log(Jogador);
QuantErros = Jogador?.erros;

const PAGINA = {
    Jogo: 0,
    Sobre: 1,
    Placar: 2,
    Perfil: 3
}

let PaginaAtual = PAGINA.Jogo;

const MelhorPontuacao = document.getElementById("MelhorPontos");
const AreaDoConteudo = document.getElementById("AreaDoConteudo");


MelhorPontuacao.innerText = Jogador.melhorPontos;
PontuacaoTotal = Jogador.pontos;

const Erros = [
    document.getElementById("erro1"),
    document.getElementById("erro2"),
    document.getElementById("erro3")
]


AreaDoConteudo.addEventListener("wheel", (e) => {
    e.preventDefault();
}, { passive: false });


for (let i = 0; i < 10; i++) {
    GerarConteudos();
}

AreaDoConteudo.addEventListener("scroll", () => {
    const atual = AreaDoConteudo.scrollTop;
    const maximo = AreaDoConteudo.scrollHeight - AreaDoConteudo.clientHeight;
    if (maximo - atual < 500) {
        GerarConteudos();
        if (Mensagens.length > 40) {
            Mensagens.shift().remove();
        }
    }

});
const FEEDBACK = document.getElementById("feedback");
const _FEEDBACK = {
    good: document.getElementById("good_feedback"),
    bad: document.getElementById("bad_feedback"),
}

window.closeFeedback = closeFeedback;
function closeFeedback() {
    FEEDBACK.close();
    feedbackAberto = false;
}


function GerarConteudos() {
    let pergunta = false;
    if (
        mensagensDesdePergunta >= proximoIntervalo &&
        Math.random() < 0.7
    ) {
        pergunta = true;
    }

    if (pergunta) {
        mensagensDesdePergunta = 0;
        proximoIntervalo = Math.floor(Math.random() * 3) + 3;
    }
    else {
        mensagensDesdePergunta++;
    }

    let conteudo = "";

    if (pergunta) {
        const perguntaSorteada =
            Math.floor(Math.random() * Respostas.CXPG.length);

        conteudo = GerarMensagem(
            Respostas.CXPG[perguntaSorteada].html,
            perguntaSorteada,
            false
        );

        MensagensCXPG.push(conteudo);
        conteudo.classList.add("DivDePergunta");
    }
    else {
        conteudo = GerarMensagem("", -1, true);
    }

    Mensagens.push(conteudo);
    Conteudos.appendChild(conteudo);
}



const cxpg0 = document.getElementById("cxpg0");
const cxpg1 = document.getElementById("cxpg1");
const cxpg2 = document.getElementById("cxpg2");
const cxpg3 = document.getElementById("cxpg3");

let RespostaCXPG = -1;
window.MudarInput = MudarInput;
function MudarInput(i) {
    RespostaCXPG = (i > 0 && i < 4 ? i : 0);

    cxpg0.classList[RespostaCXPG == 0 ? "add" : "remove"]("selected");
    cxpg1.classList[RespostaCXPG == 1 ? "add" : "remove"]("selected");
    cxpg2.classList[RespostaCXPG == 2 ? "add" : "remove"]("selected");
    cxpg3.classList[RespostaCXPG == 3 ? "add" : "remove"]("selected");
}

export function ReceberRespostaCXPG(i, dom, dialog) {
    dom.remove();
    dialog.close();
    MensagensCXPG.shift();

    let EstaCorreta = Respostas.CXPG[i].respostaCorreta == RespostaCXPG;
    if (EstaCorreta) {
        Respostas.CXPG[i].acertos++;
        PontuacaoTotal += 100 / (Respostas.CXPG[i].acertos);
        _FEEDBACK.good.style.display = "block";
        _FEEDBACK.bad.style.display = "none";

        _FEEDBACK.good.querySelector("span").innerText = 100 / (Respostas.CXPG[i].acertos) + " Pontos";
        AdicionarPontuacao(PontuacaoTotal);
        Jogador = PegarJogador();

        MelhorPontuacao.innerText = Jogador.melhorPontos;
    }
    else {
        QuantErros++;
        _FEEDBACK.good.style.display = "none";
        _FEEDBACK.bad.style.display = "block";

        _FEEDBACK.bad.querySelector("span").innerText = QuantErros + (QuantErros > 1 ? " erros" : " erro") + (QuantErros >= 3 ? ", sua pontuação foi reiniciada!" : ".");
        if (QuantErros >= 3) {
            QuantErros = 0;
            PontuacaoTotal = 0;
        }
        AdicionarPontuacao(PontuacaoTotal);
        DefinirErros(QuantErros);
    }


    feedbackAberto = true;
    FEEDBACK.showModal();
}


// Loop
const PONTOS = document.getElementById("Pontos");
let velocidade = 20;
setInterval(() => {
    if (feedbackAberto) return;
    if (PaginaAtual != 0) {
        MensagensCXPG[0]?.remove()
        MensagensCXPG.shift();
        return;
    }
    if (MensagensCXPG.length > 0) {
        if (velocidade < 8) velocidade = 8;

        if (AreaDoConteudo.scrollTop < MensagensCXPG[0].offsetTop - 150) {
            AreaDoConteudo.scrollTop += velocidade;
            velocidade -= 0.05;
        }
        else if (AreaDoConteudo.scrollTop > MensagensCXPG[0].offsetTop - 100) {
            AreaDoConteudo.scrollTop -= velocidade;
            velocidade -= 0.05;
        }
        else {
            velocidade = 8
        }
    }
    else {
        AreaDoConteudo.scrollTop += 15;
    }
    PONTOS.innerText = "Pontos: " + PontuacaoTotal
}, 10)

const BTN = {
    Jogo: document.getElementById("BTNJogo"),
    Placar: document.getElementById("BTNPlacar"),
    Sobre: document.getElementById("BTNSobre"),
    Perfil: document.getElementById("BTNPerfil")
}

const AREA = {
    Jogo: document.getElementById("Conteudos"),
    Placar: document.getElementById("Placar"),
    Sobre: document.getElementById("Sobre"),
    Perfil: document.getElementById("Perfil")
}

window.mudarPagina = mudarPagina;
function mudarPagina(i) {
    PaginaAtual = i;
    if (i == 0) {
        window.location.replace("index.html");
    }
}

// Loop Render
function Render() {
    ClasseErro(Erros[0], QuantErros >= 1);
    ClasseErro(Erros[1], QuantErros >= 2);
    ClasseErro(Erros[2], QuantErros >= 3);

    BTN.Jogo.classList[PaginaAtual == PAGINA.Jogo ? "add" : "remove"]("hidden_area");
    BTN.Placar.classList[PaginaAtual == PAGINA.Placar ? "add" : "remove"]("hidden_area");
    BTN.Sobre.classList[PaginaAtual == PAGINA.Sobre ? "add" : "remove"]("hidden_area");
    BTN.Perfil.classList[PaginaAtual == PAGINA.Perfil ? "add" : "remove"]("hidden_area");

    AREA.Jogo.classList[PaginaAtual != PAGINA.Jogo ? "add" : "remove"]("hidden_area");
    AREA.Placar.classList[PaginaAtual != PAGINA.Placar ? "add" : "remove"]("hidden_area");
    AREA.Sobre.classList[PaginaAtual != PAGINA.Sobre ? "add" : "remove"]("hidden_area");
    AREA.Perfil.classList[PaginaAtual != PAGINA.Perfil ? "add" : "remove"]("hidden_area");



    requestAnimationFrame(Render);
}
requestAnimationFrame(Render);
