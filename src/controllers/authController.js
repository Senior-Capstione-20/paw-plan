const usersDB = {
    users: require('../users.json'),
    setUsers: function (data) { this.users = data }
}

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