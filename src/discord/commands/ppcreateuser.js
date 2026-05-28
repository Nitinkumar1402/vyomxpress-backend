const { SlashCommandBuilder } = require("discord.js");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");

module.exports = {
  // ─── Command Definition ──────────────────────────────────
  data: new SlashCommandBuilder()
    .setName("ppcreateuser")
    .setDescription("Create a new user in VyomXpress system")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("Username for the new user (3-50 chars, letters/numbers/_)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("email")
        .setDescription("Email address of the new user")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("password")
        .setDescription("Password for the new user (min 6 characters)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("role")
        .setDescription("Role of the user (default: user)")
        .setRequired(false)
        .addChoices(
          { name: "User", value: "user" },
          { name: "Admin", value: "admin" }
        )
    ),

  // ─── Command Execution ───────────────────────────────────
  async execute(interaction) {
    // Defer reply (gives us more time to process)
    await interaction.deferReply({ ephemeral: true });

    const username = interaction.options.getString("username");
    const email    = interaction.options.getString("email");
    const password = interaction.options.getString("password");
    const role     = interaction.options.getString("role") || "user";

    try {
      // ── Validate username format ──
      const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
      if (!usernameRegex.test(username)) {
        return interaction.editReply({
          content: "❌ Invalid username. Use only letters, numbers, underscores (3-50 chars).",
        });
      }

      // ── Validate email format ──
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return interaction.editReply({ content: "❌ Invalid email format." });
      }

      // ── Validate password length ──
      if (password.length < 6) {
        return interaction.editReply({ content: "❌ Password must be at least 6 characters." });
      }

      // ── Check duplicate username ──
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return interaction.editReply({ content: `❌ Username **${username}** is already taken.` });
      }

      // ── Check duplicate email ──
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return interaction.editReply({ content: `❌ Email **${email}** is already registered.` });
      }

      // ── Hash password & create user ──
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
        discord_user_id: interaction.user.id,
      });

      return interaction.editReply({
        content:
          `✅ **User Created Successfully!**\n\n` +
          `👤 **Username:** ${user.username}\n` +
          `📧 **Email:** ${user.email}\n` +
          `🔰 **Role:** ${user.role}\n` +
          `🆔 **User ID:** ${user.id}\n` +
          `📅 **Created At:** ${new Date(user.createdAt).toLocaleString()}`,
      });
    } catch (error) {
      console.error("ppcreateuser error:", error);
      return interaction.editReply({ content: "❌ Failed to create user. Please try again." });
    }
  },
};
