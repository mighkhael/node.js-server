const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Mock database
let db = [];

// Middleware
app.use(bodyParser.json());

// Routes

// Add a joke to the database
app.post('/', (req, res) => {
    const { title, comedian, year } = req.body;
    const id = db.length + 1;
    const newJoke = { id, title, comedian, year };
    db.push(newJoke);
    res.json(db);
});

// Get all jokes from the database
app.get('/', (req, res) => {
    res.json(db);
});

// Update a joke by ID
app.patch('/joke/:id', (req, res) => {
    const id = req.params.id;
    const { title, comedian, year } = req.body;
    db[id - 1] = { id: parseInt(id), title, comedian, year };
    res.json(db[id - 1]);
});

// Delete a joke by ID
app.delete('/joke/:id', (req, res) => {
    const id = req.params.id;
    const deletedJoke = db.splice(id - 1, 1);
    res.json(deletedJoke[0]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
