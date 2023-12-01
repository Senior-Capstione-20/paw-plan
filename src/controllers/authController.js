/*
const fs = require('fs').promises;

async function readFileAsync(filePath, encoding) {
    try {
      const data = await fs.readFile(filePath, encoding);
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file:', error);
      throw error; // rethrow the error to handle it elsewhere if needed
    }
  }

// Call the async function
async function setUsersDB() {
    const fileData = await readFileAsync('./users.json', 'utf8');
    const usersDB = {
        users: fileData,
        setUsers: function (data) { this.users = data; } 
    };  
    return usersDB;
}

usersDB = '';
// Use .then() to handle the resolved value
setUsersDB().then((tempDB) => {
    console.log(tempDB);
    usersDB = tempDB;
  });

//console.log(fileData);

const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, password } = req.body;
    if ( !user | !password ) return res.status(400).json({ 'message': 'Missing required username or password' });

    const foundUser = usersDB.users.find( u => u.username === user );
    if(!foundUser) return res.sendStatus(401); // unauthorized, no user

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        res.json( {'success' : `User ${user} is loggin in!`} );
    } else {
        // create json web tokens here for further authentication
        res.sendStatus(401); // unauthorized, wrong password
    }
}

module.exports = { handleLogin };
*/

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
 
 db.run('CREATE TABLE IF NOT EXISTS users(username TEXT, password TEXT)', (err) => {
  if (err) {
    console.error(err.message);
  }
  // console.log('Created users table.');
 });


 const usersDB = {
  db: db,
  setUsers: function (data) {
    const statement = this.db.prepare('INSERT INTO users VALUES (?, ?)');
    data.forEach((user) => {
      statement.run(user.username, user.password);
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
  if (!user || !password) return res.status(400).json({ 'message': 'Missing required username or password' });
 
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
        const payload = {
          username: user,
          password: password,
          // Add any other data you want to include in the JWT
         };
         
        const secretKey = 'THE_SECRETEST_KEY'; 
         
        const token = jwt.sign(payload, secretKey);
         

        res.status(200).json( {'success' : `User ${user} is logged in!`, token} );

      } else {
        res.sendStatus(401); // unauthorized, wrong password
      }
    });
  });
 }

 module.exports = { handleLogin };
