
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
// ELEMENTOS DO HTML
// ==========================================

const elementoFala = document.getElementById("fala");

const elementoOpcoes = document.getElementById("opcoes");

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

    if (temporizadorDigitacao) {
        clearTimeout(temporizadorDigitacao);
    }

    // Aceita tanto uma fala única quanto várias falas
    const falas = dialogo.falas || [dialogo.fala];

    digitando = true;

    let indiceFala = 0;

    function digitarFala() {

        const mensagem = falas[indiceFala];

        let caractere = 0;

        elementoFala.textContent = "";

        function digitar() {

            if (caractere < mensagem.length) {

                elementoFala.textContent += mensagem.charAt(caractere);

                caractere++;

                temporizadorDigitacao = setTimeout(digitar, 65);

            } else {

                indiceFala++;

                if (indiceFala < falas.length) {

                    // Espera 1,5 segundo antes da próxima fala
                    temporizadorDigitacao = setTimeout(digitarFala, 2000);

                } else {

                digitando = false;

                // Verifica se chegou ao final da introdução
                if (dialogo.iniciarJogo) {

                    iniciarJogo();

                } else {

                    // Mostra as opções normalmente
                    mostrarOpcoes(dialogo.opcoes || []);

                }

            }

            }

        }

        digitar();

    }

    digitarFala();

}


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

    }, 2500);

}
