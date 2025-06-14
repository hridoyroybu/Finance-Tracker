function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
  
module.exports = {
    fahrenheitToCelsius
};

// Database design

// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_name VARCHAR(50) UNIQUE NOT NULL,
//     display_name VARCHAR(50) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
// );


// CREATE TABLE accounts (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     account_type ENUM('personal', 'business') NOT NULL,
//     owner_user_id INT NOT NULL, -- user who created the account
//     business_name VARCHAR(100), -- optional for business accounts
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (owner_user_id) REFERENCES users(id)
// );


// CREATE TABLE business_members (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     account_id INT NOT NULL,
//     user_id INT NOT NULL,
//     is_admin BOOLEAN DEFAULT FALSE,
//     joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (account_id) REFERENCES accounts(id),
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );

// CREATE TABLE transactions (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     account_id INT NOT NULL,
//     user_id INT NOT NULL, -- who made the transaction
//     type ENUM('deposit', 'withdraw') NOT NULL,
//     amount DECIMAL(10, 2) NOT NULL,
//     note TEXT,
//     transaction_date DATE NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (account_id) REFERENCES accounts(id),
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );


