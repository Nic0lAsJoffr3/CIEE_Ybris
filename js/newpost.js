import { supabase } from "./Supabase.js";
import { PegarJogador } from "./Save.js";

const NovoPost = document.getElementById("NovoPost");
const TextareaPost = NovoPost.querySelector("textarea");
const BotaoEnviarPost = NovoPost.querySelector("button");

async function EnviarPost() {
    const mensagem = TextareaPost.value.trim();
    const Jogador = PegarJogador();

    if (!mensagem) {
        alert("Escreva uma mensagem antes de enviar.");
        return;
    }

    if (!Jogador.nome) {
        alert("Não foi possível identificar o jogador.");
        return;
    }

    BotaoEnviarPost.disabled = true;

    const { error } = await supabase
        .from("postagens")
        .insert({
            nome_jogador: Jogador.nome,
            mensagem: mensagem,
            aprovado: false
        });

    if (error) {
        console.error("Erro ao enviar postagem:", error);
        alert("Não foi possível enviar a postagem.");
        BotaoEnviarPost.disabled = false;
        return;
    }

    TextareaPost.value = "";
    NovoPost.close();
    BotaoEnviarPost.disabled = false;
}
export async function CarregarPostagens() {
    const { data, error } = await supabase
        .from("postagens")
        .select("id,nome_jogador,mensagem,criado_em")
        .eq("aprovado", true)
        .order("criado_em", {
            ascending: false
        });

    if (error) {
        console.error("Erro ao carregar postagens:", error);
        return [];
    }

    const Postagens = data.map(postagem => ({
        id: postagem.id,
        nome: postagem.nome_jogador,
        mensagem: postagem.mensagem,
        criadoEm: postagem.criado_em
    }));

    return Postagens;
}
BotaoEnviarPost.addEventListener("click", EnviarPost);