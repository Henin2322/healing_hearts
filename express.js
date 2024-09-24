const express = require('express');
const bodyParser = require('body-parser');

// Set up express app
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Simulate login check (this would usually involve querying a database)
function checkLogin(username, password, callback) {
    // Replace with your actual login logic, such as checking the database
    const mockUsername = 'admin';
    const mockPassword = 'password123';

    if (username === mockUsername && password === mockPassword) {
        callback(true); // Successful login
    } else {
        callback(false); // Failed login
    }
}

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Call checkLogin function to verify credentials
    checkLogin(username, password, (result) => {
        if (result) {
            res.send('Login successful!');
        } else {
            res.send('Invalid username or password.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
