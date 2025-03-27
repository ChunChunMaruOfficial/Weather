const userdata = require("../../data/userdata.js")
const wallpaper = require("../../data/Wallpapers.json")
const answer = require('../GETmethod/GETmethods/getweather.js')
const filtering = require('../POSTmethod/POSTmethods/filtering.js')

async function POSTmethod(req, res) {
    switch (req.path) {
        case '/sendusernick':
            userdata.setnickname(req.body.nick)
            res.status(200).send('done')
            break;
        case '/getwallpaper':
            userdata.setwallpaper(wallpaper[req.body.wallpaper])
            break;
        case '/senduserloc':
            let temp;
            if (req.body.loc == '') {
                userdata.setlocation(temp);
            } else {
                temp = await new Promise(resolve => {
                    answer(req.body.loc, null, null, resolve, false);
                })
                if (temp) {
                    userdata.setlocation(temp);
                    console.log(temp);
                    res.status(200).send(temp);
                } else
                    res.status(500).send("");
            }

            break;
        case '/sendusergrad':
            userdata.setgrad(req.body.gradus)
            res.status(200).send('done')
            break;
        case '/serchingweather':
            answer(req.body.pl, res, null, null, req.body.extended)
            break;
        case '/search':
            filtering(req.body, res)
            break;
        default:
            break;
    }
}

module.exports = POSTmethod