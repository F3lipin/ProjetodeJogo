
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

        opcoes: []

    },


    // RESPOSTA PARA A SEGUNDA ESCOLHA
    e_o_diabo: {

        fala: "É SENHOR DIABO para você.",

        opcoes: []

    }

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

    // Limpa as opções anteriores
    elementoOpcoes.replaceChildren();

    // Limpa a fala anterior
    elementoFala.textContent = "";

    if (temporizadorDigitacao) {
        clearTimeout(temporizadorDigitacao);
    }

    let indice = 0;

    digitando = true;


    // Efeito de digitação
    function digitar() {

        if (indice < dialogo.fala.length) {

            elementoFala.textContent +=
                dialogo.fala.charAt(indice);

            indice++;

            temporizadorDigitacao =
                setTimeout(digitar, 65);

        } else {

            digitando = false;

            // Mostra as opções somente após terminar a fala
            mostrarOpcoes(dialogo.opcoes);

        }

    }

    digitar();

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
