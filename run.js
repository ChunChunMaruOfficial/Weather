const express = require("express");
const app = express();
const path = require("path");
const weather = require('weather-js');
const userdata = require("./data/userdata.js")

weather.find(
    { search: 'MINSK', degreeType: 'C' }, function (err, result) {
        if (err) console.log("EERRRROOORRR", err);

        console.log(JSON.stringify(result, null, 2));
    });

app.set('view engine', 'hbs'); //шаблонизатор

app.use(express.static(path.join(__dirname, 'public'))); //чтение статики в public

// Добавьте этот middleware для парсинга JSON-тела запроса
app.use(express.json());

app.get("/map", (_, res) => {

    res.render("map.hbs", {
        imgurl: '../src/img/map.png',
        mapmarker: '../src/svg/mapmarker.svg',
        nick: userdata.nickname,
        location: userdata.location
    });
});

app.get("/", (_, res) => {
    res.render("welcomepage.hbs", {
        button: '../src/svg/checkcircle.svg',
        nick: '../src/svg/user.svg',
        marker: '../src/svg/marker.svg'
    });
});

app.post("/senduserdata", (req, res) => {
    const { nick, place } = req.body;
    if(nick && place){

        userdata.setlocation(place, nick)
        res.send(JSON.stringify({ ans: true }))
    } else{
        res.send(JSON.stringify({ ans: false }))
    }
});

app.listen("7777", () => console.log('server run'));
