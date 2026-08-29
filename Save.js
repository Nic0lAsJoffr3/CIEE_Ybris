let Jogador = JSON.parse(localStorage.getItem("Jogador"));

if (!Jogador) {
    Jogador = {
        id: crypto.randomUUID(),
        nome: "None",
        pontos: 0,
        melhorPontos: 0,
        erros: 0
    };

    SalvarJogador();
}

function SalvarJogador() {


    localStorage.setItem(
        "Jogador",
        JSON.stringify(Jogador)
    );
}


export function DefinirNome(nome) {
    Jogador.nome = nome;
    SalvarJogador();
}

export function AdicionarPontuacao(pontos) {
    Jogador.pontos = pontos;

    if (pontos > Jogador.melhorPontos) {
        Jogador.melhorPontos = pontos;
    }

    SalvarJogador();
}

export function DefinirErros(erros) {
    Jogador.erros = erros;
    SalvarJogador();
}

export function PegarJogador() {
    return Jogador;
}