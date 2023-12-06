const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const axios = require('axios'); // Make sure to import axios or replace it with your HTTP client library

let db = new sqlite3.Database('./petsDB.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the petsDB database.');
});

db.run('CREATE TABLE IF NOT EXISTS pets(name TEXT, owner TEXT, breed TEXT)', (err) => {
  if (err) {
    console.error(err.message);
  }
});

const petsDB = {
  db: db,
  setPets: function (data) {
    const stmt = this.db.prepare('INSERT INTO pets VALUES (?, ?, ?)');
    data.forEach((pet) => {
      stmt.run(pet.name, pet.owner, pet.breed);
    });
    stmt.finalize();
  },
  getPet: function (name, callback) {
    this.db.get('SELECT * FROM pets WHERE name = ?', [name], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      callback(row);
    });
  }
}

const handlePetRegistration = async (req, res) => {
  const { name, owner, breed } = req.body;
  if (!name || !owner || !breed) {
    return res.status(400).json({ 'message': 'Missing required pet information' });
  }

  petsDB.getPet(name, (duplicate) => {
    if (duplicate) return res.status(409).json({ msg: 'Pet with this name already exists' });

    petsDB.setPets([{ "name": name, "owner": owner, "breed": breed }]);
    res.status(201).json({ "success": `New pet ${name} registered!` });
  });
};

export default handlePetRegistration;
