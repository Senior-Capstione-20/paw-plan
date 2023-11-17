const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;


// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// routes
app.use('/register', require('./src/api/register'));
app.use('/login', require('./src/api/auth'));

/*
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});
*/

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));