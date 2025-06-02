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
        await client.sendMessage(msg.from, '🛠️Nossas soluções oferecem suporte técnico 24 horas por dia, 7 dias por semana...');
        await client.sendMessage(msg.from, 'COMO FUNCIONA?\nÉ muito simples...\nLink para cadastro: https://coffeetecnologia.com.br/');
    }

    if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '📌Aqui na Coffee, não trabalhamos com valores fixos...');
        await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
    }

    if (msg.body === '3' && msg.from.endsWith('@c.us')) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '💻Na CoffeeTecnologia, nosso foco é simplificar o dia a dia do seu negócio...');
        await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
    }

    if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🌐Você pode aderir aos nossos planos diretamente pelo nosso site...');
        await client.sendMessage(msg.from, 'Link para cadastro: https://coffeetecnologia.com.br/');
    }

    if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '❓Se você tiver outras dúvidas ou precisar de mais informações...');
    }

    // 🚨 Mensagem padrão para qualquer outra coisa
    if (!['1', '2', '3', '4', '5'].includes(msg.body) && msg.from.endsWith('@c.us')) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🚫 Essa opção não consta no nosso menu. Por favor, escolha uma das opções do menu ou aguarde que, em breve, um de nossos atendentes irá entrar em contato. ☕');
    }
});
