import { ReceberRespostaCXPG } from "./main.js";
import { Respostas } from "./Respostas.js";

const DIALOGCXPG = document.getElementById("CXPG");

export function gerarLorem() {
    const frases = [
        "Não aguento mais isso",
        "Sério que isso aconteceu de novo",
        "Alguém mais passou por isso?",
        "Eu precisava falar sobre isso",
        "Não sei nem o que pensar",
        "Que situação horrível",
        "Isso não é normal",
        "Estou cansada disso",
        "Preciso desabafar",
        "Não acredito no que aconteceu",
        "Por que algumas pessoas fazem isso?",
        "Eu realmente não esperava por essa",
        "Isso me deixou muito mal",
        "Não sei se estou exagerando",
        "Talvez eu esteja vendo coisa onde não tem",
        "Estou tentando entender tudo isso",
        "Não queria chegar nesse ponto",
        "Isso aconteceu comigo ontem",
        "Eu não sabia para quem contar",
        "Só queria que alguém me ouvisse",
        "Estou muito confusa com tudo",
        "Isso está acontecendo faz um tempo",
        "Eu tentei ignorar, mas não dá mais",
        "Ninguém parece levar isso a sério",
        "Eu achei que era só uma brincadeira",
        "Não gostei nem um pouco disso",
        "Isso passou dos limites",
        "Estou realmente preocupada",
        "Não sei o que fazer agora",
        "Eu precisava colocar isso para fora",
        "Isso me deixou sem reação",
        "Ainda estou tentando processar",
        "Não consigo acreditar nisso",
        "Parece que ninguém entende",
        "Eu devia ter percebido antes",
        "Não quero mais passar por isso",
        "Isso está me fazendo muito mal",
        "Eu não acho isso certo",
        "Cansei de fingir que está tudo bem",
        "Não quero continuar escondendo isso"
    ];

    const complementos = [
        "Eu nunca imaginei que chegaria a esse ponto.",
        "No começo eu achei que não era nada demais.",
        "Agora não sei mais como lidar com isso.",
        "Toda vez que tento falar sobre isso, acontece alguma coisa.",
        "Parece que a situação só piora.",
        "Eu tento ficar tranquila, mas está ficando difícil.",
        "Talvez eu devesse ter falado antes.",
        "Estou começando a perceber que isso não é normal.",
        "Não sei se outras pessoas passam pela mesma coisa.",
        "Eu realmente precisava contar isso para alguém.",
        "Por fora parece uma coisa, mas por dentro é completamente diferente.",
        "Eu fiquei pensando nisso o dia inteiro.",
        "Não quero que isso continue acontecendo.",
        "Às vezes eu penso que estou exagerando, mas não parece.",
        "Eu só queria conseguir ter um pouco de paz.",
        "Isso começou pequeno e foi ficando cada vez pior.",
        "Eu não sabia que certas atitudes podiam machucar tanto.",
        "Estou cansada de tentar justificar o comportamento dos outros."
    ];

    const emojis = [
        "😕", "😔", "😞", "🥺", "😣",
        "😡", "💔", "😭", "🙁", "😶",
        "🤦‍♀️", "🫤", "💭", "⚠️", "🖤",
        "😓", "😥", "🤷‍♀️", "❗", "❓"
    ];

    const sorteio = Math.random();
    let quantidadeFrases;

    if (sorteio < 0.20) {
        quantidadeFrases = 1;
    } else if (sorteio < 0.75) {
        quantidadeFrases = 2;
    } else if (sorteio < 0.95) {
        quantidadeFrases = 3;
    } else {
        quantidadeFrases = 4;
    }

    const postagem = [];

    for (let i = 0; i < quantidadeFrases; i++) {
        let frase;

        if (i === 0 || Math.random() < 0.55) {
            frase = frases[Math.floor(Math.random() * frases.length)];
        } else {
            frase = complementos[Math.floor(Math.random() * complementos.length)];
        }

        if (i === 0 && Math.random() < 0.45) {
            frase = frase.charAt(0).toUpperCase() + frase.slice(1);
        }

        postagem.push(frase);
    }

    let texto = postagem.join(" ");

    if (Math.random() < 0.35) {
        texto += " " + emojis[Math.floor(Math.random() * emojis.length)];
    }

    if (Math.random() < 0.12) {
        texto += " " + emojis[Math.floor(Math.random() * emojis.length)];
    }

    if (Math.random() < 0.20) {
        texto = texto.replace(/\.$/, "!");
    }

    if (Math.random() < 0.10) {
        texto += "?";
    }

    return texto;
}

