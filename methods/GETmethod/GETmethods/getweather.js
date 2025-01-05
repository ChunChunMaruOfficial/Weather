const weather = require('weather-js');
const fs = require('fs').promises;
const userdata = require('../../../data/userdata.js')


 
async function readData() {
    const rawData = await fs.readFile('./data/allData.json', 'utf-8');
    return JSON.parse(rawData);
}

function createNewWeatherItem(ans) {
    const daystatuscurrent = Number(ans.current.observationtime.substring(0, 2));
    if (daystatuscurrent >= 19 && daystatuscurrent < 22) {
        ans.daystatuscurrent = 'sunset'
    } else if (daystatuscurrent >= 22 || daystatuscurrent < 6) {
        ans.daystatuscurrent = 'moon'
    } else if (daystatuscurrent >= 6 && daystatuscurrent < 12) {
        ans.daystatuscurrent = 'sunrise'
    } else {
        ans.daystatuscurrent = 'sun'
    }

    const windstring = ans.current.winddisplay.split(' ');
    ans.tempisgrowing =
        (Number(ans.forecast[0].low) + Number(ans.forecast[0].high)) / 2 >
        Number(ans.current.temperature);

    ans.windstatesrc = windstring[windstring.length - 1]


    return ans;
}

async function parsing(parseddata) {
    const answer = parseddata.map(({ capital, name }) =>
        new Promise((resolve, reject) =>
            weather.find({ search: `${capital}, ${name}`, degreeType: userdata.grad }, (err, result) => {
                if (err) {
                    console.error('ERROR:', err, 'LOCATION:', name);
                    reject(console.log('region load error'))
                } else {
                    resolve(createNewWeatherItem(result[0]));
                }
            })
        )
    )
    const results = await Promise.all(answer);
    return results.filter(Boolean)
}

async function answer(pl, res, body) {
    if (pl == undefined) {
        const parseddata = await readData();
        const response = await parsing(parseddata);
        res.status(200).json(response);

    } else if (Array.isArray(pl)) {
        const response = await parsing(pl)
        let filterresponse = response.filter((v) => {
            const windstring = v.current.winddisplay.split(' ')
            const windstatesrc = windstring[windstring.length - 1]
            const Temp = Number(v.current.temperature);
            const feelTemp = Number(v.current.feelslike);
            const humidity = Number(v.current.humidity);
            const wind = Number(v.current.windspeed.split(' ')[0])
            return (body.maxtemp ? Temp <= body.maxtemp : true)
                && (body.mintemp ? Temp > body.mintemp : true)
                && (body.maxfeelstem ? feelTemp <= body.maxfeelstem : true)
                && (body.minfeelstem ? feelTemp > body.minfeelstem : true)
                && (body.maxhumidity ? humidity <= body.maxhumidity : true)
                && (body.minhumidity ? humidity > body.minhumidity : true)
                && (body.maxwind ? wind <= body.maxwind : true)
                && (body.minwind ? wind > body.minwind : true)
                && (body.weather.length > 0 ? body.weather.includes(v.current.skytext) : true)
                && (body.winddirection != 'all' ? body.winddirection == windstatesrc : true)
        });
        
        res.status(200).json(filterresponse);
    } else {
        weather.find({ search: pl, degreeType: userdata.grad }, function (err, result) {
            if (err) {
                console.error('ERROR:', err);
                res.status(500).send('Error fetching weather data');
            } else {
                const finalitem = createNewWeatherItem(result[0]);
                res.status(200).send(JSON.stringify(finalitem));
            }
        });
    }
}

module.exports = answer;