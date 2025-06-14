const connection = require('./db'); // Import the database connection

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      user_name VARCHAR(255) NOT NULL UNIQUE,
      display_name VARCHAR(255),
      password VARCHAR(255) NOT NULL
  );
`;

const createAccountsTable = `
  CREATE TABLE IF NOT EXISTS accounts (
      account_id INT AUTO_INCREMENT PRIMARY KEY,
      account_name VARCHAR(255) NOT NULL,
      account_type ENUM('personal account', 'mutual account', 'business account') NOT NULL,
      account_owner INT NOT NULL,
      FOREIGN KEY (account_owner) REFERENCES users(user_id) ON DELETE CASCADE
  );
`;

const createRefreshTokensTable = `
  CREATE TABLE refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
  );
`;

// Function to create tables
function setupDatabase() {
  connection.query(createUsersTable, (err, result) => {
    if (err) {
      console.error("Error creating Users table:", err);
      return;
    }
    console.log("Users table created or already exists.");

    connection.query(createAccountsTable, (err, result) => {
      if (err) {
        console.error("Error creating Accounts table:", err);
        return;
      }
      console.log("Accounts table created or already exists.");

      // Close connection after all queries are done
      connection.end();
    });
  });
}

// Function to create tables
function setupRefreshToken() {
  connection.query(createRefreshTokensTable, (err, result) => {
    if (err) {
      console.error("Error creating Refresh Tokens table:", err);
      return;
    }
    console.log("Refresh Token table created or already exists.");
    connection.end();
  });
}

// uncomment and run this when need to add a new table
// setupDatabase()
// setupRefreshToken();