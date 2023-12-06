const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

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
     const stmt = this.db.prepare('INSERT INTO users VALUES (?, ?, ?)');
     data.forEach((user) => {
       stmt.run(user.username, user.password, user.email);
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
    const { user, password, email } = req.body;
    if (!user || !password || !email) return res.status(400).json({ 'message': 'Missing required username, password, or email' });
   
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
         usersDB.setUsers([{ "username": user, "password": hashedPassword, "email": email }]);
         res.status(201).json({ "success": `New user ${user} created!`});
       });
     //} catch (err) {
     //  res.status(500).json({ 'message': err.message });
     //}
    });
   }

   
   module.exports = { handleNewUser };