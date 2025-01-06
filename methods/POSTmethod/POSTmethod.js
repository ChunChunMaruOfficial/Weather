const userdata = require("../../data/userdata.js")
const answer = require('../GETmethod/GETmethods/getweather.js')
const filtering = require('../POSTmethod/POSTmethods/filtering.js')

async function POSTmethod(req, res) {
    switch (req.path) {
        case '/sendusernick':
            userdata.setnickname(req.body.nick)
            res.status(200).send('done')
            break;
        case '/senduserloc':
            userdata.setlocation(req.body.loc)
            res.status(200).send('done')
            break;
        case '/sendusergrad':            
            userdata.setgrad(req.body.gradus)
            res.status(200).send('done')
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