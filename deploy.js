const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const Discord = require('discord.js');
const { token, guild: guildId, client: clientId } = require('./config.json');
const fs = require('fs');

const commands = [
    new Discord.SlashCommandBuilder()
        .setName("quote")
        .setDescription("Send a random Quote!")
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();