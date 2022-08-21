console.log('Loading...');

const Discord = require('discord.js');
const { token, quote_channel: channelId } = require('./config.json');
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    console.group(`${interaction.user.tag} executed /${interaction.commandName}.`);

    if(interaction.commandName === 'quote') {
        const randomQuote = await getRandomQuote();

        const quoteEmbed = new Discord.EmbedBuilder()
            .setTitle("Random Quote")
            .setDescription(randomQuote)
            .setColor("Fuchsia");

        interaction.reply({ embeds: [quoteEmbed] });
        console.log(randomQuote);
        console.groupEnd();
    }
});

async function getRandomQuote() {
    const channel = client.channels.cache.get(channelId);
    if (!channel.isTextBased()) return;

    const allQuotes = await channel.messages.fetch();
    const randomIndex = Math.random() * allQuotes.size;
    return allQuotes.at(randomIndex).content;
}

client.login(token);
