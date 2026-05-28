/**
 * Run this script ONCE to register slash commands with Discord:
 *   node src/discord/register-commands.js
 */

require("dotenv").config();
const { REST, Routes } = require("@discordjs/rest");

const ppcreateuser    = require("./commands/ppcreateuser");
const ppcreateservice = require("./commands/ppcreateservice");
const ppgetuser       = require("./commands/ppgetuser");

const commands = [
  ppcreateuser.data.toJSON(),
  ppcreateservice.data.toJSON(),
  ppgetuser.data.toJSON(),
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("⏳ Registering slash commands with Discord...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands }
    );

    console.log("✅ Slash commands registered successfully!");
    console.log("   /ppcreateuser");
    console.log("   /ppcreateservice");
    console.log("   /ppgetuser");
  } catch (error) {
    console.error("❌ Failed to register commands:", error);
  }
})();
