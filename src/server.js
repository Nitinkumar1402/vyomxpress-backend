require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");
const logger = require("./utils/logger");
const { startDiscordBot } = require("./discord/bot");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    logger.info("✅ Database connection established.");

    // Sync models (use { alter: true } for dev)
    await sequelize.sync({ alter: true });
    logger.info("✅ Database models synced.");

    // Start Discord Bot
    startDiscordBot();

    // Start HTTP server
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
      logger.info(`📄 Swagger Docs: http://localhost:${PORT}/api/v1/docs`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();