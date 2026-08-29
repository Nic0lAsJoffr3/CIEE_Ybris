import { Respostas } from "./Respostas.js";
import { ClasseErro, GerarMensagem } from "./utils.js";
const Conteudos = document.getElementById("Conteudos");

let Mensagens = []
let MensagensCXPG = []
let PontuacaoTotal = 0;
let mensagensDesdePergunta = 0;
let proximoIntervalo = 0;

const AreaDoConteudo = document.getElementById("AreaDoConteudo");
const Erros = [
    document.getElementById("erro1"),
    document.getElementById("erro2"),
    document.getElementById("erro3")
]

let QuantErros = 0;

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

    }
    else {
        QuantErros++;
    }

}


// Loop
const PONTOS = document.getElementById("Pontos");
let velocidade = 20;
setInterval(() => {
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

// Loop Render
function Render() {
    ClasseErro(Erros[0], QuantErros >= 1);
    ClasseErro(Erros[1], QuantErros >= 2);
    ClasseErro(Erros[2], QuantErros >= 3);

    requestAnimationFrame(Render);
}
requestAnimationFrame(Render);
