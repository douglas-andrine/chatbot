// Importando as dependências
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Criando a instância do cliente com LocalAuth (mantém a sessão automaticamente)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // Muda pra false se quiser ver o navegador abrindo
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

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

// Evento: Falha na autenticação
client.on('auth_failure', (msg) => {
    console.error('❌ Falha na autenticação: ', msg);
});

// Evento: Cliente desconectado
client.on('disconnected', (reason) => {
    console.warn('⚠️ Cliente desconectado: ', reason);
});

// Função de delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// Funil de mensagens
client.on('message', async msg => {
    const chat = await msg.getChat();
    const texto = msg.body.trim().toLowerCase();

    if (/(menu|dia|tarde|noite|oi|olá|ola)/i.test(texto) && msg.from.endsWith('@c.us')) {
        await delay(1000);
        await chat.sendStateTyping();
        await delay(1000);

        const contact = await msg.getContact();
        const name = contact.pushname || 'amigo';

        await client.sendMessage(msg.from, 
            `Olá! ${name.split(" ")[0]} sou o Antônio🤓, assistente virtual da Coffee Tecnologia. Como posso te ajudar hoje? Escolha uma das opções abaixo para continuarmos:\n\n` +
            `1 - Entender como funciona\n` +
            `2 - Ver planos e preços💰\n` +
            `3 - Saber como a Coffee ajuda☕\n` +
            `4 - Contratar ou ativar serviços🛠️\n` +
            `5 - Outras perguntas❓`
        );
    } else if (texto === '1' && msg.from.endsWith('@c.us')) {
        await delay(1000);
        await chat.sendStateTyping();
        await delay(1000);
        await client.sendMessage(msg.from, '🛠️ Nossas soluções oferecem suporte técnico 24 horas por dia, 7 dias por semana...');
        await client.sendMessage(msg.from, 'COMO FUNCIONA?\nÉ muito simples...\nLink para cadastro: https://coffeetecnologia.com.br/');
    } else if (texto === '2' && msg.from.endsWith('@c.us')) {
        await delay(1000);
        await chat.sendStateTyping();
        await delay(1000);
        await client.sendMessage(msg.from, '📌 Aqui na Coffee, não trabalhamos com valores fixos...');
        await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
    } else if (texto === '3' && msg.from.endsWith('@c.us')) {
        await delay(1000);
        await chat.sendStateTyping();
        await delay(1000);
        await client.sendMessage(msg.from, '💻 Na CoffeeTecnologia, nosso foco é simplificar o dia a dia do seu negócio...');
        await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
    } else if (texto === '4' && msg.from.endsWith('@c.us')) {
        await delay(1000);
        await chat.sendStateTyping();
        await delay(1000);
        await client.sendMessage(msg.from, '🌐 Você pode aderir aos nossos planos diretamente pelo nosso site...');
        await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
    } else if (texto === '5' && msg.from.endsWith('@c.us')) {
        await delay(1000);
        await chat.sendStateTyping();
        await delay(1000);
        await client.sendMessage(msg.from, '❓ Se você tiver outras dúvidas ou precisar de mais informações...');
    } else if (msg.from.endsWith('@c.us')) {
        await delay(1000);
        await chat.sendStateTyping();
        await delay(1000);
        await client.sendMessage(msg.from, '🚫 Essa opção não consta no nosso menu. Por favor, escolha uma das opções do menu ou aguarde que, em breve, um de nossos atendentes irá entrar em contato. ☕');
    }
});

// Inicializando o cliente
client.initialize();
