const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
var noteArr = require("./db/db.json")
var notePath = "/db/db.json"

const PORT = process.env.PORT || 8080;
// // Reading and Writing variables for the notes, db.json doc
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, "public")));

// Routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get('/api/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});

app.post('/api/notes', function(req, res) {
    addNote = req.body
    addNote.id = noteArr.length + 1
    noteArr.push(addNote)
    fs.writeFileSync(__dirname + notePath, JSON.stringify(req.body), (err) => {})
    res.json(addNote);
});

app.delete('/api/notes/:id', function(req, res) {
    let id = parseInt(req.params.id);
    noteArr = noteArr.filter(note =>  note.id !== id)
    noteArr.forEach(note => note.id = noteArr.indexOf(note) + 1)
    fs.writeFileSync(__dirname + notePath, JSON.stringify(noteArr), (err) => {})
    res.json(noteArr);
})

app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT)
});