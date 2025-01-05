const userdata = require("../../data/userdata.js")
const answer = require('../GETmethod/GETmethods/getweather.js')
const filtering = require('../POSTmethod/POSTmethods/filtering.js')

async function POSTmethod(req, res) {
    switch (req.path) {
        case '/sendusernick':
            userdata.setnickname(req.body.nick)
            break;
        case '/senduserloc':
            console.log(req.body);
            userdata.setlocation(req.body.loc)
            break;
        case '/sendusergrad':            
            userdata.setgrad(req.body.gradus)
            break;
        case '/serchingweather':
            answer(req.body.pl, res)
            break;
        case '/search':
            filtering(req.body, res)
            break;
        default:
            break;
    }
}

module.exports = POSTmethod