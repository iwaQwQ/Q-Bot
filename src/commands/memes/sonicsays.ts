import { Client, Message } from 'discord.js'
import * as ejs from 'ejs'
import imGenerator from '../../js/img';

module.exports.run = async (bot:Client, msg:Message, args:string[]) => {
    if(msg.channel.id != '606165780215889960') return msg.channel.send({"embed": { "title": `:x: > **Command only usable in #memes**`, "color": 13632027}});
    if(args.length > 0) {
        msg.channel.startTyping();
        var parole = args;
        var x = parole.join(' ')

        let cdnUrl = process.env.CDN_URL;

        var html = await ejs.renderFile('views/sonicsays.ejs', { x, cdnUrl });
        var file = await imGenerator(385, 209, html, msg.author.tag, 'sonic')

        try {
            console.log(`info: sonicsays by ${msg.author.tag}`)
            return msg.channel.send('', {files: [file]})
                .then(() => { msg.channel.stopTyping(true) });
        } catch(err) {
            console.error(err)
        }
    }
};

module.exports.help = {
    name: 'sonicsays',
    usage: "?sonicsays (text)",
    desc: "Generate a Sonic Says meme"
};