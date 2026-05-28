# VyomXpress Backend

Production-grade backend built with Node.js, Express.js, MySQL, Sequelize ORM, JWT Authentication, and Discord Bot.

---

## Tech Stack

- **Node.js** + **Express.js** — REST API server
- **MySQL** + **Sequelize ORM** — Database
- **JWT** + **bcrypt** — Authentication & security
- **Discord.js** — Discord Bot with slash commands
- **Swagger UI** — API documentation
- **Helmet, CORS, Rate Limiting** — Security middleware

---

## Project Structure

```
vyomxpress-backend/
├── src/
│   ├── config/
│   │   ├── database.js          # Sequelize MySQL connection
│   │   └── swagger.js           # Swagger/OpenAPI config
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   └── service.controller.js
│   ├── discord/
│   │   ├── bot.js               # Discord bot client
│   │   ├── register-commands.js # Run once to register slash commands
│   │   └── commands/
│   │       ├── ppcreateuser.js
│   │       ├── ppcreateservice.js
│   │       └── ppgetuser.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   ├── models/
│   │   ├── index.js
│   │   ├── user.model.js
│   │   └── service.model.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── service.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   └── service.service.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── response.js
│   └── app.js
├── server.js
├── .env.example
├── package.json
└── README.md
```

---

## Environment Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/vyomxpress-backend.git
cd vyomxpress-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Now open `.env` and fill in your values:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=vyomxpress_db
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

DISCORD_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_app_client_id
DISCORD_GUILD_ID=your_discord_server_id
```

### 4. Create MySQL Database

```sql
CREATE DATABASE vyomxpress_db;
```

### 5. Register Discord Slash Commands (run once)

```bash
npm run register-commands
```

### 6. Start the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup` | Register new user |
| POST | `/api/v1/auth/login` | Login & get JWT token |
| GET | `/api/v1/auth/me` | Get current user (protected) |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | Get all users (protected) |
| GET | `/api/v1/users/:id` | Get user by ID (protected) |
| GET | `/api/v1/users/username/:username` | Get user by username (protected) |
| PUT | `/api/v1/users/:id` | Update user (protected) |
| DELETE | `/api/v1/users/:id` | Deactivate user (protected) |

### Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/services` | Create service (protected) |
| GET | `/api/v1/services` | Get all services (protected) |
| GET | `/api/v1/services/:id` | Get service by ID (protected) |
| PUT | `/api/v1/services/:id` | Update service (protected) |
| DELETE | `/api/v1/services/:id` | Delete service (protected) |

---

## Swagger Documentation

Once server is running, open:

```
http://localhost:5000/api/v1/docs
```

---

## Discord Slash Commands

| Command | Description |
|---------|-------------|
| `/ppcreateuser` | Create a new user in the system |
| `/ppcreateservice` | Create a new service |
| `/ppgetuser` | Fetch user details by username |

### How to set up Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application** → give it a name
3. Go to **Bot** tab → click **Add Bot** → copy the **Token** → paste in `.env` as `DISCORD_TOKEN`
4. Go to **OAuth2** tab → copy **Client ID** → paste in `.env` as `DISCORD_CLIENT_ID`
5. Open your Discord server → right-click server name → **Copy Server ID** → paste as `DISCORD_GUILD_ID`
6. Invite bot to your server using OAuth2 URL with `bot` and `applications.commands` scopes
7. Run `npm run register-commands` once to register slash commands

---

## Health Check

```
GET /health
```

---

## Deployment

Deployed on Railway: `YOUR_DEPLOYMENT_URL_HERE`
