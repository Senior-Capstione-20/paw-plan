const usersDB = {
    users: require('../users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if ( !user | !pwd ) return res.status(400).json({ 'message': 'Missing required username or password' });
    // check for duplicates in the db here
    const duplicate = usersDB.users.find( u => u.username === user );
    if (duplicate) return res.status(409).json({ msg: 'Username already exists' });
    try {
        // encrypt password with bcrypt blowfish cipher, second param is the number of salt rounds for encryption
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // append the new user to users database
        const newUser = { "username": user, "password": hashedPwd };
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