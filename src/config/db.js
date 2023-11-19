/**
 * Database Configuration:
 * Initializes and configures the SQLite3 database.
 * Defines the 'user' table schema and creates it.
 * Supports both in-memory and persistent database configurations.
 */


// Importing the SQLite3 library for Node.js with verbose mode (for detailed stack traces)
const sqlite3 = require('sqlite3').verbose();

// Initializing an persistent SQLite3 database
const db = new sqlite3.Database('mydb.sqlite');

// Serializing database operations to ensure they're executed in order
db.serialize(() => {
    // Creating the clients table with columns for user, and password
    db.run("CREATE TABLE clients (user TEXT UNIQUE, password TEXT)");
});

// Exporting the database connection for use in other files
module.exports = db;
