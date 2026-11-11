
// ==========================================
// SISTEMA DE DIÁLOGOS
// ==========================================

const dialogos = {

    // PRIMEIRA FALA
    inicio: {

        fala: "Eaí, seu merda!",

        opcoes: [

            {
                texto: "Quem é você?",
                proximo: "quem_e_voce"
            },

            {
                texto: "Caramba! É o diabo!",
                proximo: "e_o_diabo"
            }

        ]

    },


    // RESPOSTA PARA A PRIMEIRA ESCOLHA
    quem_e_voce: {

        fala: "Tenho vários vulgos. Mas a partir de agora você pode começar a me chamar de patrão.", 

        opcoes: [
            {
                texto: "...",
                proximo: "proximo_e_o_diabo"
            }
        ]

    },

    proximo_e_o_diabo: {
        fala: "Sua alma é minha agora.",
        opcoes: [
            {
                texto: "...",
                proximo: "proximo1"
            }
        ]
    },


    // RESPOSTA PARA A SEGUNDA ESCOLHA
    e_o_diabo: {

        fala: "É SENHOR DIABO para você.",

        opcoes: [
            {
                texto: "...",
                proximo: "proximo1"
            }
        ]

    },

    // SEGUNDA FALA DO PERSONAGEM
    proximo1: {

        falas: [

        "Enfim...",

        "Serei direto com você: eu vim aqui para me alimentar de sua alma.",

        "Porém, o fato é que sua existência é tão insignificante que sua alma sequer possui valor nutricional.",

        "É patético.",

        "Mas não se preocupe, meu escravo.",

        "Te fornecerei uma migalha de relevância.",

        "Farei de você um CHEFE DA MÁFIA. Terá que lidar com DINHEIRO, ASSOCIADOS, POLICIAIS e CIVIS.",

        "Então... acha que consegue lidar com isso?",
        ],

        opcoes: [

            {
                texto: "Sim?",
                proximo: "sim"
            },

            {
                texto: "Não.",
                proximo: "nao"
            }
        ]

    },

    // RESPOSTA PARA A PRIMEIRA ESCOLHA DA SEGUNDA FAL

    sim: {

        falas: [

            "Isso! Proatividade! Adoro sujeitos proativos!",

            "Meu reino está cheio deles, afinal."

        ],

        opcoes: [],

        iniciarJogo: true

    },


    // RESPOSTA PARA A SEGUNDA ESCOLHA DA SEGUNDA FALA

    nao: {

        falas: [

            "HAHAHAHAHAHA",

            "Fiz parecer que você tinha alguma escolha, não foi?"

        ],

        opcoes: [],

        iniciarJogo: true

    },

};

// ==========================================
// ACONTECIMENTOS DO JOGO
// ==========================================

const acontecimentos = {
    primeiro: {
        dia: "DIA 01",
        titulo: "Uma visita inesperada",
        texto: "Chefe, um homem está na entrada dizendo que precisa falar com você. Ele parece bastante nervoso.",
        imagem: null,
        esquerda: { texto: "Mande-o entrar." },
        direita: { texto: "Mande-o embora." },
        proximo: "segundo"
    },
    segundo: {
        dia: "DIA 02",
        titulo: "Problemas na vizinhança",
        texto: "Um comerciante reclama da presença dos seus associados perto da loja.",
        imagem: null,
        esquerda: { texto: "Ignore o comerciante." },
        direita: { texto: "Converse com ele." },
        proximo: null
    }
};

let acontecimentoAtual = null;
let temporizadorProximoAcontecimento = null;

// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const elementoFala = document.getElementById("fala");

const elementoOpcoes = document.getElementById("opcoes");

let temporizadorProxima = null;
let falasAtuais = [];
let indiceFala = 0;
let sequenciaAtiva = false;
let aguardandoInicioJogo = false;

let dialogoAtual = null;
let temporizadorDigitacao = null;
let digitando = false;


// ==========================================
// MOSTRAR DIÁLOGO
// ==========================================



function mostrarDialogo(id) {

    const dialogo = dialogos[id];

    if (!dialogo) {
        console.error("Diálogo não encontrado:", id);
        return;
    }

    dialogoAtual = id;

    elementoOpcoes.replaceChildren();
    elementoFala.textContent = "";

    // Cancela temporizadores anteriores
    clearTimeout(temporizadorDigitacao);
    clearTimeout(temporizadorProxima);

    // Aceita falas únicas ou múltiplas
    falasAtuais = dialogo.falas || [dialogo.fala];

    indiceFala = 0;

    sequenciaAtiva = true;
    aguardandoInicioJogo = false;
    digitando = true;

    digitarFala();

}


// ==========================================
// DIGITAR AS FALAS
// ==========================================

function digitarFala() {

    const mensagem = falasAtuais[indiceFala];

    let caractere = 0;

    elementoFala.textContent = "";

    digitando = true;

    function digitar() {

        if (caractere < mensagem.length) {

            elementoFala.textContent += mensagem.charAt(caractere);

            caractere++;

            temporizadorDigitacao = setTimeout(digitar, 65);

        } else {

            digitando = false;

            finalizarFala();

        }

    }

    digitar();

}


// ==========================================
// FINALIZAR FALA
// ==========================================

