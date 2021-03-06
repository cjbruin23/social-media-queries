const { Client } = require('pg');
const express = require('express');
var bodyParser = require('body-parser');

// create an express application
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// create a postgresql client
const client = new Client({
    database: 'social-media'
});

// route handlers go here
app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.send(result.rows);
    });
});

app.post('/users', (req, res) => {
    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = [req.body.username, req.body.bio];
    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
        res.send(result.rows[0])
    });  
});

app.get('/users/:id', (req, res) => {
    const text = 'SELECT * FROM users WHERE id = $1'
    const values = [req.params.id]
    client.query(text, values, (err, result) => {
        console.log(result);
        res.send(result.rows[0]);
    })

})

// start a server that listens on port 3000 and connects the sql client on success
app.listen(3000, () => {
    client.connect();
});