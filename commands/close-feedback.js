module.exports = async function handleCloseFeedbackCommand(message) {
  const currentChannel = message.channel;

  await message.delete().catch(console.error); // Make sure this is here

  const staffRole = message.guild.roles.cache.find(
    (r) => r.name === process.env.STAFF_ROLE_NAME,
  );
  if (!staffRole || !message.member.roles.cache.has(staffRole.id)) {
    return message.reply("❌ Tu n'as pas la permission de fermer ce salon.");
  }

  if (!currentChannel.name.startsWith("📋・feedback-")) {
    return message.reply(
      "❌ Cette commande ne peut être utilisée que dans un salon de feedback.",
    );
  }

  try {
    await message.reply("🗑️ Ce salon sera supprimé dans 5 secondes...");
    setTimeout(() => {
      currentChannel.delete().catch(console.error);
    }, 5000);
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    message.reply(
      "❌ Une erreur est survenue lors de la suppression du salon.",
    );
  }
};
