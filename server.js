const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
var noteArr = require("./db/db.json")
var notePath = "/db/db.json"

class Todo {
    constructor(title, text, id) {
      this.title = title;
      this.text = text;
      Todo.lastId++;
      this.id = Todo.lastId;
    }
  }
  Todo.lastId = 0;


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
    var addNote = new Todo (req.body.title, req.body.text);
    noteArr.push(addNote)
    fs.writeFile(__dirname + notePath, JSON.stringify(noteArr), (err) => {})
    res.json(addNote);
});

app.delete('/api/notes/:id', function(req, res) {
    let id = parseInt(req.params.id);
    noteArr = noteArr.filter(note =>  note.id !== id)
    fs.writeFile(__dirname + notePath, JSON.stringify(noteArr), (err) => {})
    res.json(noteArr);
})

app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT)
});