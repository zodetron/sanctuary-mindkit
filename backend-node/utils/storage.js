/**
 * File-based storage utilities
 * Uses JSON files for data storage
 */

const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists or permission error
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Read users from JSON file
 */
async function readUsers() {
  await ensureDataDir();
  const usersFile = path.join(DATA_DIR, 'users.json');
  
  try {
    const data = await fs.readFile(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty array
      return [];
    }
    throw error;
  }
}

/**
 * Write users to JSON file
 */
async function writeUsers(users) {
  await ensureDataDir();
  const usersFile = path.join(DATA_DIR, 'users.json');
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

/**
 * Find user by username
 */
async function findUserByUsername(username) {
  const users = await readUsers();
  return users.find(user => user.username === username);
}

/**
 * Create a new user
 */
async function createUser(username, hashedPassword) {
  const users = await readUsers();
  
  // Check if user already exists
  if (users.find(user => user.username === username)) {
    throw new Error('Username already exists');
  }
  
  // Add new user
  users.push({
    username,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  });
  
  await writeUsers(users);
  return { username, createdAt: users[users.length - 1].createdAt };
}

module.exports = {
  readUsers,
  writeUsers,
  findUserByUsername,
  createUser
};

