const Discord = require("discord.js");
const config = require("./config.json");
const roleClaim = require("./roleClaim");
const roleClaimTest = require("./roleClaimTest")


const client = new Discord.Client();

const prefix = "!";
const motivações = ['Você é mais fraco(a) do que pensa','Nada é tão horrível que não possa piorar muito!','Se alguém te ofendeu sem você merecer, volte lá e mereça!','Lute como nunca, perca como sempre.','O não você já tem, vá em busca da humilhação','Nunca é tarde demais para desistir', 'Não sabendo que era impossível, foi lá e soube', 'Vai dar tudo certo, menos pra você', 'Só dará errado se você tentar!','O caminho é longo, mas a derrota é certa', 'Acreditar que você pode, já é meio caminho errado']

const newUsers = new Discord.Collection();

client.on('ready', () => {
  roleClaim(client)
  roleClaimTest(client)
})

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  switch(command) {
    case 'ping':
      const timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Pong! Demorou ${timeTaken}ms pra vc me encher o saco.`);
      break;
    case 'bodia':
      message.reply(`bom diaaaaaaaaaaaaaaa 💜`);
      break;
    case 'memotiva':
      let motivação = motivações[Math.floor(Math.random() * motivações.length)];
      message.reply(motivação);
      break;
  }
});

client.on("guildMemberAdd", (member) => {
  newUsers.set(member.id, member.user);
  const channel = client.channels.cache.find(channel => channel.name === '🥂︱salve');
  const rulesChannel = '<#812354418535956570>'
  const messageToBeSent = `Salveeeee ${member}! Por favor, olhe as regras do server ${rulesChannel} para acessar os demais conteúdos!`;
  channel.send(messageToBeSent);
});

client.on("guildMemberRemove", (member) => {
  if(newUsers.has(member.id)) newUsers.delete(member.id);
});

client.login(config.BOT_TOKEN);