const { SlashCommandBuilder } = require("discord.js");
const { User, Service } = require("../../models");

module.exports = {
  // ─── Command Definition ──────────────────────────────────
  data: new SlashCommandBuilder()
    .setName("ppgetuser")
    .setDescription("Fetch a user's details from VyomXpress system")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("Username to look up")
        .setRequired(true)
    ),

  // ─── Command Execution ───────────────────────────────────
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const username = interaction.options.getString("username");

    try {
      // ── Find user with their services ──
      const user = await User.findOne({
        where: { username },
        include: [
          {
            model: Service,
            as: "services",
            where: { is_active: true },
            required: false,
          },
        ],
      });

      if (!user) {
        return interaction.editReply({
          content: `❌ No user found with username **${username}**.`,
        });
      }

      // ── Build services list ──
      const servicesList =
        user.services && user.services.length > 0
          ? user.services
              .map((s, i) => `  ${i + 1}. **${s.name}** — ₹${Number(s.price).toFixed(2)}`)
              .join("\n")
          : "  No services found.";

      return interaction.editReply({
        content:
          `✅ **User Found!**\n\n` +
          `👤 **Username:** ${user.username}\n` +
          `📧 **Email:** ${user.email}\n` +
          `🔰 **Role:** ${user.role}\n` +
          `🆔 **User ID:** ${user.id}\n` +
          `✅ **Active:** ${user.is_active ? "Yes" : "No"}\n` +
          `📅 **Joined:** ${new Date(user.createdAt).toLocaleString()}\n\n` +
          `🛠️ **Services (${user.services?.length || 0}):**\n${servicesList}`,
      });
    } catch (error) {
      console.error("ppgetuser error:", error);
      return interaction.editReply({ content: "❌ Failed to fetch user. Please try again." });
    }
  },
};
