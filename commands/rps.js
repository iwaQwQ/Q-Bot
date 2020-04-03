const Discord = require('discord.js')
const utils = require('../js/utilities')

module.exports.run = (bot, msg, args) => {
    if(args.length < 1)return;
        var req = args[0].toLowerCase(), numReq, res;

        switch(req) {
            case "rock":
                numReq = 1;
            break;

            case "paper":
                numReq = 2;
            break;

            case "scissors":
            case "scissor":
                numReq = 3;
            break;

            default:
                return msg.channel.send({"embed": { "title": ":x: > **You need to pick between rock, paper and scissors !**" }})
        }

        var n = utils.randomInt(3);

        if(n == 1 && numReq == 1 || n == 2 && numReq == 2 || n == 3 && numReq == 3)
            res = "**Draw!**";
        if(n == 1 && numReq == 2 || n == 2 && numReq == 3 || n == 3 && numReq == 1)
            res = "**You won!**";
        if(n == 1 && numReq == 3 || n == 2 && numReq == 1 || n == 3 && numReq == 2)
            res = "**I won!**";

        const embed = new Discord.MessageEmbed();

        if(n == 1)
            embed.setTitle(":punch: **I play rock!**");
        if(n == 2)
            embed.setTitle(":hand_splayed: **I play paper!**");
        if(n == 3)
            embed.setTitle(":v: **I play scissors!**");

        embed.setDescription(res);

        console.log(`info: rps by ${msg.author.tag}`)
        return msg.channel.send(embed).catch(console.error)
};

module.exports.help = {
    name: 'rps',
    usage: "?rps (rock | paper | scissors)",
    desc: "Play Rock-Paper-Scissors with me"
};