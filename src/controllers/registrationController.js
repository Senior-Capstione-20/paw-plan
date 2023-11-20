/*
const usersDB = {
    users: require('../users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, password } = req.body;
    if ( !user | !password ) return res.status(400).json({ 'message': 'Missing required username or password' });
    // check for duplicates in the db here
    const duplicate = usersDB.users.find( u => u.username === user );
    if (duplicate) return res.status(409).json({ msg: 'Username already exists' });
    try {
        // encrypt password with bcrypt blowfish cipher, second param is the number of salt rounds for encryption
        const hashedPassword = await bcrypt.hash(password, 10);
        // append the new user to users database
        const newUser = { "username": user, "password": hashedPassword };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '../users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({ "success": `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {handleNewUser};
*/

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

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
     const stmt = this.db.prepare('INSERT INTO users VALUES (?, ?)');
     data.forEach((user) => {
       stmt.run(user.username, user.password);
     });
     stmt.finalize();
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

   
   const handleNewUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ 'message': 'Missing required username or password' });
   
    usersDB.getUser(user, (duplicate) => {
     if (duplicate) return res.status(409).json({ msg: 'Username already exists' });
     // try {
       // encrypt password with bcrypt blowfish cipher, second param is the number of salt rounds for encryption
       bcrypt.hash(password, 10, (err, hashedPassword) => {
         if (err) {
           console.error(err);
           return res.status(500).json({ 'message': 'Error hashing password' });
         }
         // append the new user to users database
         usersDB.setUsers([{ "username": user, "password": hashedPassword }]);
         res.status(201).json({ "success": `New user ${user} created!`});
       });
     //} catch (err) {
     //  res.status(500).json({ 'message': err.message });
     //}
    });
   }

   
   module.exports = { handleNewUser };