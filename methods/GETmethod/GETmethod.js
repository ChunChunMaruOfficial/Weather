
const answer = require('./GETmethods/getweather.js')


const userdata = require("../../data/userdata.js")
function GETmethod(req, res) {
    switch (req.path) {
        case '/':
            res.render("welcomepage.hbs", {
                nick: '../src/svg/system/user.svg',
                marker: '../src/svg/usercard/marker.svg'
            });
            break
        case '/map':
            console.log('MAAAp');
            
            res.render("map.hbs", {
                imgurl: '../src/img/map.png',
                mapmarker: '../src/svg/mapmarker.svg',
                nick: userdata.nickname,
                location: userdata.location
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
            res.render("catalog.hbs");
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