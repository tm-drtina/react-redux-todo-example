const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const todos = [];
let localId = 0;

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(function(req,res,next){setTimeout(next,300)}); // add intentional delay of 300ms

app.post('/todo/add', (req, res) => {
    todos.push(Object.assign(req.body, {id: localId++}));
    res.set({ 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos));
});

app.get('/todo/list', (req, res) => {
    res.set({ 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos));
});

// Error Handling
app.use((req, res, next) => {
    console.log('404', req.originalUrl);
});

app.use((err, req, res) => res.sendStatus(err.status || 500));

// Start Server
app.listen(port);
console.log(`Serving: localhost:${port}`);
