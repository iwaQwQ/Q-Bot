import { Client, Message, TextChannel, MessageEmbed } from 'discord.js';
import utilities from '../utils/utilities';
import { Db } from 'mongodb';

module.exports.run = async (bot: Client, msg: Message, args: string[], db: Db) => {
    if (!utilities.isMod(msg) && msg.author.id != process.env.IWA && msg.author.id != process.env.QUMU) return;

    let message = await db.collection('suggestions').findOne({ _id: parseInt(args[0]) });
    if(!message)
        return msg.react('❌');

    let channel = await bot.channels.fetch(process.env.SUGGESTIONTC);
    let suggestion = await (channel as TextChannel).messages.fetch(message.msg)

    let embed = suggestion.embeds[0];

    embed.setTitle("Denied")
    embed.setColor(14956363)

    if(args.length >= 2) {
        args.shift()
        let req = args.join(' ');
        embed.addField(`Reason, by ${msg.author.username}`, req)
    }

    let reactions = suggestion.reactions.resolve('👀');
    let users = await reactions.users.fetch();

    let embedDM = new MessageEmbed();
    embedDM.setTitle(`Suggestion "${embed.description.slice(0, 10)}..." has been updated!`);
    embedDM.setDescription(`Check it out [here](${suggestion.url})`)

    for(const user of users.array()) {
        if(!user.bot)
            await user.send(embedDM).catch(() => {return});
    }

    await suggestion.edit(embed);
    return msg.react('✅');
};

module.exports.help = {
    name: 'deny',
    usage: "?deny (uid) [reason]",
};