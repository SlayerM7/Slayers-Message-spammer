const { Client } = require('discord.js')
const client = new Client();
const { token, id, prefix, spam_message } = require('./config.json')

const {
    magenta,
    magentaBright,
    white,
    red,
    green
} = require('chalk')

client.on('ready',  () => {

    console.log('Ready sir')

    client.on('message', async(message) => {

        if (message.author.id !== id) return;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLocaleLowerCase();

        if (command === 'spam') {
            let count = 0;
            const amount = args[0];
            if (!amount) {
                message.channel.send('`Enter a message amount`')
                return
            }
            if (isNaN(amount)) {
                message.channel.send('`The amount must be a number`');
                return;
            };
            while(count < amount) {
                count++
                message.channel.send(spam_message).then(() => {
              
                    console.log(red('[2021] ') + white(`Sent ${count} messages to -> `) + green(message.channel.name))
                })
            };
        };

    });

});

client.login(token).catch(() => {
    console.log(' Incorrect token');
});