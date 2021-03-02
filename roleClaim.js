const firstMessage = require("./firstMessage")
const Discord = require("discord.js");

module.exports = (client) => {
  const channelId = '812354418535956570'
  const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

  const emojis = {
    uepedrOk: 'CapiMember',
  }

  const reactions = []
  const loveEmoji = getEmoji('uepedrPixLove')
  let description = `Salveeee!! Esse aqui é o CAPIVERSO, atenção às nossas REGRAS:\n\n- Respeito acima de tudo.\n- Se você é sub linke sua conta da twitch no discord para acessar os canais exclusivos.\n- Acesse o canal <#813892036327112704> para ver os canais que te interessam.\n- Usuários com discursos de ódio levarão BAN.\n- Usuários preconceituosos levarão BAN.\n- Usuários enviando conteúdo adulto levarão BAN.\n- ~~Usuários que reclamarem das músicas levarão BAN~~ kkkjota\n- Atenção aos canais, evite sair do tópico de cada um deles.\n- Vamos manter o carinho do chat aqui também ${loveEmoji}\n\n\`\`\`Por favor, reaja com ok se concorda para acessar os demais conteúdos e virar um CapiMember!\`\`\`\n`

  const emojiText = new Discord.MessageEmbed()
    .setColor('#f56420')
    .setTitle('MANDAMENTOS DO CAPIVERSO')
    .setAuthor('Pedroso', 'https://static-cdn.jtvnw.net/jtv_user_pictures/e6d96535-5b56-472b-b3d0-5d3faf8a4fe5-profile_image-70x70.png', 'https://twitch.tv/uepedroso')
    .setDescription(description)
    .setThumbnail('https://i.imgur.com/i6VYnNf.png')
    .addFields(
      { name: 'Redes sociais', value: '[Twitter](https://twitter.com/uepedroso)\t\t[Instagram](https://www.instagram.com/uepedroso/)\t\t[Youtube](https://www.youtube.com/channel/UCn17rPRP06h_8lBgz9O9EbA)\t\t[Twitch](https://twitch.tv/uepedroso)\n', inline: false },
      { name: 'Informações da live', value: 'A imagem abaixo tem tudo o que você precisa saber.', inline: false },
    )
    .setImage('https://i.imgur.com/2SXxR5v.png')
    .setTimestamp()
    .setFooter('- Busquem conhecimento, BILU, ET.', 'https://i.imgur.com/vhxERHH.jpg');

  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)
    const role = emojis[key]
    // emojiText += `${emoji} = ${role}\n`
  }

  firstMessage(client, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if(user.id === '805463188590166026')
      return
    
    const emoji = reaction._emoji.name
    const { guild } = reaction.message
    const roleName = emojis[emoji]

    if(!roleName)
      return

    const role = guild.roles.cache.find(role => role.name === roleName)
    const member = guild.members.cache.find(member => member.id === user.id)

    if(add)
      member.roles.add(role)
    else
      member.roles.remove(role)
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.message.channel.id === channelId)
      handleReaction(reaction, user, true)
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if(reaction.message.channel.id === channelId)  
    handleReaction(reaction, user, false)
  })
}