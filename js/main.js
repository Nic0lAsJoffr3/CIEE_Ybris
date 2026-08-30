import { Respostas } from "./Respostas.js";
import {
    AdicionarPontuacao,
    DefinirErros,
    DefinirNome,
    PegarJogador,
    CarregarJogador,
    SalvarJogadorSupabase
} from "./Save.js";
import { ClasseErro, GerarMensagem, GerarMensagemEspecial } from "./utils.js";
import { CarregarPostagens } from "./newpost.js";
import { supabase } from "./Supabase.js";

const Conteudos = document.getElementById("Conteudos");
const AreaDoConteudo = document.getElementById("AreaDoConteudo");
const MelhorPontuacao = document.getElementById("MelhorPontos");
const PONTOS = document.getElementById("Pontos");
const FEEDBACK = document.getElementById("feedback");
const LOGIN = document.getElementById("login");
const REGRAS = document.getElementById("regras");
const PLACAR = document.getElementById("Placar");
const POSTAGEM = document.getElementById("NovoPost");

const _FEEDBACK = {
    good: document.getElementById("good_feedback"),
    bad: document.getElementById("bad_feedback")
};

const cxpg0 = document.getElementById("cxpg0");
const cxpg1 = document.getElementById("cxpg1");
const cxpg2 = document.getElementById("cxpg2");
const cxpg3 = document.getElementById("cxpg3");

const Erros = [
    document.getElementById("erro1"),
    document.getElementById("erro2"),
    document.getElementById("erro3")
];

const PAGINA = {
    Jogo: 0,
    Sobre: 1,
    Placar: 2,
    Perfil: 3
};

const BTN = {
    Jogo: document.getElementById("BTNJogo"),
    Placar: document.getElementById("BTNPlacar"),
    Sobre: document.getElementById("BTNSobre"),
    Perfil: document.getElementById("BTNPerfil")
};

const AREA = {
    Jogo: document.getElementById("Conteudos"),
    Placar: document.getElementById("Placar"),
    Sobre: document.getElementById("Sobre"),
    Perfil: document.getElementById("Perfil")
};

let Mensagens = [];
let MensagensCXPG = [];
let PontuacaoTotal = 0;
let mensagensDesdePergunta = 0;
let proximoIntervalo = 0;
let feedbackAberto = false;
let QuantErros = 0;
let RespostaCXPG = -1;
let velocidade = 8;
let PaginaAtual = PAGINA.Jogo;
let JogoIniciado = false;
let Inicializando = true;
let Postagens = [];
let Jogador = PegarJogador();
Postagens = await CarregarPostagens();
function DialogAberto() {
    return document.querySelector("dialog[open]") !== null;
}

async function Inicializar() {
    CarregarTema();
    const carregou = await CarregarJogador();
    Jogador = PegarJogador();
    Inicializando = false;

    if (carregou && Jogador.nome) {
        AtualizarInterface();
        IniciarJogo();
        return;
    }

    LOGIN.showModal();
}

function AtualizarInterface() {
    document.getElementById("NomeUser").innerText = Jogador.nome;
    MelhorPontuacao.innerText = Jogador.melhorPontos;
    PontuacaoTotal = Jogador.pontos;
    QuantErros = Jogador.erros;
    PONTOS.innerText = "Pontos: " + PontuacaoTotal;
}

function IniciarJogo() {
    if (JogoIniciado) return;

    JogoIniciado = true;

    for (let i = 0; i < 10; i++) {
        GerarConteudos();
    }

    requestAnimationFrame(Render);
}

function MudarTema(tema) {
    document.documentElement.classList.toggle("tema-claro", tema === "claro");
    localStorage.setItem("Tema", tema);
    AtualizarBotoesTema();
}

window.NovaPostagem = NovaPostagem;
function NovaPostagem() {
    POSTAGEM.showModal();
}

function AtualizarBotoesTema() {
    const tema = localStorage.getItem("Tema") || "escuro";

    document.getElementById("TemaEscuro")
        ?.classList.toggle("selected", tema === "escuro");

    document.getElementById("TemaClaro")
        ?.classList.toggle("selected", tema === "claro");
}

function CarregarTema() {
    const tema = localStorage.getItem("Tema") || "escuro";

    document.documentElement.classList.toggle(
        "tema-claro",
        tema === "claro"
    );

    AtualizarBotoesTema();
}

window.MudarTema = MudarTema;