export function gerarUsuario() {
    const nomes = [
        "ana", "julia", "mariana", "beatriz", "larissa",
        "camila", "leticia", "gabriela", "isabela", "amanda",
        "laura", "manuela", "sofia", "carolina", "fernanda",
        "alice", "helena", "valentina", "luiza", "lorena",
        "bianca", "sabrina", "natalia", "bruna", "vanessa",
        "aline", "eduarda", "giovanna", "marina", "yasmim",
        "clara", "sara", "isadora", "rafaela", "victoria",
        "emily", "nicole", "rebecca", "catarina", "luana",
        "esther", "cecilia", "agatha", "lavinia", "milena",
        "melissa", "yasmin", "eloa", "valeria", "maite"
    ];

    const sobrenomes = [
        "silva", "santos", "souza", "oliveira", "costa",
        "pereira", "rocha", "lima", "alves", "ribeiro",
        "martins", "carvalho", "gomes", "barbosa", "mendes",
        "teixeira", "moreira", "dias", "nunes", "freitas",
        "fernandes", "machado", "batista", "cardoso", "ramos",
        "azevedo", "monteiro", "moraes", "castro", "vieira"
    ];

    const apelidos = [
        "zinha", "zinha_", "zinhaa", "s", "h",
        "x", "sz", "zera", "reis", "lili",
        "ju", "mah", "bia", "lari", "cami",
        "gabi", "isa", "mandy", "lau", "sofi",
        "carol", "fer", "nana", "duda", "gi",
        "mari", "nati", "bru", "vivi", "lele",
        "bel", "isaah", "juh", "marii", "biaa"
    ];

    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    const apelido = apelidos[Math.floor(Math.random() * apelidos.length)];
    const numero = Math.floor(Math.random() * 100);

    const formatos = [
        () => `${nome}${sobrenome}`,
        () => `${nome}_${sobrenome}`,
        () => `${nome}.${sobrenome}`,
        () => `${nome}${numero}`,
        () => `${nome}_${numero}`,
        () => `${nome}${apelido}`,
        () => `${nome}_${apelido}`,
        () => `${nome}${sobrenome}${numero}`,
        () => `${nome.charAt(0)}${sobrenome}${numero}`,
        () => `${nome}${sobrenome.charAt(0)}${numero}`,
        () => `${nome}_${sobrenome.charAt(0)}`,
        () => `${nome.charAt(0)}${nome.slice(1)}${numero}`
    ];

    return formatos[Math.floor(Math.random() * formatos.length)]();
}
export function gerarCorAleatoria() {
    const temaClaro = document.documentElement.classList.contains("tema-claro");

    const coresEscuras = [
        "#3B1010", "#4A1111", "#5C1515", "#6E1919",
        "#3B1020", "#4A1228", "#5A1630", "#6B1B38",
        "#35102E", "#45133D", "#55164B", "#671A5A",
        "#2D123D", "#3B1550", "#491963", "#581D76",
        "#24113D", "#301550", "#3C1963", "#481E76",
        "#17133D", "#1E1950", "#261E63", "#2D2476",
        "#101A3D", "#142350", "#192D63", "#1E3776",
        "#0D263D", "#103250", "#143D63", "#184876",
        "#0D3038", "#10404A", "#14505C", "#19606E",
        "#0B3430", "#0E443D", "#125449", "#166455",
        "#103518", "#15461E", "#195625", "#1D672C",
        "#263B0E", "#324C11", "#3E5D14", "#4A6E18",
        "#3D2D0B", "#503B0E", "#634A12", "#765816",
        "#3D210C", "#512C0F", "#643712", "#774115",
        "#3D180C", "#521F0F", "#662612", "#792D15",
        "#32140E", "#431A12", "#541F16", "#66261A",
        "#26120F", "#351813", "#441E17", "#54251C",
        "#21131A", "#301A24", "#3E212E", "#4D2838",
        "#1D1426", "#291C35", "#352344", "#412A53",
        "#171521", "#22202F", "#2D2A3D", "#38344B",
        "#11171D", "#172027", "#1D2931", "#24323B",
        "#0F1B18", "#142520", "#192F28", "#1E3930",
        "#121C2B", "#18263A", "#1E3049", "#253A58",
        "#1A101F", "#24152C", "#2E1A39", "#382045",
        "#1C1012", "#281518", "#341A1E", "#402024",
        "#151515", "#202020", "#2B2B2B", "#363636"
    ];

    const coresClaras = [
        "#FF6B6B", "#FF8787", "#FF9F9F", "#FFB3B3",
        "#F06595", "#F783AC", "#FA9BC0", "#FFB6D0",
        "#CC5DE8", "#DA77F2", "#E599F7", "#EEB5FA",
        "#845EF7", "#9775FA", "#B197FC", "#C7B7FF",
        "#5C7CFA", "#748FFC", "#91A7FF", "#AFC0FF",
        "#339AF0", "#4DABF7", "#74C0FC", "#A5D8FF",
        "#22B8CF", "#3BC9DB", "#66D9E8", "#99E9F2",
        "#20C997", "#38D9A9", "#63E6BE", "#96F2D7",
        "#51CF66", "#69DB7C", "#8CE99A", "#B2F2BB",
        "#94D82D", "#A9E34B", "#C0EB75", "#D8F5A2",
        "#FCC419", "#FFD43B", "#FFE066", "#FFEC99",
        "#FF922B", "#FFA94D", "#FFC078", "#FFD8A8",
        "#FF7043", "#FF8A65", "#FFAB91", "#FFCCBC",
        "#E17055", "#E98B73", "#F0A28D", "#F7BAAA",
        "#D63031", "#E55050", "#F06A6A", "#F58B8B",
        "#E84393", "#EB5FA3", "#F07BB5", "#F5A0C9",
        "#6C5CE7", "#8075EA", "#9A8FEF", "#B3A9F5",
        "#00B894", "#26C6A3", "#52D4B8", "#82E2CB",
        "#0984E3", "#329AF0", "#5BAFF4", "#85C4F8",
        "#00A8A8", "#20BDBD", "#4ACCCC", "#7BDADA",
        "#6AB04C", "#7BCB61", "#98D982", "#B5E69F",
        "#B8860B", "#D39E17", "#E7B63B", "#F0CA65",
        "#8E44AD", "#A55DBE", "#BA76CF", "#CE91DE",
        "#34495E", "#4A6278", "#617A90", "#7A91A5",
        "#795548", "#916B5C", "#A98575", "#C19C8B",
        "#607D8B", "#78909C", "#90A4AE", "#B0BEC5"
    ];

    const cores = temaClaro ? coresClaras : coresEscuras;

    return cores[Math.floor(Math.random() * cores.length)];
}

