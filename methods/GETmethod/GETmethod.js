const answer = require('./GETmethods/getweather.js')
const wallpaper = require('../../data/Wallpapers.json')
const userdata = require("../../data/userdata.js")
const fs = require('fs').promises;

async function readData() {
    const data = await fs.readFile('./data/WeatherData.json', 'utf-8');
    return JSON.parse(data);
}

async function readallcountres() {
    const data = await fs.readFile('./data/allData.json', 'utf-8');
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
                background: userdata.wallpaper
            });
            break
        case '/userpage':
            res.render("userpage.hbs", {
                nick: '../src/svg/usercard/userwhite.svg',
                earth: '../src/svg/usercard/earth.svg',
                backarrow: '../src/svg/system/backarrow.svg',
                leave: '../src/svg/usercard/leave.svg',
                name: userdata.nickname,
                location: userdata.location,
                wallpapers:wallpaper
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
                Wind_direction: ['all', 'East', 'North', 'Northeast', 'Northwest', 'South', 'Southeast', 'Southwest', 'West'],
                sorting: [
                    {
                        icon: 'name',
                        p: 'Name',
                        imgsrcfirst: 'ascword',
                        imgsrcsecond: 'descword'
                    },
                    {
                        icon: 'humidity',
                        p: 'Humidity',
                        imgsrcfirst: 'ascnumber',
                        imgsrcsecond: 'descnumber'
                    },
                    {
                        icon: 'grad',
                        p: 'Grad',
                        imgsrcfirst: 'ascnumber',
                        imgsrcsecond: 'descnumber'
                    },
                    {
                        icon: 'feelslike',
                        p: 'Feelslike',
                        imgsrcfirst: 'ascnumber',
                        imgsrcsecond: 'descnumber'
                    },
                    {
                        icon: 'windspeed',
                        p: 'Windspeed',
                        imgsrcfirst: 'ascnumber',
                        imgsrcsecond: 'descnumber'
                    }
                ],
                Weather: await readData()
            });
            break;
        case '/createallweather':
            answer(undefined, res)
            break;
        case '/createmap':
            const response = await readallcountres()            
            res.send(response)
            break;
        default:
            res.send('invalid path :^')
            break;
    }
}

module.exports = GETmethod