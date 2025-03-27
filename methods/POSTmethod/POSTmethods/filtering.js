const getweather = require("../../GETmethod/GETmethods/getweather.js")
const fs = require('fs').promises

async function readData() {
    const rawData = await fs.readFile('./data/allData.json', 'utf-8');
    return JSON.parse(rawData);
}


async function filtering(body, res) {
    const parseddata = await readData()
    let middle
    if (body.name) {
        middle = parseddata.filter(v => v.place.toLowerCase().includes(body.name.toLowerCase()))
    }


    getweather(body.name ? middle : parseddata, res, body);

}

module.exports = filtering