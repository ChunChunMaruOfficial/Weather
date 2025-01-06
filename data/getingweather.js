const { table } = require('console');
const fs = require('fs')
async function qwerty() {
    const req = await fetch("https://countriesnow.space/api/v0.1/countries/capital")
    const res = await req.json()
console.log(res.data);

    fs.writeFileSync('./allData.json', JSON.stringify(res.data, null, 5))
}

module.exports = qwerty