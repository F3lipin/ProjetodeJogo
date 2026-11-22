
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

// Cadastro centralizado de personagens. Para cadastrar outro personagem,
// adicione uma entrada aqui e use sua chave no acontecimento correspondente.
const personagens = {
    conselheiro: {
        nome: "CONSELHEIRO",
        imagem: "imagens/conselheiro.png"
    }
};
const personagemPadrao = "conselheiro";

const acontecimentos = {
    primeiro: {
        titulo: "Uma visita inesperada",
        texto: "Chefe, um homem está na entrada dizendo que precisa falar com você. Ele parece bastante nervoso.",
        imagem: null,
        esquerda: { texto: "Mande-o entrar.", consequencias: { dinheiro: 10, associados: 5 } },
        direita: { texto: "Mande-o embora.", consequencias: { civis: 5, policiais: 5 } },
    },
    segundo: {
        titulo: "Problemas na vizinhança",
        texto: "Um comerciante reclama da presença dos seus associados perto da loja.",
        imagem: null,
        esquerda: { texto: "Ignore o comerciante.", consequencias: { dinheiro: 5, associados: 10, civis: -10, policiais: -5 } },
        direita: { texto: "Converse com ele.", consequencias: { dinheiro: -5, associados: -5, civis: 10, policiais: 5 } },
    },
    terceiro: {
        titulo: "Problemas na vizinhança",
        texto: "Chefe, alguns dos nossos estão vendendo drogas para as crianças. Acho que devíamos tratar disso.",
        imagem: null,
        esquerda: { texto: "Puna os responsáveis.", consequencias: { dinheiro: -5, associados: -5, civis: 30 } },
        direita: { texto: "Se elas podem pagar...", consequencias: { civis: -40} },
    },
    quarto: {
        titulo: "Problemas na vizinhança",
        texto: "Oficiais estão cobrando grana da gente. Alguns dos nossos não vão gostar, mas pode evitar problemas futuros.",
        imagem: null,
        esquerda: { texto: "Dê a eles um agrado.", consequencias: { dinheiro: -20, policiais: 20, associados: -15 } },
        direita: { texto: "Não sou capacho de policial.", consequencias: { associados: 15, policiais: -20} },
    },
    quinto: {
        titulo: "Problemas na vizinhança",
        texto: "Um desgraçado que mora há algumas quadras daqui bate na própria mulher toda noite. A polícia não faz nada. Os gritos dela me incomodam.",
        imagem: null,
        esquerda: { texto: "Pode dar cabo nele.", consequencias: { civis: 25, associados: 15 } },
        direita: { texto: "Não é problema nosso.", consequencias: { civis: -25, associados: -10 } },
    },
    sexto: {
        titulo: "Problemas na vizinhança",
        texto: "Um policial matou um dos nossos. Vai ter revanche! Só precisamos da sua permissão.",
        imagem: null,
        esquerda: { texto: "Faça o que deve fazer.", consequencias: { associados: 30, policiais: -25 } },
        direita: { texto: "Não permito.", consequencias: { associados: -25, policiais: 30 }, ramificacao: "setimo" },
    },
    setimo: {
        somenteRamificacao: true,
        titulo: "Problemas na vizinhança",
        texto: "Não posso tolerar isso, chefe. É inegociável.",
        imagem: null,
        esquerda: { texto: "Tem razão.", consequencias: { associados: 5, policiais: -25 } },
        direita: { texto: "Eu gaguejei?", consequencias: { associados: -5 } },
    },
};

// A ausência de personagem em um acontecimento usa o Conselheiro como padrão.
Object.values(acontecimentos).forEach((evento) => {
    evento.personagem ??= personagemPadrao;
});

// Valores reais e limites opcionais (null significa sem limite). Ajuste min/max
// para configurar limites sem alterar a lógica das consequências.
const statusJogo = {
    dinheiro: { valor: 50, min: null, max: null },
    associados: { valor: 50, min: null, max: null },
    civis: { valor: 50, min: null, max: null },
    policiais: { valor: 50, min: null, max: null }
};
const nomesStatus = { dinheiro: "Dinheiro", associados: "Associados", civis: "Civis", policiais: "Policiais" };
const duracaoAnimacaoStatus = 560;

function valorLimitado(chave, valor) {
    const config = statusJogo[chave];
    if (config.min !== null) valor = Math.max(config.min, valor);
    if (config.max !== null) valor = Math.min(config.max, valor);
    return valor;
}

