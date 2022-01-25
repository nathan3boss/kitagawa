// Dependencies
import { readFileSync } from 'fs';
import { config } from 'dotenv';
import { Client, Intents, Message } from 'discord.js';

// Utils
import log from './src/utils/logger';

config();

const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

bot.on('ready', () => {
  log('success', `On in ${bot.user.tag}!`);
});

// Talks
bot.on('messageCreate', async (ctx: Message<boolean>) => {
  if (ctx.author.bot) {
    log('message', 'bot message received', { message: ctx.content });

    return;
  }

  const msgn = ctx.content.toLocaleLowerCase();

  const coretalks = readFileSync('./src/json/talks.json', {
    flag: 'r',
    encoding: 'utf8',
  });

  const talks = JSON.parse(coretalks).data;

  talks.map(({ talk, message, type }) => {
    if (type === 'command' && msgn.startsWith(talk)) {
      log('success', 'command answered', {
        message: ctx.content,
        command: talk,
      });

      ctx.reply(message);
    }

    if (type === 'message' && msgn.includes(talk)) {
      log('success', 'message sent', { message: ctx.content, command: talk });

      ctx.channel.send(message);
    }
  });
});

bot.login(process.env.TOKEN);
