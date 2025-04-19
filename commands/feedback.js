const { getFeedbackChannelPermissions } = require("../utils/permissions");

module.exports = async function handleFeedbackCommand(message, client) {
  const mention = message.mentions.members.first();
  if (!mention) return message.reply("❌ Tu dois mentionner un utilisateur.");

  await message.delete().catch(() => {});

  const displayName = mention.displayName || mention.user.username;

  const safeDisplayName = displayName
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[#/]/g, "") // Remove problematic characters
    .toLowerCase(); // Optional: lowercase for consistency

  const channelName = `📋・feedback-${safeDisplayName}`;
  const guild = message.guild;

  const category = guild.channels.cache.find(
    (c) => c.name === process.env.CATEGORY_NAME && c.type === 4,
  );
  if (!category) return message.reply("❌ Catégorie non trouvée.");

  const staffRole = guild.roles.cache.find(
    (r) => r.name === process.env.STAFF_ROLE_NAME,
  );
  if (!staffRole) return message.reply("❌ Rôle STAFF non trouvé.");

  const existing = guild.channels.cache.find((c) => c.name === channelName);
  if (existing) return message.reply("⚠️ Ce salon existe déjà.");

  try {
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

    await feedbackChannel.send(`**📋 Feedback pour ${mention}**\n\n`);
  } catch (err) {
    console.error("Erreur lors de la création du salon :", err);
    message.reply(
      "❌ Erreur : le bot n'a pas la permission de créer le salon.",
    );
  }
};
