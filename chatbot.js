// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); 
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on('message', async msg => {

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá! '+ name.split(" ")[0] + ' sou o Antônio, assistente virtual da Coffee Tecnologia. Como posso te ajudar hoje? Escolha uma das opções abaixo para continuarmos:\n\n1 - Entender como funciona\n2 - Ver planos e preços\n3 - Saber como a Coffee ajuda \n4 - Contratar ou ativar serviços\n5 - Outras perguntas'); //Primeira mensagem de texto
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(5000); //Delay de 5 segundos
    
        
    }




    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Nossas soluções oferecem suporte técnico 24 horas por dia, 7 dias por semana, diretamente pelo WhatsApp.\n\nSem burocracia: você começa a usar o sistema assim que sua adesão for confirmada.\n\nOferecemos soluções completas para o seu negócio, incluindo controle de vendas, gestão de estoque, emissão de relatórios e muito mais\n\nAlém disso, temos uma ampla gama de benefícios, incluindo treinamentos personalizados e uma equipe pronta pra te ajudar sempre que precisar.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'COMO FUNCIONA?\nÉ muito simples.\n\n1º Passo\nEntre em contato com a CoffeeTecnologia.\n\n2º Passo\nCadastro da sua empresa ou negócio.\n\n3º Passo\nMontamos um plano sob medida para você.\n\n4º Passo\nAssinatura do contrato digital.\n\n5º Passo\nAtivação e envio dos dados de acesso.\n\n6º Passo\nTreinamento para sua equipe.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');


    }

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Aqui na Coffee, não trabalhamos com valores fixos.\n\nCada plano é personalizado de acordo com as necessidades da sua empresa — levamos em conta o tamanho do seu negócio, os módulos que você precisa e o nível de suporte desejado.\n\nAssim, garantimos que você só pague pelo que realmente vai usar.\n\nQuer que eu te ajude a montar uma proposta sob medida?\nFale com um de nossos especialistas.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Na CoffeeTecnologia, nosso foco é simplificar o dia a dia do seu negócio com soluções inteligentes, práticas e sob medida.\n\nCada negócio é único, e por isso criamos planos personalizados para cada cliente.\n\nA gente escuta sua necessidade, entende seu modelo de operação e entrega uma solução que se encaixa como uma luva.');
        
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');

    }

    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Você pode aderir aos nossos planos diretamente pelo nosso site ou pelo WhatsApp.\n\nPara contratar os serviços da CoffeeTecnologia é simples:\nvocê entra em contato com nosso time, fazemos o cadastro da sua empresa, montamos um plano personalizado de acordo com a sua necessidade e enviamos um contrato digital.\nApós a assinatura, ativamos o sistema e enviamos os dados de acesso para você começar a usar. Se precisar, ainda oferecemos treinamento para sua equipe e suporte contínuo para garantir que tudo funcione da melhor forma possível.');


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');


    }

    if (msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Se você tiver outras dúvidas ou precisar de mais informações, por favor, fale aqui nesse whatsapp ou visite nosso site: https://coffeetecnologia.com.br/');


    }








});