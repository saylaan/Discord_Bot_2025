const { getFeedbackChannelPermissions } = require("../utils/permissions");
const { generateFeedbackMessage } = require("../messages/feedback-message");

module.exports = async function handleFeedbackCommand(message, client) {
  const guild = message.guild;

  const replySafe = async (content) => {
    try {
      await message.channel.send(content);
    } catch (err) {
      console.error("❌ Impossible d'envoyer un message dans le channel :", err);
    }
  };

  try {
    const mention = message.mentions.members.first();
    if (!mention) return replySafe("❌ Tu dois mentionner un utilisateur.");

    await message.delete().catch(() => {}); // Message supprimé silencieusement

    const displayName = mention.displayName || mention.user.username;
    const safeDisplayName = displayName
      .replace(/\s+/g, "-")
      .replace(/[#/]/g, "")
      .toLowerCase();

    const channelName = `📋・feedback-${safeDisplayName}`;

    const category = guild.channels.cache.find(
      (c) => c.name === process.env.CATEGORY_NAME && c.type === 4,
    );
    if (!category) return replySafe("❌ Catégorie non trouvée.");

    const staffRole = guild.roles.cache.find(
      (r) => r.name === process.env.STAFF_ROLE_NAME,
    );
    if (!staffRole) return replySafe("❌ Rôle STAFF non trouvé.");

    const existing = guild.channels.cache.find((c) => c.name === channelName);
    if (existing) return replySafe("⚠️ Ce salon existe déjà.");

    const feedbackChannel = await guild.channels.create({
      name: channelName,
      type: 0,
      parent: category.id,
      permissionOverwrites: getFeedbackChannelPermissions(
        guild,
        mention,
        staffRole,
        client.user,
      ),
    });

    await feedbackChannel.send({
      content: generateFeedbackMessage(mention.toString(), staffRole),
    });
  } catch (err) {
    console.error("❌ Erreur lors de la création du salon :", err);
    await message.channel.send(
      "❌ Une erreur est survenue lors de la création du salon. Vérifie les permissions du bot.",
    ).catch(() => {});
  }
};
