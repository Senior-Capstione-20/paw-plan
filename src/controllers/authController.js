const express = require('express');
const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Install jwt for user sessions
const jwt = require('jsonwebtoken');


let db = new sqlite3.Database('./usersDB.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the usersDB database.');
 });
 
 db.run('CREATE TABLE IF NOT EXISTS users(username TEXT, password TEXT, email TEXT)', (err) => {
  if (err) {
    console.error(err.message);
  }
  // console.log('Created users table.');
 });


 const usersDB = {
  db: db,
  setUsers: function (data) {
    const statement = this.db.prepare('INSERT INTO users VALUES (?, ?, ?)');
    data.forEach((user) => {
      statement.run(user.username, user.password, user.email);
    });
    statement.finalize();
  },
  getUser: function (username, callback) {
    this.db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      callback(row);
    });
  }
 }
 

 const handleLogin = async (req, res) => {
  console.log(req.body); // Log the request body
  const { user, password } = req.body;
  if (!user || !password ) return res.status(400).json({ 'message': 'Missing required username, password, or email' });
 
  usersDB.getUser(user, (foundUser) => {
    if (!foundUser) return res.sendStatus(401); // unauthorized, no user
 
    // evaluate password
    bcrypt.compare(password, foundUser.password, (err, match) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ 'message': 'Error comparing passwords' });
      }
      // if user exists and password matches
      if (match) {

        // create json web token
        console.log(foundUser);
        const payload = {
          username: user,
          password: password,
          email: foundUser.email
          // Add any other data you want to include in the JWT
         };
         
        const secretKey = 'SOFTWARE_ENGINEERINGS_BEST_GROUP_NUMBER_20_THE_SECRETEST_KEY_PLEASE_DONT_HACK_US'; 
         
        const token = jwt.sign(payload, secretKey);
         

        res.status(200).json( {'success' : `User ${user} is logged in!`, token} );

      } else {
        res.sendStatus(401); // unauthorized, wrong password
      }
    });
  });
 }

 module.exports = { handleLogin };