async function SalvarNome() {
    if (Inicializando) return;

    const input = document.getElementById("nomeUsuario");
    const nome = input.value.trim();
    const botao = document.getElementById("btnEntrar");

    if (
        nome.length < 5 ||
        nome.length > 30 ||
        !/^[a-zA-Z0-9_]+$/.test(nome)
    ) {
        alert("O nome deve ter entre 5 e 30 caracteres e conter apenas letras, números ou _.");
        return;
    }

    botao.disabled = true;

    DefinirNome(nome);
    Jogador = PegarJogador();

    const salvo = await SalvarJogadorSupabase();

    if (!salvo) {
        botao.disabled = false;
        alert("Não foi possível salvar seu jogador. Verifique sua conexão e tente novamente.");
        return;
    }

    AtualizarInterface();
    LOGIN.close();

    if (REGRAS) {
        REGRAS.showModal();
    } else {
        IniciarJogo();
    }

    botao.disabled = false;
}

window.SalvarNome = SalvarNome;

document.getElementById("nomeUsuario")?.addEventListener("input", function () {
    this.value = this.value.replace(/\s/g, "");
});

function GerarConteudos() {
    let pergunta = false;

    if (mensagensDesdePergunta >= proximoIntervalo && Math.random() < 0.7) {
        pergunta = true;
    }

    if (pergunta) {
        mensagensDesdePergunta = 0;
        proximoIntervalo = Math.floor(Math.random() * 3) + 6;
    } else {
        mensagensDesdePergunta++;
    }

    let conteudo = "";

    if (pergunta) {
        const perguntaSorteada = Math.floor(Math.random() * Respostas.CXPG.length);

        conteudo = GerarMensagem(
            Respostas.CXPG[perguntaSorteada].html,
            perguntaSorteada,
            false
        );

        MensagensCXPG.push(conteudo);
        conteudo.classList.add("DivDePergunta");
    } else if (Postagens.length > 0 && Math.random() < 0.05) {
        const postagem = Postagens[Math.floor(Math.random() * Postagens.length)];

        conteudo = GerarMensagemEspecial(postagem.nome, postagem.mensagem);
    } else {
        conteudo = GerarMensagem("", -1, true);
    }

    Mensagens.push(conteudo);
    Conteudos.appendChild(conteudo);
}

AreaDoConteudo.addEventListener("wheel", e => {
    e.preventDefault();
}, { passive: false });

AreaDoConteudo.addEventListener("scroll", () => {
    if (!JogoIniciado || DialogAberto()) return;

    const atual = AreaDoConteudo.scrollTop;
    const maximo = AreaDoConteudo.scrollHeight - AreaDoConteudo.clientHeight;

    if (maximo - atual < 500) {
        GerarConteudos();

        if (Mensagens.length > 40) {
            Mensagens.shift().remove();
        }
    }
});

function MudarInput(i) {
    RespostaCXPG = i >= 0 && i < 4 ? i : 0;

    cxpg0.classList[RespostaCXPG === 0 ? "add" : "remove"]("selected");
    cxpg1.classList[RespostaCXPG === 1 ? "add" : "remove"]("selected");
    cxpg2.classList[RespostaCXPG === 2 ? "add" : "remove"]("selected");
    cxpg3.classList[RespostaCXPG === 3 ? "add" : "remove"]("selected");
}

window.MudarInput = MudarInput;

export function ReceberRespostaCXPG(i, dom, dialog) {
    dom.remove();
    dialog.close();
    MensagensCXPG.shift();
    _FEEDBACK.bad.querySelector("#RespostaCorreta").innerText = Respostas.CXPG[i].respostas[Respostas.CXPG[i].respostaCorreta]

    const EstaCorreta =
        Respostas.CXPG[i].respostaCorreta === RespostaCXPG;

    if (EstaCorreta) {
        Respostas.CXPG[i].acertos++;

        const pontosGanhos =
            Math.round(100 / Respostas.CXPG[i].acertos);

        PontuacaoTotal += pontosGanhos;

        _FEEDBACK.good.style.display = "block";
        _FEEDBACK.bad.style.display = "none";

        _FEEDBACK.good.querySelector("span").innerText =
            pontosGanhos + " Pontos";

        AdicionarPontuacao(PontuacaoTotal);

        Jogador = PegarJogador();
        MelhorPontuacao.innerText = Jogador.melhorPontos;
    } else {
        QuantErros++;

        _FEEDBACK.good.style.display = "none";
        _FEEDBACK.bad.style.display = "block";

        _FEEDBACK.bad.querySelector("span").innerText =
            QuantErros +
            (QuantErros > 1 ? " erros" : " erro") +
            (QuantErros >= 3 ? ", sua pontuação foi reiniciada!" : ".");
        if (QuantErros >= 3) {
            QuantErros = 0;
            PontuacaoTotal = 0;
        }

        AdicionarPontuacao(PontuacaoTotal);
        DefinirErros(QuantErros);

        Jogador = PegarJogador();
    }

    RespostaCXPG = -1;
    feedbackAberto = true;
    FEEDBACK.showModal();
}

window.closeFeedback = closeFeedback;

function closeFeedback() {
    FEEDBACK.close();
    feedbackAberto = false;
}

