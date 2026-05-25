document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('ai-chat-toggle');
    const chatWidget = document.getElementById('ai-chat-widget');
    const chatClose = document.getElementById('ai-chat-close');
    const chatInput = document.getElementById('ai-chat-input');
    const chatSend = document.getElementById('ai-chat-send');
    const chatMessages = document.getElementById('ai-chat-messages');

    // Abrir/Fechar Chat
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('visible');
        if (chatWidget.classList.contains('visible')) {
            chatInput.focus();
        }
    });

    chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('visible');
    });

    // Função para adicionar mensagens com estilo
    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.style.marginBottom = '10px';
        msgDiv.style.padding = '8px';
        msgDiv.style.borderRadius = '5px';
        msgDiv.style.backgroundColor = sender === 'IA' ? '#003300' : '#111';
        msgDiv.style.border = sender === 'IA' ? '1px solid #39ff14' : '1px solid #555';
        
        msgDiv.innerHTML = `<strong style="color: #39ff14;">${sender}:</strong> <span style="color: #fff;">${text}</span>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Base de Conhecimento Expandida da IA
    const knowledgeBase = [
        {
            keys: ['plantio direto', 'solo', 'erosão', 'palhada'],
            response: "O Plantio Direto é uma técnica onde não revolvemos o solo. A palhada da colheita anterior protege a terra contra erosão e mantém a umidade, economizando água e preservando nutrientes."
        },
        {
            keys: ['drone', 'pulverização', 'vôo', 'mapeamento'],
            response: "Drones são usados para mapear a saúde da lavoura com câmeras especiais. Eles podem aplicar defensivos apenas onde há pragas, reduzindo o uso de químicos em até 90%."
        },
        {
            keys: ['ilpf', 'integração', 'gado', 'árvore', 'floresta'],
            response: "A Integração Lavoura-Pecuária-Floresta (ILPF) combina produção de grãos, carne e madeira na mesma área. Isso melhora o bem-estar animal e aumenta o sequestro de carbono."
        },
        {
            keys: ['água', 'irrigação', 'gotejamento', 'nascente', 'rio'],
            response: "Usamos sensores de solo e dados de satélite para irrigar com precisão. O gotejamento entrega água direto na raiz, evitando desperdício. Além disso, protegemos as APPs para garantir o fluxo dos rios."
        },
        {
            keys: ['abelha', 'polinização', 'inseto', 'biodiversidade'],
            response: "As abelhas são essenciais! Elas polinizam as flores e aumentam a produtividade. Por isso, mantemos áreas de mata nativa para que elas tenham refúgio e alimento o ano todo."
        },
        {
            keys: ['carbono', 'aquecimento', 'clima', 'emissão'],
            response: "O agro sustentável ajuda a combater o aquecimento global. Solos bem manejados e áreas de floresta dentro das fazendas sequestram toneladas de CO2 da atmosfera."
        },
        {
            keys: ['oi', 'olá', 'bom dia', 'boa tarde', 'ajuda'],
            response: "Olá! Sou o Assistente Agro. Posso falar sobre Plantio Direto, Drones, ILPF, Gestão de Água e Biodiversidade. O que você gostaria de saber?"
        }
    ];

    function getAIResponse(userText) {
        const input = userText.toLowerCase();
        
        // Busca na base de conhecimento
        for (const item of knowledgeBase) {
            if (item.keys.some(key => input.includes(key))) {
                return item.response;
            }
        }

        return "Essa é uma pergunta interessante! O agronegócio sustentável é vasto. Tente perguntar sobre 'tecnologia', 'solo', 'água' ou 'biodiversidade' para eu te dar detalhes técnicos.";
    }

    // Enviar Mensagem
    function handleSend() {
        const text = chatInput.value.trim();
        if (text) {
            addMessage('Você', text);
            chatInput.value = '';
            
            // Efeito de "IA digitando..."
            const typingDiv = document.createElement('div');
            typingDiv.innerHTML = '<em style="color: #39ff14; font-size: 0.8rem;">IA está analisando dados...</em>';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                chatMessages.removeChild(typingDiv);
                const response = getAIResponse(text);
                addMessage('IA', response);
            }, 800);
        }
    }

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});