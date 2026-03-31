const btnHome = document.getElementById("btn-home");
const btnCarrinho = document.getElementById("btn-carrinho");
const btnMensagem = document.getElementById("btn-mensagem");

const paginaHome = document.getElementById("pagina-home");
const paginaCarrinho = document.getElementById("pagina-carrinho");
const paginaMensagens = document.getElementById("pagina-mensagens");

function limparAtivos() {
    document.querySelectorAll(".pagina").forEach((pagina) => {
        pagina.classList.remove("ativa");
    });

    document.querySelectorAll(".menu-btn").forEach((botao) => {
        botao.classList.remove("ativo");
    });
}

btnHome.addEventListener("click", () => {
    limparAtivos();
    btnHome.classList.add("ativo");
    paginaHome.classList.add("ativa");
});

btnCarrinho.addEventListener("click", () => {
    limparAtivos();
    btnCarrinho.classList.add("ativo");
    paginaCarrinho.classList.add("ativa");
});

btnMensagem.addEventListener("click", () => {
    limparAtivos();
    btnMensagem.classList.add("ativo");
    paginaMensagens.classList.add("ativa");
});

const chatInput = document.getElementById("chat-input");
const btnEnviar = document.getElementById("btn-enviar");
const chatMensagens = document.getElementById("chat-mensagens");

const btnAtendimento = document.getElementById("btn-atendimento");
const btnIaNexa = document.getElementById("btn-ia-nexa");
const tituloChat = document.getElementById("titulo-chat");

let modoChat = "atendimento";

function selecionarConversa(botaoAtivo) {
    document.querySelectorAll(".conversa-item").forEach((item) => {
        item.classList.remove("ativa-chat");
    });

    botaoAtivo.classList.add("ativa-chat");
}

btnAtendimento.addEventListener("click", () => {
    modoChat = "atendimento";
    selecionarConversa(btnAtendimento);
    tituloChat.textContent = "Atendimento Nexa";

    chatMensagens.innerHTML = `
        <div class="mensagem recebida">
            <p>Olá! Seja bem-vindo à Nexa Store. Como podemos ajudar?</p>
        </div>
    `;
});

btnIaNexa.addEventListener("click", () => {
    modoChat = "ia";
    selecionarConversa(btnIaNexa);
    tituloChat.textContent = "IA Nexa";

    chatMensagens.innerHTML = `
        <div class="mensagem recebida">
            <p>Olá! Eu sou a IA Nexa. Posso responder dúvidas sobre produtos, preços e entrega.</p>
        </div>
    `;
});

function adicionarMensagem(texto, tipo) {
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem", tipo);

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    mensagem.appendChild(paragrafo);
    chatMensagens.appendChild(mensagem);

    chatMensagens.scrollTop = chatMensagens.scrollHeight;
}

function respostaAutomatica(textoUsuario) {
    const texto = textoUsuario.toLowerCase();

    if (modoChat === "ia") {
        if (texto.includes("oi") || texto.includes("olá") || texto.includes("ola")) {
            return "Olá! Eu sou a IA Nexa. Como posso te ajudar hoje?";
        }

        if (texto.includes("preço") || texto.includes("valor")) {
            return "Os preços estão exibidos nos cards dos produtos da loja.";
        }

        if (texto.includes("entrega")) {
            return "A entrega depende da sua localização e do tipo de envio disponível.";
        }

        if (texto.includes("produto")) {
            return "Temos body splash, esfoliantes, perfumes e outros produtos disponíveis.";
        }

        return "Entendi sua mensagem. Posso ajudar com dúvidas sobre produtos, preços e pedidos.";
    }

    return "Recebemos sua mensagem. Em breve nossa equipe vai responder você.";
}

btnEnviar.addEventListener("click", () => {
    const texto = chatInput.value.trim();

    if (texto === "") return;

    adicionarMensagem(texto, "enviada");
    chatInput.value = "";

    setTimeout(() => {
        adicionarMensagem(respostaAutomatica(texto), "recebida");
    }, 800);
});

chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnEnviar.click();
    }
});
