const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

/**
 * Register a new user
 */
const signup = async ({ username, email, password }) => {
  // Check duplicate username
  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) {
    const err = new Error("Username is already taken.");
    err.statusCode = 409;
    throw err;
  }

  // Check duplicate email
  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) {
    const err = new Error("Email is already registered.");
    err.statusCode = 409;
    throw err;
  }

  // Hash password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = await User.create({ username, email, password: hashedPassword });

  const token = generateToken(user);

  return {
    token,
    user: sanitizeUser(user),
  };
};

/**
 * Login existing user
 */
const login = async ({ username, password }) => {
  // Fetch user with password (use withPassword scope)
  const user = await User.scope("withPassword").findOne({ where: { username } });

  if (!user || !user.is_active) {
    const err = new Error("Invalid username or password.");
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid username or password.");
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(user);

  return {
    token,
    user: sanitizeUser(user),
  };
};

// ─── Helpers ───────────────────────────────────────────────

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

module.exports = { signup, login };