async function CarregarRanking() {
    if (!PLACAR) return;

    PLACAR.innerHTML = `
        <h1>Placar de líderes</h1>
        <p class="RankingCarregando">Carregando ranking...</p>
    `;

    const { data, error } = await supabase
        .from("jogadores")
        .select("id,nome,melhor_pontos")
        .gte("melhor_pontos", 500)
        .order("melhor_pontos", { ascending: false })
        .limit(50);

    if (error) {
        console.error("Erro ao carregar ranking:", error);

        PLACAR.innerHTML = `
            <h1>Placar de líderes</h1>
            <p class="RankingErro">
                Não foi possível carregar o placar.
            </p>
        `;

        RankingCarregado = false;
        return;
    }

    const jogadores = data || [];

    PLACAR.innerHTML = "";

    const titulo = document.createElement("h1");
    titulo.innerText = "Placar de líderes";

    const ranking = document.createElement("ol");
    ranking.classList.add("Ranking");

    if (jogadores.length === 0) {
        const vazio = document.createElement("p");
        vazio.innerText = "Ainda não há jogadores no ranking.";
        PLACAR.append(titulo, vazio);
        RankingCarregado = true;
        return;
    }

    jogadores.forEach((jogador, indice) => {
        const li = document.createElement("li");

        const posicao = document.createElement("span");
        posicao.classList.add("posicao");
        posicao.innerText = indice + 1;

        const nome = document.createElement("span");
        nome.classList.add("nome");
        nome.innerText = jogador.nome;

        const pontos = document.createElement("span");
        pontos.classList.add("pontos");
        pontos.innerText = Math.floor(jogador.melhor_pontos) + " pts";

        li.append(posicao, nome, pontos);

        if (indice < 10) {
            li.classList.add("top10");
        }

        if (indice === 0) {
            li.classList.add("primeiro");
        }

        if (indice === 1) {
            li.classList.add("segundo");
        }

        if (indice === 2) {
            li.classList.add("terceiro");
        }

        if (jogador.id === Jogador.id) {
            li.classList.add("jogador");
        }

        ranking.appendChild(li);
    });

    PLACAR.append(titulo, ranking);
    RankingCarregado = true;
}

async function AtualizarRanking() {
    if (PaginaAtual === PAGINA.Placar) {
        await CarregarRanking();
    }
}

setInterval(() => {
    if (!JogoIniciado) return;
    if (DialogAberto()) return;
    if (feedbackAberto) return;

    if (PaginaAtual !== PAGINA.Jogo) {
        MensagensCXPG[0]?.remove();
        MensagensCXPG.shift();
        return;
    }

    if (MensagensCXPG.length > 0) {
        if (AreaDoConteudo.scrollTop < MensagensCXPG[0].offsetTop - 150) {
            AreaDoConteudo.scrollTop += velocidade;

        } else if (AreaDoConteudo.scrollTop > MensagensCXPG[0].offsetTop - 100) {
            AreaDoConteudo.scrollTop -= velocidade;

        }
    } else {
        AreaDoConteudo.scrollTop += 15;
    }

    PONTOS.innerText = "Pontos: " + PontuacaoTotal;
}, 10);

window.mudarPagina = mudarPagina;

function mudarPagina(i) {
    PaginaAtual = i;

    if (i === PAGINA.Jogo) {
        window.location.replace("index.html");
        return;
    }

    if (i === PAGINA.Placar) {
        CarregarRanking();
    }
}

function Render() {
    ClasseErro(Erros[0], QuantErros >= 1);
    ClasseErro(Erros[1], QuantErros >= 2);
    ClasseErro(Erros[2], QuantErros >= 3);

    BTN.Jogo.classList[PaginaAtual === PAGINA.Jogo ? "add" : "remove"]("hidden_area");
    BTN.Placar.classList[PaginaAtual === PAGINA.Placar ? "add" : "remove"]("hidden_area");
    BTN.Sobre.classList[PaginaAtual === PAGINA.Sobre ? "add" : "remove"]("hidden_area");
    BTN.Perfil.classList[PaginaAtual === PAGINA.Perfil ? "add" : "remove"]("hidden_area");

    AREA.Jogo.classList[PaginaAtual !== PAGINA.Jogo ? "add" : "remove"]("hidden_area");
    AREA.Placar.classList[PaginaAtual !== PAGINA.Placar ? "add" : "remove"]("hidden_area");
    AREA.Sobre.classList[PaginaAtual !== PAGINA.Sobre ? "add" : "remove"]("hidden_area");
    AREA.Perfil.classList[PaginaAtual !== PAGINA.Perfil ? "add" : "remove"]("hidden_area");

    requestAnimationFrame(Render);
}

REGRAS?.addEventListener("close", () => {
    IniciarJogo();
});

Inicializar();