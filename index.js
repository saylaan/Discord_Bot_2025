require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const handleFeedbackCommand = require("./commands/feedback");
const handleCloseFeedbackCommand = require("./commands/close-feedback");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const staffRole = message.guild.roles.cache.find(
    (r) => r.name === process.env.STAFF_ROLE_NAME,
  );
  if (!staffRole || !message.member.roles.cache.has(staffRole.id)) {
    return; // Only allow staff
  }

  if (message.content.startsWith("!feedback")) {
    await handleFeedbackCommand(message, client);
  }

  if (message.content.startsWith("!closefeedback")) {
    await handleCloseFeedbackCommand(message);
  }
});

client.login(process.env.DISCORD_TOKEN);
