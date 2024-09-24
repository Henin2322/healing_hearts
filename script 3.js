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

// Function to register a new user
const registerUser = (username, password) => {
    const saltRounds = 10; // Number of salt rounds for bcrypt

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;

        // Insert the user into the database
        const query = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';
        connection.execute(query, [username, hash], (err, results) => {
            if (err) {
                console.error('Error inserting user:', err);
            } else {
                console.log('User registered successfully:', results);
            }
        });
    });
};

// Example usage: Registering a user
registerUser('example_user', 'example_password')