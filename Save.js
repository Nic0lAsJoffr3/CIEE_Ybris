import { supabase } from "./Supabase.js";

let JogadorID = localStorage.getItem("JogadorID");

if (!JogadorID) {
    JogadorID = crypto.randomUUID();
    localStorage.setItem("JogadorID", JogadorID);
}

let Partida = JSON.parse(localStorage.getItem("Partida"));

if (!Partida) {
    Partida = {
        pontos: 0,
        erros: 0
    };
}

let Jogador = {
    id: JogadorID,
    nome: "",
    pontos: Partida.pontos ?? 0,
    melhorPontos: 0,
    erros: Partida.erros ?? 0
};

function SalvarPartida() {
    localStorage.setItem(
        "Partida",
        JSON.stringify({
            pontos: Jogador.pontos,
            erros: Jogador.erros
        })
    );
}

export async function CarregarJogador() {
    const { data, error } = await supabase
        .from("jogadores")
        .select("id, nome, melhor_pontos")
        .eq("id", JogadorID)
        .maybeSingle();

    if (error) {
        console.error("Erro ao carregar jogador:", error);
        return false;
    }

    if (data) {
        Jogador.nome = data.nome;
        Jogador.melhorPontos = data.melhor_pontos ?? 0;
        return true;
    }

    return false;
}

export function DefinirNome(nome) {
    Jogador.nome = nome;
}

export async function AdicionarPontuacao(pontos) {
    Jogador.pontos = pontos;

    if (pontos > Jogador.melhorPontos) {
        Jogador.melhorPontos = pontos;
        await SalvarJogadorSupabase();
    }

    SalvarPartida();
}

export function DefinirErros(erros) {
    Jogador.erros = erros;
    SalvarPartida();
}

export function PegarJogador() {
    return Jogador;
}

export async function SalvarJogadorSupabase() {
    if (!Jogador.nome) {
        return false;
    }

    const { data, error } = await supabase.functions.invoke(
        "salvar-jogador",
        {
            body: {
                id: Jogador.id,
                nome: Jogador.nome,
                pontos: Jogador.melhorPontos
            }
        }
    );

    if (error) {
        console.error("Erro ao salvar jogador:", error);
        return false;
    }

    if (data?.erro) {
        console.error(data.erro);
        return false;
    }

    return true;
}

