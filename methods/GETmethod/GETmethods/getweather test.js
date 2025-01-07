const weather = require('weather-js');
let temp = []
async function answer(pl, callback) { //pl - место
    weather.find({ search: pl, degreeType: 'C' }, function (err, result) {
        if (err) {
            console.error('ERROR:', err);
        } else {
            callback(result[0]);
        }
        console.log('comment idk');

    })
    return temp
}

module.exports = answer;