function finalizarFala() {

    // Ainda existem falas?
    if (indiceFala < falasAtuais.length - 1) {

        temporizadorProxima = setTimeout(() => {

            indiceFala++;

            digitarFala();

        }, 2000);

    } else {

        sequenciaAtiva = false;

        const dialogo = dialogos[dialogoAtual];

        // Se for a última fala da introdução
        if (dialogo.iniciarJogo) {

            aguardandoInicioJogo = true;

            // Dá 6 segundos para o jogador ler
            temporizadorProxima = setTimeout(() => {

                iniciarJogo();

            }, 6000);

        } else {

            // Para nas escolhas
            mostrarOpcoes(dialogo.opcoes || []);

        }

    }

}


// ==========================================
// AVANÇAR COM A BARRA DE ESPAÇO
// ==========================================

document.addEventListener("keydown", function(event) {

    if (event.code !== "Space" || event.repeat) {
        return;
    }

    // Não interfere nas escolhas
    if (!sequenciaAtiva && !aguardandoInicioJogo) {
        return;
    }

    event.preventDefault();

    // Se a frase ainda está sendo digitada,
    // mostra imediatamente a frase completa.
    if (digitando) {

        clearTimeout(temporizadorDigitacao);

        elementoFala.textContent = falasAtuais[indiceFala];

        digitando = false;

        finalizarFala();

        return;

    }

    // Se está esperando a próxima frase,
    // cancela a pausa e avança imediatamente.
    if (sequenciaAtiva && !digitando) {

        clearTimeout(temporizadorProxima);

        indiceFala++;

        digitarFala();

        return;

    }

    // Se chegou à última fala, permite iniciar o jogo
    if (aguardandoInicioJogo) {

        clearTimeout(temporizadorProxima);

        iniciarJogo();

    }

});



// ==========================================
// MOSTRAR OPÇÕES
// ==========================================

function mostrarOpcoes(opcoes) {

    elementoOpcoes.replaceChildren();

    opcoes.forEach((opcao) => {

        const botao = document.createElement("button");

        botao.type = "button";

        botao.className = "opcao";

        botao.textContent = opcao.texto;


        // Quando o jogador clicar
        botao.addEventListener("click", () => {

            if (digitando) return;

            mostrarDialogo(opcao.proximo);

        });


        elementoOpcoes.appendChild(botao);

    });

}

// ==========================================
// MOSTRAR E SELECIONAR ACONTECIMENTOS
// ==========================================

function mostrarAcontecimento(id) {
    const evento = acontecimentos[id];
    if (!evento) {
        console.error("Acontecimento não encontrado:", id);
        document.getElementById("popup-evento").classList.remove("visivel");
        acontecimentoAtual = null;
        return;
    }

    clearTimeout(temporizadorProximoAcontecimento);
    acontecimentoAtual = id;

    document.getElementById("numero-dia").textContent = evento.dia;
    document.getElementById("popup-titulo").textContent = evento.titulo;
    document.getElementById("popup-texto").textContent = evento.texto;

    const areaImagem = document.querySelector(".popup-imagem");
    areaImagem.replaceChildren();
    if (evento.imagem) {
        const imagem = document.createElement("img");
        imagem.src = evento.imagem;
        imagem.alt = "Personagem do acontecimento";
        areaImagem.appendChild(imagem);
    } else {
        areaImagem.textContent = "IMAGEM DO PERSONAGEM";
    }

    const botaoEsquerda = document.getElementById("opcao-esquerda");
    const botaoDireita = document.getElementById("opcao-direita");
    botaoEsquerda.disabled = false;
    botaoDireita.disabled = false;
    botaoEsquerda.classList.remove("selecionada");
    botaoDireita.classList.remove("selecionada");
    document.getElementById("texto-esquerda").textContent = evento.esquerda.texto;
    document.getElementById("texto-direita").textContent = evento.direita.texto;

    document.getElementById("popup-evento").classList.add("visivel");
}

function selecionarOpcao(lado) {
    const evento = acontecimentos[acontecimentoAtual];
    if (!evento) return;

    const botaoEsquerda = document.getElementById("opcao-esquerda");
    const botaoDireita = document.getElementById("opcao-direita");
    if (botaoEsquerda.disabled || botaoDireita.disabled) return;

    const escolha = lado === "esquerda" ? evento.esquerda : evento.direita;
    console.log("Escolha realizada:", escolha.texto);
    evento.escolhaRealizada = lado;

    botaoEsquerda.disabled = true;
    botaoDireita.disabled = true;
    document.getElementById(`opcao-${lado}`).classList.add("selecionada");

    temporizadorProximoAcontecimento = setTimeout(() => {
        document.getElementById("popup-evento").classList.remove("visivel");
        acontecimentoAtual = null;

        if (evento.proximo) {
            temporizadorProximoAcontecimento = setTimeout(() => {
                mostrarAcontecimento(evento.proximo);
            }, 350);
        }
    }, 700);
}

document.getElementById("opcao-esquerda").addEventListener("click", () => selecionarOpcao("esquerda"));
document.getElementById("opcao-direita").addEventListener("click", () => selecionarOpcao("direita"));


// ==========================================
// INICIAR JOGO
// ==========================================

mostrarDialogo("inicio");

// ==========================================
// INICIAR O JOGO
// ==========================================

function iniciarJogo() {

    // Esconde a introdução
    document.body.classList.add("modo-jogo");

    // Aguarda 2,5 segundos antes de mostrar os indicadores
    setTimeout(() => {

        const painel = document.getElementById("painel-status");

        painel.classList.add("visivel");

        mostrarAcontecimento("primeiro");

    }, 2500);

}
