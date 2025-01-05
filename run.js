const express = require("express");
const app = express();
const path = require("path");
const GETmethod = require("./methods/GETmethod/GETmethod.js")
const POSTmethod = require("./methods/POSTmethod/POSTmethod.js")





app.use(express.json());

app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
    switch (req.method) {
        case "GET":
            GETmethod(req, res)
            break;
        case "POST":
            console.log(req.body);
            
            POSTmethod(req, res)
            break;
        default:
            break;
    }
})

app.use((_, res) => {
    res.status(404).send("<h1>Not found :(</h1>")
})

app.listen("7777", () => console.log('http://localhost:7777/'))
