const { Client, GatewayIntentBits, Collection } = require("discord.js");
const logger = require("../utils/logger");

// ─── Import Commands ───────────────────────────────────────
const ppcreateuser    = require("./commands/ppcreateuser");
const ppcreateservice = require("./commands/ppcreateservice");
const ppgetuser       = require("./commands/ppgetuser");

const startDiscordBot = () => {
  // ─── Create Client ──────────────────────────────────────
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  // ─── Register Commands in Collection ───────────────────
  client.commands = new Collection();
  client.commands.set(ppcreateuser.data.name,    ppcreateuser);
  client.commands.set(ppcreateservice.data.name, ppcreateservice);
  client.commands.set(ppgetuser.data.name,       ppgetuser);

  // ─── Bot Ready Event ────────────────────────────────────
  client.once("ready", () => {
    logger.info(`✅ Discord Bot logged in as: ${client.user.tag}`);
  });

  // ─── Slash Command Interaction Handler ─────────────────
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      logger.warn(`⚠️ Unknown command: ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error(`❌ Discord command error (${interaction.commandName}):`, error);
      const errorMsg = { content: "❌ Something went wrong while executing this command.", ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMsg);
      } else {
        await interaction.reply(errorMsg);
      }
    }
  });

  // ─── Login Bot ──────────────────────────────────────────
  client.login(process.env.DISCORD_TOKEN).catch((err) => {
    logger.error("❌ Discord bot login failed:", err.message);
  });
};

module.exports = { startDiscordBot };
