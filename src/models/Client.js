/**
 * Client Model:
 * Provides methods for interacting with the 'clients' table in the database.
 * Includes functionality for creating a new client with a hashed password and
 * retrieving a clients's data based on their username.
 */


// Importing necessary modules
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Initializing an empty User object
const Client = {};

// Method to create a new user in the database
Client.create = async (user, password) => {
    // Hashing the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
        // Inserting the new clients's username and hashed password into the database
        db.run("INSERT INTO clients (user, password) VALUES (?, ?)", [email, hashedPassword], function (err) {
            if (err) reject(err);
            // Returning the ID of the newly created user
            resolve(this.lastID);
        });
    });
};

// Method to find a user by email
Client.findByUsername = (user) => {
    return new Promise((resolve, reject) => {
        // Querying the database for a user with the given email
        db.get("SELECT * FROM clients WHERE user = ?", [user], (err, row) => {
            if (err) reject(err);
            // Returning the user's data
            resolve(row);
        });
    });
};

// Exporting the User object for use in other files
module.exports = Client;