function mostrarPrevisao(consequencias = {}) {
    Object.keys(statusJogo).forEach((chave) => {
        const seta = document.querySelector(`[data-indicador="${chave}"]`);
        if (!seta) return;
        seta.classList.remove("visivel", "grande");
        seta.textContent = String.fromCharCode(8594);
        const alteracao = Number(consequencias[chave] ?? 0);
        if (!Number.isFinite(alteracao) || alteracao === 0) return;
        const impactoEfetivo = valorLimitado(chave, statusJogo[chave].valor + alteracao) - statusJogo[chave].valor;
        if (impactoEfetivo === 0) return;
        seta.textContent = "→";
        seta.classList.add("visivel");
        if (Math.abs(impactoEfetivo) >= 20) seta.classList.add("grande");
    });
}

function aplicarConsequencias(consequencias = {}) {
    return Promise.all(Object.keys(statusJogo).map((chave) => new Promise((resolver) => {
        const status = statusJogo[chave];
        const valorInicial = status.valor;
        const alteracao = Number(consequencias[chave] ?? 0);
        const valorFinal = Number.isFinite(alteracao) ? valorLimitado(chave, valorInicial + alteracao) : valorInicial;
        // O estado real é atualizado uma vez; a animação afeta somente a exibição.
        status.valor = valorFinal;
        const elemento = document.querySelector(`[data-status="${chave}"]`);
        if (!elemento) {
            resolver();
            return;
        }
        const inicio = performance.now();
        function animar(agora) {
            const progresso = Math.min((agora - inicio) / duracaoAnimacaoStatus, 1);
            const suavizado = 1 - Math.pow(1 - progresso, 3);
            elemento.textContent = String(Math.round(valorInicial + (valorFinal - valorInicial) * suavizado));
            if (progresso < 1) requestAnimationFrame(animar);
            else {
                elemento.textContent = String(valorFinal);
                resolver();
            }
        }
        requestAnimationFrame(animar);
    })));
}

let acontecimentoAtual = null;
let temporizadorProximoAcontecimento = null;
let diaAtual = 1;
let eventosUtilizados = new Set();
let partidaEncerrada = false;
const acontecimentoInicial = "primeiro";

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
    if (!evento || partidaEncerrada || eventosUtilizados.has(id)) {
        console.error("Acontecimento não encontrado:", id);
        document.getElementById("popup-evento").classList.remove("visivel");
        acontecimentoAtual = null;
        return;
    }

    clearTimeout(temporizadorProximoAcontecimento);
    acontecimentoAtual = id;
    eventosUtilizados.add(id);

    document.getElementById("numero-dia").textContent = `DIA ${String(diaAtual).padStart(2, "0")}`;
    document.getElementById("popup-texto").textContent = evento.texto;

    const personagem = personagens[evento.personagem] || personagens[personagemPadrao];
    document.getElementById("popup-personagem").textContent = personagem.nome;
    const imagemPersonagem = document.getElementById("popup-imagem-personagem");
    imagemPersonagem.src = personagem.imagem;
    imagemPersonagem.alt = personagem.nome;

    const botaoEsquerda = document.getElementById("opcao-esquerda");
    const botaoDireita = document.getElementById("opcao-direita");
    botaoEsquerda.disabled = false;
    botaoDireita.disabled = false;
    botaoEsquerda.classList.remove("selecionada");
    botaoDireita.classList.remove("selecionada");
    document.getElementById("texto-esquerda").textContent = evento.esquerda.texto;
    document.getElementById("texto-direita").textContent = evento.direita.texto;
    evento.decisaoConfirmada = false;
    mostrarPrevisao();

    document.getElementById("popup-evento").classList.add("visivel");
}

function selecionarOpcao(lado) {
    const evento = acontecimentos[acontecimentoAtual];
    if (!evento || partidaEncerrada) return;

    const botaoEsquerda = document.getElementById("opcao-esquerda");
    const botaoDireita = document.getElementById("opcao-direita");
    if (evento.decisaoConfirmada || botaoEsquerda.disabled || botaoDireita.disabled) return;

    const escolha = lado === "esquerda" ? evento.esquerda : evento.direita;
    console.log("Escolha realizada:", escolha.texto);
    evento.escolhaRealizada = lado;
    evento.decisaoConfirmada = true;

    botaoEsquerda.disabled = true;
    botaoDireita.disabled = true;
    document.getElementById(`opcao-${lado}`).classList.add("selecionada");
    // As duas previsões somem assim que a decisão fica confirmada.
    mostrarPrevisao();
    const animacao = aplicarConsequencias(escolha.consequencias);

    animacao.then(() => {
        const statusCritico = encontrarStatusCritico();
        if (statusCritico) {
            mostrarFimDeJogo(statusCritico);
            return;
        }

        temporizadorProximoAcontecimento = setTimeout(() => {
            document.getElementById("popup-evento").classList.remove("visivel");
            acontecimentoAtual = null;
            continuarPartida(escolha);
        }, 140);
    });
}

