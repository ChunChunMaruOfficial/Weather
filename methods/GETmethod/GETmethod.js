
const answer = require('./GETmethods/getweather.js')
const userdata = require("../../data/userdata.js")
const fs = require('fs').promises;

async function readData() {
    const data = await fs.readFile('./data/WeatherData.json', 'utf-8');
    return JSON.parse(data);
}

async function GETmethod(req, res) {
    switch (req.path) {
        case '/':
            res.render("welcomepage.hbs");
            break
        case '/map':
            res.render("map.hbs", {
                imgurl: '../src/img/map.png',
                mapmarker: '../src/svg/mapmarker.svg',
                nick: userdata.nickname,
                location: userdata.location,
            });
            break
        case '/userpage':
            res.render("userpage.hbs", {
                nick: '../src/svg/usercard/userwhite.svg',
                earth: '../src/svg/usercard/earth.svg',
                backarrow: '../src/svg/system/backarrow.svg',
                name: userdata.nickname,
                location: userdata.location
            });
            break;
        case '/catalog':
            res.render("catalog.hbs", {
                filter: [
                    {
                        name: 'Temperature',
                        firstid: 'maxtemp',
                        secondid: 'mintemp',
                    },
                    {
                        name: 'Feels like temperature',
                        firstid: 'maxfeelstem',
                        secondid: 'minfeelstem',
                    },
                    {
                        name: 'Humidity',
                        firstid: 'maxhumidity',
                        secondid: 'minhumidity',
                    },
                    {
                        name: 'Wind speed',
                        firstid: 'maxwind',
                        secondid: 'minwind',
                    },
                ],
                Wind_direction: ['all', 'East','North', 'Northeast', 'Northwest', 'South', 'Southeast', 'Southwest', 'West'],
                Weather: await readData()
            });
            break;
        case '/createallweather':
            answer(undefined, res)

            break;
        default:
            res.send('invalid path :^')
            break;
    }
}

module.exports = GETmethod