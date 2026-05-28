# vyomxpress-backend

Backend REST API for VyomXpress built with Node.js, Express, MySQL and Discord bot integration.

---

## Tech Stack

- Node.js + Express.js
- MySQL + Sequelize ORM
- JWT + bcrypt for auth
- Discord.js for bot/slash commands
- Swagger for API docs
- Helmet, CORS, Rate Limiting

---

## Project Structure

```
vyomxpress-backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   └── service.controller.js
│   ├── discord/
│   │   ├── bot.js
│   │   ├── register-commands.js
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
├── src/server.js
├── .env.example
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Nitinkumar1402/vyomxpress-backend.git
cd vyomxpress-backend
npm install
```

### 2. Setup environment

```bash
cp .env.example .env
```

Fill in `.env`:

```
PORT=5000
NODE_ENV=development

DB_HOST=your_db_host
DB_PORT=3306
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_client_id
DISCORD_GUILD_ID=your_guild_id
```

### 3. Register Discord commands (only once)

```bash
npm run register-commands
```

### 4. Run

```bash
npm run dev     # development
npm start       # production
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup` | Register new user |
| POST | `/api/v1/auth/login` | Login and get JWT |
| GET | `/api/v1/auth/me` | Get logged in user (auth required) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | List all users |
| GET | `/api/v1/users/:id` | Get user by ID |
| GET | `/api/v1/users/username/:username` | Get user by username |
| PUT | `/api/v1/users/:id` | Update user |
| DELETE | `/api/v1/users/:id` | Deactivate user |

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/services` | Create a service |
| GET | `/api/v1/services` | List all services |
| GET | `/api/v1/services/:id` | Get service by ID |
| PUT | `/api/v1/services/:id` | Update service |
| DELETE | `/api/v1/services/:id` | Delete service |

---

## Discord Slash Commands

| Command | What it does |
|---------|-------------|
| `/ppcreateuser` | Creates a user in the system |
| `/ppcreateservice` | Creates a service linked to a user |
| `/ppgetuser` | Fetches user info by username |

To set up the bot:
1. Create app at https://discord.com/developers/applications
2. Go to Bot tab and copy the token
3. Copy Client ID from OAuth2 tab
4. Enable Developer Mode in Discord, right-click your server to get Guild ID
5. Invite bot with `bot` + `applications.commands` scopes
6. Run `npm run register-commands`

---

## Docs and Links

- Swagger UI: https://vyomxpress-backend.onrender.com/api/v1/docs
- Health check: https://vyomxpress-backend.onrender.com/health
- Live API: https://vyomxpress-backend.onrender.com