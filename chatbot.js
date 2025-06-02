const qrcode = require('qrcode-terminal');
const { Client, Buttons } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

async function responder(msg, texto, delayTempo = 3000) {
    const chat = await msg.getChat();
    await delay(delayTempo);
    await chat.sendStateTyping();
    await delay(delayTempo);
    await client.sendMessage(msg.from, texto);
}

function saudacaoDetectada(msg) {
    return /(menu|dia|tarde|noite|oi|olá|ola)/i.test(msg.body.toLowerCase());
}

async function enviarMenu(msg) {
    const contact = await msg.getContact();
    const nome = contact.pushname ? contact.pushname.split(" ")[0] : 'amigo(a)';

    const button = new Buttons(
        `Olá! ${nome}, sou o Antônio 🤓, assistente virtual da Coffee Tecnologia.\n\nComo posso te ajudar hoje? Escolha uma das opções abaixo:`,
        [
            { body: '1 - Entender como funciona' },
            { body: '2 - Ver planos e preços 💰' },
            { body: '3 - Saber como a Coffee ajuda ☕' },
            { body: '4 - Contratar ou ativar serviços 🛠️' },
            { body: '5 - Outras perguntas ❓' }
        ],
        'Menu Coffee Tecnologia',
        'Escolha uma opção:'
    );

    await delay(3000);
    const chat = await msg.getChat();
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, button);
}

client.on('message', async msg => {
    if (saudacaoDetectada(msg) && msg.from.endsWith('@c.us')) {
        await enviarMenu(msg);
    } else if (msg.body === '1' && msg.from.endsWith('@c.us')) {
        await responder(msg, '🛠️ Nossas soluções oferecem suporte técnico 24 horas por dia, 7 dias por semana, diretamente pelo WhatsApp.\n\n✅ Sem burocracia: você começa a usar o sistema assim que sua adesão for confirmada.\n\n🧾 Oferecemos soluções completas para o seu negócio, incluindo controle de vendas, gestão de estoque, emissão de relatórios e muito mais.\n\n🎓 Além disso, temos uma ampla gama de benefícios, incluindo treinamentos personalizados e uma equipe pronta pra te ajudar sempre que precisar. 🤝');
        await responder(msg, 'COMO FUNCIONA?\nÉ muito simples.\n\n1º Passo\n📞 Entre em contato com a CoffeeTecnologia.\n\n2º Passo\n📝 Cadastro da sua empresa ou negócio.\n\n3º Passo\n📋 Montamos um plano sob medida para você.\n\n4º Passo\n🖊️ Assinatura do contrato digital.\n\n5º Passo\n🔓 Ativação e envio dos dados de acesso.\n\n6º Passo\n🎓 Treinamento para sua equipe.');
        await responder(msg, 'Link para cadastro: https://coffeetecnologia.com.br/');
    } else if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        await responder(msg, '📌 Aqui na Coffee, não trabalhamos com valores fixos.\n\n📊 Cada plano é personalizado de acordo com as necessidades da sua empresa — levamos em conta o tamanho do seu negócio, os módulos que você precisa e o nível de suporte desejado.\n\n💡 Assim, garantimos que você só pague pelo que realmente vai usar.\n\n🤝 Quer que eu te ajude a montar uma proposta sob medida?\n💬 Fale com um de nossos especialistas.');
        await responder(msg, 'Link para cadastro: https://coffeetecnologia.com.br/');
    } else if (msg.body === '3' && msg.from.endsWith('@c.us')) {
        await responder(msg, '💻 Na CoffeeTecnologia, nosso foco é simplificar o dia a dia do seu negócio com soluções inteligentes, práticas e sob medida.\n\n🧩 Cada negócio é único, e por isso criamos planos personalizados para cada cliente.\n\n👂 A gente escuta sua necessidade, entende seu modelo de operação e entrega uma solução que se encaixa como uma luva. 🧤');
        await responder(msg, 'Link para cadastro: https://coffeetecnologia.com.br/');
    } else if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        await responder(msg, '🌐 Você pode aderir aos nossos planos diretamente pelo nosso site ou pelo WhatsApp.\n\n📞 Para contratar os serviços da CoffeeTecnologia é simples: você entra em contato com nosso time, fazemos o cadastro da sua empresa, montamos um plano personalizado de acordo com a sua necessidade e enviamos um contrato digital.\n\n🖊️ Após a assinatura, ativamos o sistema e enviamos os dados de acesso para você começar a usar.\n\n🎓 Se precisar, ainda oferecemos treinamento para sua equipe e 💬 suporte contínuo para garantir que tudo funcione da melhor forma possível.');
        await responder(msg, 'Link para cadastro: https://coffeetecnologia.com.br/');
    } else if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        await responder(msg, '❓ Se você tiver outras dúvidas ou precisar de mais informações, por favor, 💬 fale aqui nesse WhatsApp ou 🌐 visite nosso site: https://coffeetecnologia.com.br/');
    }
});
