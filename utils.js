import { ReceberRespostaCXPG } from "./main.js";
import { Respostas } from "./Respostas.js";

const DIALOGCXPG = document.getElementById("CXPG");

export function gerarLorem() {
    const palavras = [
        "lorem", "ipsum", "dolor", "sit", "amet",
        "consectetur", "adipiscing", "elit", "sed",
        "do", "eiusmod", "tempor", "incididunt",
        "ut", "labore", "et", "dolore", "magna",
        "aliqua", "enim", "minim", "veniam", "quis",
        "nostrud", "exercitation", "ullamco", "laboris",
        "nisi", "aliquip", "ex", "ea", "commodo",
        "consequat", "duis", "aute", "irure", "dolor",
        "reprehenderit", "voluptate", "velit", "esse",
        "cillum", "fugiat", "nulla", "pariatur"
    ];

    const sorteio = Math.random();
    let quantidade;

    if (sorteio < 0.30) {
        quantidade = Math.floor(Math.random() * 30) + 25;
    }
    else if (sorteio < 0.80) {
        quantidade = Math.floor(Math.random() * 55) + 45;
    }
    else if (sorteio < 0.97) {
        quantidade = Math.floor(Math.random() * 70) + 90;
    }
    else {
        quantidade = Math.floor(Math.random() * 100) + 140;
    }
    const frases = [];
    let frase = [];
    for (let i = 0; i < quantidade; i++) {
        frase.push(
            palavras[Math.floor(Math.random() * palavras.length)]
        );
        if (frase.length >= 8 && Math.random() < 0.15) {
            frase[0] =
                frase[0].charAt(0).toUpperCase() +
                frase[0].slice(1);

            frases.push(frase.join(" ") + ".");
            frase = [];
        }
    }
    if (frase.length > 0) {
        frase[0] =
            frase[0].charAt(0).toUpperCase() +
            frase[0].slice(1);

        frases.push(frase.join(" ") + ".");
    }
    return frases.join(" ");
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
    const cores = [
        "#FF6B6B", "#FF8787", "#F06595", "#CC5DE8",
        "#845EF7", "#5C7CFA", "#339AF0", "#22B8CF",
        "#20C997", "#51CF66", "#94D82D", "#FCC419",
        "#FF922B", "#FF7043", "#A1887F", "#78909C",
        "#607D8B", "#546E7A", "#6C5CE7", "#00B894",
        "#0984E3", "#E17055", "#D63031", "#E84393",
        "#2D3436", "#636E72", "#74B9FF", "#81ECEC"
    ];
    return cores[Math.floor(Math.random() * cores.length)];
}

export function GerarMensagem(ConteudoHTML, idMensagem, hidden) {
    const Conteudo = document.createElement("div");
    Conteudo.classList.add("Conteudo");
    if (hidden) {
        Conteudo.classList.add("Hidden")
        ConteudoHTML = gerarLorem();
    }

    const Header = document.createElement("div");
    Header.classList.add("ConteudoHeader")

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
        }
        else {
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
    }
    else {
        Reportar = document.createElement("li");
        const img = document.createElement("img");
        const button = document.createElement("button");
        button.addEventListener("click", () => {
            const r = Respostas.CXPG[idMensagem];
            DIALOGCXPG.showModal();
            DIALOGCXPG.querySelector("p").innerHTML = r.html
            DIALOGCXPG.querySelector("#cxpg0 + span").innerText = r.respostas[0];
            DIALOGCXPG.querySelector("#cxpg1 + span").innerText = r.respostas[1];
            DIALOGCXPG.querySelector("#cxpg2 + span").innerText = r.respostas[2];
            DIALOGCXPG.querySelector("#cxpg3 + span").innerText = r.respostas[3];
            DIALOGCXPG.querySelector("#EnviarDenuncia").onclick = () => {
                ReceberRespostaCXPG(idMensagem, Conteudo, DIALOGCXPG);
            };
        });
        button.appendChild(img);
        img.classList.add("BTNDenuncia");
        Reportar.appendChild(button);
    }
    ConteudoFooter.append(Like, Comentario, Enviar, Reportar);
    Conteudo.append(Header, ConteudoPrincipal, ConteudoFooter);
    return Conteudo;
}

export function ClasseErro(_dom, _bool) {
    if (_bool) {
        _dom.classList.add("erro");
    }
    else {
        _dom.classList.remove("erro");
    }
}