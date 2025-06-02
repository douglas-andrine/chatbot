// Importando as dependências
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Criando a instância do cliente com LocalAuth (mantém a sessão automaticamente)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // Mude pra false se quiser ver o navegador abrindo
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

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname;

        await client.sendMessage(msg.from, `Olá! ${name.split(" ")[0]} sou o Antônio🤓, assistente virtual da Coffee Tecnologia. Como posso te ajudar hoje? Escolha uma das opções abaixo para continuarmos:\n\n1 - Entender como funciona\n2 - Ver planos e preços💰\n3 - Saber como a Coffee ajuda☕\n4 - Contratar ou ativar serviços🛠️\n5 - Outras perguntas❓`);
    }

    if (msg.body === '1' && msg.from.endsWith('@c.us')) {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, `🛠️ Nossas soluções oferecem suporte técnico 24 horas por dia, 7 dias por semana. Garantimos que sua empresa funcione da melhor forma possível.`);

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, `COMO FUNCIONA?
É muito simples.

1º Passo
📞 Entre em contato com a CoffeeTecnologia.

2º Passo
📝 Cadastro da sua empresa ou negócio.

3º Passo
📋 Montamos um plano sob medida para você.

4º Passo
🖊️ Assinatura do contrato digital.

5º Passo
🔓 Ativação e envio dos dados de acesso.

6º Passo
🎓 Treinamento para sua equipe.`);

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
}


   if (msg.body === '2' && msg.from.endsWith('@c.us')) {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, `📌 Aqui na Coffee, não trabalhamos com valores fixos. Cada solução é personalizada conforme a necessidade do seu negócio.

Fazemos questão de entender sua demanda, desenhar o melhor plano e entregar o que realmente vai agregar valor para sua empresa.

Entre em contato conosco para receber sua proposta personalizada!`);

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
}


    if (msg.body === '3' && msg.from.endsWith('@c.us')) {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, `💻 Na CoffeeTecnologia, nosso foco é simplificar o dia a dia do seu negócio com soluções de automação, controle e gestão.

Oferecemos sistemas personalizados, atendimento humanizado e tecnologia de ponta para que você tenha tranquilidade e eficiência.

Conte conosco para levar inovação à sua empresa!`);

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
}

if (msg.body === '4' && msg.from.endsWith('@c.us')) {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, `🌐 Você pode aderir aos nossos planos diretamente pelo nosso site ou falar com um dos nossos consultores para um atendimento personalizado.

Nossa equipe está pronta para te ajudar a escolher a melhor solução para o seu negócio.`);

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
}


    if (msg.body === '5' && msg.from.endsWith('@c.us')) {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, `❓ Se você tiver outras dúvidas ou precisar de mais informações, nossa equipe está à disposição.

Entre em contato conosco e será um prazer te ajudar!`);
}


    // Mensagem padrão para opções inválidas
    if (!['1', '2', '3', '4', '5'].includes(msg.body) && msg.from.endsWith('@c.us')) {
        await delay(10000);
        await chat.sendStateTyping();
        await delay(10000);
        await client.sendMessage(msg.from, '🚫 Essa opção não consta no nosso menu. Por favor, escolha uma das opções do menu ou aguarde que, em breve, um de nossos atendentes irá entrar em contato. ☕');
    }
});

// Inicializando o cliente
client.initialize();
