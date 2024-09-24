const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Replace with your database password
    database: 'test_db'
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

// Function to check login credentials
const checkLogin = (username, enteredPassword) => {
    const query = 'SELECT password_hash FROM users WHERE username = ?';

    // Retrieve the stored password hash for the username
    connection.execute(query, [username], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            // Username not found
            console.log('Invalid username or password.');
        } else {
            const storedHash = results[0].password_hash;

            // Compare the entered password with the stored hash
            bcrypt.compare(enteredPassword, storedHash, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    console.log('Login successful!');
                } else {
                    console.log('Invalid username or password.');
                }
            });
        }
    });
};

// Example usage: Checking login credentials
checkLogin('example_user', 'example_password')