const { SlashCommandBuilder } = require("discord.js");
const { Service, User } = require("../../models");

module.exports = {
  // ─── Command Definition ──────────────────────────────────
  data: new SlashCommandBuilder()
    .setName("ppcreateservice")
    .setDescription("Create a new service in VyomXpress system")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the service (2-100 chars)")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("price")
        .setDescription("Price of the service (e.g. 99.99)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("Username of the user who owns this service")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description of the service")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Category of the service")
        .setRequired(false)
    ),

  // ─── Command Execution ───────────────────────────────────
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const name        = interaction.options.getString("name");
    const price       = interaction.options.getNumber("price");
    const username    = interaction.options.getString("username");
    const description = interaction.options.getString("description") || null;
    const category    = interaction.options.getString("category") || null;

    try {
      // ── Validate name length ──
      if (name.length < 2 || name.length > 100) {
        return interaction.editReply({ content: "❌ Service name must be between 2 and 100 characters." });
      }

      // ── Validate price ──
      if (price < 0) {
        return interaction.editReply({ content: "❌ Price cannot be negative." });
      }

      // ── Find user by username ──
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return interaction.editReply({ content: `❌ User **${username}** not found in the system.` });
      }

      // ── Create service ──
      const service = await Service.create({
        name,
        description,
        price,
        category,
        is_active: true,
        user_id: user.id,
      });

      return interaction.editReply({
        content:
          `✅ **Service Created Successfully!**\n\n` +
          `🛠️ **Service Name:** ${service.name}\n` +
          `💰 **Price:** ₹${Number(service.price).toFixed(2)}\n` +
          `📁 **Category:** ${service.category || "N/A"}\n` +
          `📝 **Description:** ${service.description || "N/A"}\n` +
          `👤 **Owner:** ${user.username}\n` +
          `🆔 **Service ID:** ${service.id}\n` +
          `📅 **Created At:** ${new Date(service.createdAt).toLocaleString()}`,
      });
    } catch (error) {
      console.error("ppcreateservice error:", error);
      return interaction.editReply({ content: "❌ Failed to create service. Please try again." });
    }
  },
};
