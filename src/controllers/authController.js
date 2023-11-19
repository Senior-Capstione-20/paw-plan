
//const fs = require("fs");

//const tempData = require('../users.json')
//console.log(tempData);

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

/*
fs.readFile("./users.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    console.log("File read successfully");
    fileData = jsonString;
    //console.log(fileData);
})
*/

//console.log(usersDB.users);

// Importing necessary modules
// const client = require('../models/Client');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if ( !user | !pwd ) return res.status(400).json({ 'message': 'Missing required username or password' });

    const foundUser = usersDB.users.find( u => u.username === user );
    if(!foundUser) return res.sendStatus(401); // unauthorized, no user

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        res.json( {'success' : `User ${user} is loggin in!`} );
    } else {
        // create json web tokens here for further authentication
        res.sendStatus(401); // unauthorized, wrong password
    }
}

module.exports = { handleLogin };

/*
const fs = require('fs').promises;

async function readFileAsync(filePath, encoding) {
  try {
    const data = await fs.readFile(filePath, encoding);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    // throw error; // rethrow the error to handle it elsewhere if needed
  }
}

async function init() {
  try {
    const fileData = await readFileAsync('./users.json', 'utf8');
    const usersDB = {
      users: fileData, //JSON.parse(fileData),
      setUsers: function (data) {
        this.users = data;
      },
    };

    // Now you can work with usersDB.users
    console.log(usersDB.users);

    // Importing necessary modules
    // const client = require('../models/Client');
    const bcrypt = require('bcrypt');

    const handleLogin = async (req, res) => {
      const { user, pwd } = req.body;
      if (!user || !pwd) return res.status(400).json({ message: 'Missing required username or password' });

      const foundUser = usersDB.users.find((u) => u.username === user);
      if (!foundUser) return res.sendStatus(401); // unauthorized, no user

      // evaluate password
      const match = await bcrypt.compare(pwd, foundUser.password);
      if (match) {
        res.json({ success: `User ${user} is logging in!` });
      } else {
        // create json web tokens here for further authentication
        res.sendStatus(401); // unauthorized, wrong password
      }
    };

    // Now you can use handleLogin or export it
  } catch (error) {
    // Handle errors during initialization
    console.error('Initialization error:', error);
  }
}

// Call the initialization function
init();
*/