function sortearAcontecimentoDisponivel() {
    const disponiveis = Object.keys(acontecimentos).filter((id) =>
        !eventosUtilizados.has(id) && !acontecimentos[id].somenteRamificacao
    );
    if (disponiveis.length === 0) return null;
    return disponiveis[Math.floor(Math.random() * disponiveis.length)];
}

function continuarPartida(escolha) {
    if (partidaEncerrada) return;
    const idRamificado = escolha.ramificacao;
    if (idRamificado && acontecimentos[idRamificado] && !eventosUtilizados.has(idRamificado)) {
        temporizadorProximoAcontecimento = setTimeout(() => mostrarAcontecimento(idRamificado), 350);
        return;
    }

    if (idRamificado) {
        console.warn("RamificaÃ§Ã£o indisponÃ­vel; seguindo para o sorteio:", idRamificado);
    }
    const proximoId = sortearAcontecimentoDisponivel();
    if (!proximoId) return;
    diaAtual++;
    temporizadorProximoAcontecimento = setTimeout(() => mostrarAcontecimento(proximoId), 350);
}

function encontrarStatusCritico() {
    return Object.entries(statusJogo).find(([, status]) => status.valor <= 0 || status.valor >= 100) || null;
}

function mostrarFimDeJogo(statusCritico) {
    partidaEncerrada = true;
    acontecimentoAtual = null;
    clearTimeout(temporizadorProximoAcontecimento);
    document.getElementById("popup-evento").classList.remove("visivel");
    document.getElementById("status-fim-jogo").textContent = `Status que encerrou a partida: ${nomesStatus[statusCritico[0]]}.`;
    document.getElementById("tela-game-over").classList.add("visivel");
    document.getElementById("tela-game-over").setAttribute("aria-hidden", "false");
    document.getElementById("botao-tentar-novamente").focus();
}

function reiniciarPartida() {
    clearTimeout(temporizadorProximoAcontecimento);
    partidaEncerrada = false;
    acontecimentoAtual = null;
    diaAtual = 1;
    eventosUtilizados = new Set();
    Object.values(statusJogo).forEach((status) => { status.valor = 50; });
    Object.keys(statusJogo).forEach((chave) => {
        document.querySelector(`[data-status="${chave}"]`).textContent = "50";
    });
    Object.values(acontecimentos).forEach((evento) => {
        delete evento.decisaoConfirmada;
        delete evento.escolhaRealizada;
    });
    document.getElementById("tela-game-over").classList.remove("visivel");
    document.getElementById("tela-game-over").setAttribute("aria-hidden", "true");
    document.getElementById("painel-status").classList.add("visivel");
    document.body.classList.add("modo-jogo");
    mostrarPrevisao();
    mostrarAcontecimento(acontecimentoInicial);
}

document.getElementById("botao-tentar-novamente").addEventListener("click", reiniciarPartida);

document.getElementById("opcao-esquerda").addEventListener("click", () => selecionarOpcao("esquerda"));
document.getElementById("opcao-direita").addEventListener("click", () => selecionarOpcao("direita"));

function atualizarPrevisaoDaOpcao(lado) {
    const evento = acontecimentos[acontecimentoAtual];
    if (evento && !evento.decisaoConfirmada) {
        mostrarPrevisao(evento[lado].consequencias);
    }
}

function limparPrevisaoSeSaiu(evento) {
    if (evento.relatedTarget?.closest?.(".popup-opcao")) return;
    const focoAtual = document.activeElement;
    if (focoAtual?.matches?.(".popup-opcao") && !focoAtual.disabled) {
        atualizarPrevisaoDaOpcao(focoAtual.id === "opcao-esquerda" ? "esquerda" : "direita");
        return;
    }
    mostrarPrevisao();
}

["esquerda", "direita"].forEach((lado) => {
    const botao = document.getElementById(`opcao-${lado}`);
    botao.addEventListener("mouseenter", () => atualizarPrevisaoDaOpcao(lado));
    botao.addEventListener("mouseleave", limparPrevisaoSeSaiu);
    botao.addEventListener("focus", () => atualizarPrevisaoDaOpcao(lado));
    botao.addEventListener("blur", limparPrevisaoSeSaiu);
});


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