export function GerarMensagem(ConteudoHTML, idMensagem, hidden) {
    const Conteudo = document.createElement("div");
    Conteudo.classList.add("Conteudo");

    if (hidden) {
        Conteudo.classList.add("Hidden");
        ConteudoHTML = gerarLorem();
    }

    const Header = document.createElement("div");
    Header.classList.add("ConteudoHeader");

    const Foto = document.createElement("img");
    const Nome = document.createElement("h3");

    Nome.innerText = gerarUsuario();
    Foto.style.backgroundColor = gerarCorAleatoria();

    Header.append(Foto, Nome);

    const ConteudoPrincipal = document.createElement("div");
    ConteudoPrincipal.classList.add("ConteudoPrincipal");
    ConteudoPrincipal.innerHTML = ConteudoHTML;

    const ConteudoFooter = document.createElement("ul");
    ConteudoFooter.classList.add("ConteudoFooter");

    function Li(classe, span = true) {
        const li = document.createElement("li");
        const img = document.createElement("img");

        img.classList.add(classe);

        if (span) {
            const span = document.createElement("span");
            const int = Math.round(Math.random() * 100);

            span.innerText = int;
            li.append(img, span);
        } else {
            li.appendChild(img);
        }

        return li;
    }

    const Like = Li("BTNLike");
    const Comentario = Li("BTNComentario");
    const Enviar = Li("BTNEnviar");

    let Reportar = document.createElement("li");

    if (hidden) {
        Reportar = Li("BTNDenuncia", false);
    } else {
        Reportar = document.createElement("li");

        const img = document.createElement("img");
        const button = document.createElement("button");

        button.addEventListener("click", () => {
            const r = Respostas.CXPG[idMensagem];

            DIALOGCXPG.showModal();

            DIALOGCXPG.querySelector("p").innerHTML = r.html;
            DIALOGCXPG.querySelector("#cxpg0 + span").innerText = r.respostas[0];
            DIALOGCXPG.querySelector("#cxpg1 + span").innerText = r.respostas[1];
            DIALOGCXPG.querySelector("#cxpg2 + span").innerText = r.respostas[2];
            DIALOGCXPG.querySelector("#cxpg3 + span").innerText = r.respostas[3];

            DIALOGCXPG.querySelector("#EnviarDenuncia").onclick = () => {
                ReceberRespostaCXPG(
                    idMensagem,
                    Conteudo,
                    DIALOGCXPG
                );
            };
        });

        img.classList.add("BTNDenuncia");

        button.appendChild(img);
        Reportar.appendChild(button);
    }

    ConteudoFooter.append(
        Like,
        Comentario,
        Enviar,
        Reportar
    );

    Conteudo.append(
        Header,
        ConteudoPrincipal,
        ConteudoFooter
    );

    return Conteudo;
}

export function ClasseErro(_dom, _bool) {
    if (_bool) {
        _dom.classList.add("erro");
    } else {
        _dom.classList.remove("erro");
    }
}