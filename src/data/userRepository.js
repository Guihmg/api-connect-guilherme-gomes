const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'users.json');

function initializeDatabase() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf8');
  }
}

function readUsers() {
  initializeDatabase();
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content || '[]');
}

function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
}

function generateUserId(users) {
  const highestId = users.reduce(
    (highest, user) => Math.max(highest, Number(user.id) || 0),
    0
  );

  return highestId + 1;
}

module.exports = {
  readUsers,
  saveUsers,
  generateUserId
};
