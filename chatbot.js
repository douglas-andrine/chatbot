// Importando as dependências
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Criando a instância do cliente
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Controle de atendimento humano
const atendimentoHumano = {};

// Função de delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// Função para verificar se a mensagem é uma opção válida
const opcoesValidas = ['1', '2', '3', '4', '5'];

// Evento: Geração do QR Code
client.on('qr', (qr) => {
    console.log('⚡ Escaneie o QR Code abaixo para conectar:');
    qrcode.generate(qr, { small: true });
});

// Evento: Pronto
client.on('ready', () => {
    console.log('✅ Tudo certo! WhatsApp conectado.');
});

// Evento: Autenticação bem-sucedida
client.on('authenticated', () => {
    console.log('🔐 Autenticado com sucesso!');
});

// Evento: Cliente desconectado
client.on('disconnected', (reason) => {
    console.warn('⚠️ Cliente desconectado: ', reason);
});

// Funil de mensagens
client.on('message', async msg => {
    const chat = await msg.getChat();

    // Se for humano, não responde automático
    if (atendimentoHumano[msg.from]) {
        return;
    }

    const entrada = msg.body.toLowerCase();

    // Comando para transferir para atendente
    if (entrada.includes('falar com atendente')) {
        atendimentoHumano[msg.from] = true;
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🤝 Perfeito! Um de nossos atendentes irá falar com você em breve. ☕');
        return;
    }

    if (entrada.match(/(menu|dia|tarde|noite|oi|olá|ola)/i) && msg.from.endsWith('@c.us')) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname;

        await client.sendMessage(msg.from, `Olá! ${name.split(" ")[0]} sou o Antônio🤓, assistente virtual da Coffee Tecnologia.

Como posso te ajudar hoje? Escolha uma das opções abaixo para continuarmos:

1 - Entender como funciona
2 - Ver planos e preços💰
3 - Saber como a Coffee ajuda☕
4 - Contratar ou ativar serviços🛠️
5 - Outras perguntas❓`);
        return;
    }

    if (msg.body === '1') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `🛠️ COMO FUNCIONA?
É muito simples.

1º Passo
📞 Entre em contato com a CoffeeTecnologia.

2º Passo
📝 Cadastro da sua empresa ou negócio.

3º Passo
📋 Montamos um plano sob medida para você.

4º Passo
✍️ Assinatura do contrato digital.

5º Passo
🔓 Ativação e envio dos dados de acesso.

6º Passo
🎓 Treinamento para sua equipe.

Link para cadastro: https://coffeetecnologia.com.br/`);
        return;
    }

    if (msg.body === '2') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `📌Aqui na Coffee, não trabalhamos com valores fixos, pois cada cliente tem uma necessidade diferente.

Entre em contato e vamos montar o plano ideal para o seu negócio!

Link para cadastro: https://coffeetecnologia.com.br/`);
        return;
    }

    if (msg.body === '3') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `💻 Na CoffeeTecnologia, nosso foco é simplificar o dia a dia do seu negócio, com soluções sob medida e atendimento humanizado.

Link para cadastro: https://coffeetecnologia.com.br/`);
        return;
    }

    if (msg.body === '4') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `🌐 Você pode aderir aos nossos planos diretamente pelo nosso site ou falar com um consultor.

Link para cadastro: https://coffeetecnologia.com.br/`);
        return;
    }

    if (msg.body === '5') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `❓ Se você tiver outras dúvidas ou precisar de mais informações, é só nos chamar! Estamos sempre prontos para ajudar.`);
        return;
    }

    // Mensagem padrão para opções inválidas
    if (!opcoesValidas.includes(msg.body) && msg.from.endsWith('@c.us')) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `🚫 Essa opção não consta no nosso menu.

Por favor, escolha uma das opções enviadas anteriormente ou digite "falar com atendente" para ser atendido por um humano. ☕`);
    }
});

// Inicializando o cliente
client.initialize();
