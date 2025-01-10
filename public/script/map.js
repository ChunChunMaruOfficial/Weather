const bgmap = document.querySelector('.bgmap')
const info = document.querySelector('.info');
const forecastmenu = document.querySelector('.forecastmenu')
let bgmapstyle = bgmap.getBoundingClientRect();
let infostyle = info.getBoundingClientRect();
const card = document.querySelector(".card")
const forecastchild = document.querySelector(".forecastchild")
const infoorange = document.querySelector('.info>span:nth-of-type(2)')
let res
let openclose


const forecatsrender = (pagenumber) => {
    card.style.margin = ' 0 0 8px 8px'
    card.innerHTML = `<b>${(Number(res.forecast[pagenumber].high) + Number(res.forecast[pagenumber].low)) / 2}&nbsp;°${res.location.degreetype} </b>`
    const date = document.createElement('p');
    date.innerHTML = `${res.forecast[pagenumber].day} &nbsp; |  &nbsp; ${res.forecast[pagenumber].date}`
    date.style.color = '#727272'
    card.appendChild(date);
    const highttemp = document.createElement('span');
    const lowtemp = document.createElement('span');
    const max = document.createElement('img');
    const min = document.createElement('img');
    max.src = '../src/svg/forecastcard/maxtemp.svg'
    min.src = '../src/svg/forecastcard/mintemp.svg'
    highttemp.appendChild(max);
    highttemp.innerHTML += `<p>&nbsp; Hight temp: <b>${res.forecast[pagenumber].high}°</b>${res.location.degreetype}</p>`
    lowtemp.appendChild(min);
    lowtemp.innerHTML += `<p>&nbsp; Low temp: <b>${res.forecast[pagenumber].low}°</b>${res.location.degreetype}</p>`
    card.append(highttemp, lowtemp)

    const skytext = document.createElement('span');
    const skyimg = document.createElement('img');
    skyimg.src = `../src/svg/weather/skytext/black/${res.forecast[pagenumber].skytextday}.svg`
    skytext.appendChild(skyimg)
    skytext.innerHTML += ` <p> &nbsp; <b>${res.forecast[pagenumber].skytextday}</b></p>`
    card.appendChild(skytext);
    const precip = document.createElement('span');
    const spark = document.createElement('img');
    spark.src = '../src/svg/forecastcard/spark.svg'
    precip.appendChild(spark)
    precip.innerHTML += ` <p> &nbsp; Chance of precipitation: <b>${res.forecast[pagenumber].precip}</b></p>`

    card.appendChild(precip);
    forecastchild.appendChild(card);
    openclose = true
}


const forecastmenuclosing = () => {
    document.querySelector('.forecastmenu img').style.transform = 'scaleX(-1)'
    forecastchild.classList.remove('show')
    forecastchild.classList.add('hide')
    setTimeout(() => {
        card.innerHTML = '';
    }, 300);
    openclose = false
}

closeinfo.addEventListener("click", () => {
    forecastmenuclosing()
    forecastchild.classList.remove('hide')
    info.style.display = 'none'
})

const localweatherrequest = async (pl) => {
    const req = await fetch('/serchingweather', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ pl: pl })
    })
    res = await req.json()
    console.log(res)
    targettime.innerHTML = `${res.current.observationtime} &nbsp; |  &nbsp; ${res.current.date} (${res.current.day})`
    daystatus.src = `../src/svg/weather/daystatus/white/${res.daystatuscurrent}.svg`
    targetplace.innerText = res.current.observationpoint;
    res.tempisgrowing ? tempstate.src = '../src/svg/weather/updown/temperaturearrowup.svg' : tempstate.src = '../src/svg/weather/updown/temperaturearrowdown.svg'
    targettemp.innerHTML = `${res.current.temperature} °${res.location.degreetype}    &nbsp;      |    &nbsp;      feels like: ${res.current.feelslike} °${res.location.degreetype}`
    humidityimg.src = `../src/svg/weather/humidity/humiditywhite.svg`
    humiditytext.innerHTML = `${res.current.humidity} %`
    windstate.src = `../src/svg/weather/arrows/white/${res.windstatesrc}.svg`
    targetwind.innerHTML = res.current.winddisplay
    skytext.src = `../src/svg/weather/skytext/white/${res.current.skytext}.svg`
    targetskytext.innerHTML = res.current.skytext
    point.src = '../src/svg/usercard/marker.svg'
    targetlocation.innerHTML = `lat: ${res.location.lat} | long: ${res.location.long}`


    Array.from(info.children).forEach(v => v.style.display = 'flex')
    loadmap.style.display = 'none'

}

forecastmenu.addEventListener("click", () => {
    switch (openclose) {
        case true:
            forecastmenuclosing()
            break;
        case false:
            forecatsrender(0)
            document.querySelector('.forecastmenu img').style.transform = 'none'
            forecastchild.classList.add('show')
            forecastchild.classList.remove('hide')
            break;
    }
})

bgmap.addEventListener("click", (e) => {
    console.log((e.clientX - bgmapstyle.left) / bgmapstyle.width * 100);
    console.log((e.clientY - bgmapstyle.top) / bgmapstyle.height * 100);
})

let offsetX, offsetY;

infoorange.addEventListener('mousedown', (e) => {
    offsetX = e.clientX - info.getBoundingClientRect().left;
    offsetY = e.clientY - info.getBoundingClientRect().top;
    document.addEventListener('mousemove', moveElement);
    document.addEventListener('mouseup', stopMovingElement);
});

function moveElement(e) {
    info.style.left = `${e.clientX - offsetX + 180}px`;
    info.style.top = `${e.clientY - offsetY}px`;
}

function stopMovingElement() {
    document.removeEventListener('mousemove', moveElement);
    document.removeEventListener('mouseup', stopMovingElement);
}


document.querySelectorAll('#points > *').forEach((v, i) => {
    v.addEventListener('click', () => {
        forecatsrender(i)
        document.querySelectorAll('#points > *').forEach((v1, i1) => {
            i == i1 ? points.children[i1].classList.add('selected') : points.children[i1].classList.remove('selected')
        })
    });
});





const coordinates = [
{ left: 54.7, top: 22.5, place: 'Minsk, Belarus' },
{ left: 89.467, top: 35.5, place: 'Tokyo, Yapan' },
{ left: 19.76, top: 44.0143, place: 'Havana, cuba' },
{ left: 24.1243, top: 27.9751, place: 'Ottawa, Canada' },
{ left: 31.2180, top: 70.5249, place: 'Brasília, Brazil' },
{ left: 22.2186, top: 57.76, place: 'Bogotá, Colombia' },
{ left: 44.0289, top: 32.7620, place: 'Lisbon , portugal' },
{ left: 24.442, top: 84.9918, place: 'Santiago, Chile' },
{ left: 28.9946, top: 85.0928, place: 'montevideo, uruguay' },
{ left: 28.3593, top: 85.3110, place: 'buenos aires, argentina' },
{ left: 24.3361, top: 73.0779, place: 'La Paz, bolivia' },
{ left: 27.0359, top: 55.2561, place: 'georgetown, guyana' },
{ left: 29.1534, top: 57.0153, place: 'cayena, guayana' },
{ left: 28.0417, top: 56.37714, place: 'paramaribo, suriname' },
{ left: 47.64591, top: 34.89782, place: 'Algiers, Laayoune' },
{ left: 42.46034, top: 41.13846, place: 'Laayoune, Western Sahara' },
{ left: 14.27254, top: 46.82411, place: 'Mexico, Mexico' },
{ left: 17.85039, top: 48.06199, place: 'Belmopan, Belize' },
{ left: 16.93967, top: 50.02274, place: 'Guatemala, Guatemala' },
{ left: 17.66338, top: 50.79799, place: 'san salvador, el salvador' },
{ left: 18.06338, top: 50.59799, place: 'tegucigapla, honduras' },
{ left: 18.42855, top: 52.27884, place: 'managua, nicaragua' },
{ left: 19.03634, top: 53.74251, place: 'san jose, costa rica' },
{ left: 20.27283, top: 54.51829, place: 'panama, panama' },
{ left: 24.09090, top: 52.796033, place: 'caracas, venezuela' },
{ left: 20.55193, top: 61.541707, place: 'quito, ecuador' },
{ left: 21.51711, top: 69.345973, place: 'lima, peru' },
{ left: 27.99725, top: 78.79672, place: 'asuncion, paragay' },
{ left: 24.41262, top: 31.72071, place: 'washington, usa' },
{ left: 34.3288, top: 15.94655, place: 'nuuk, greenland' },
{ left: 45.00996, top: 22.92856, place: 'dublin, ireland' },
{ left: 46.91162, top: 23.57505, place: 'london, united kingdom' },
{ left: 45.64644, top: 31.85002, place: 'madrid, spain' },
{ left: 47.31941, top: 25.77308, place: 'paris, france' },
{ left: 47.962859, top: 24.36293, place: 'brusseis, belgium' },
{ left: 48.34892, top: 23.61645, place: 'amsterdam, niederlande' },
{ left: 49.05672, top: 27.49534, place: 'bern, switzerland' },
{ left: 51.11576, top: 26.59027, place: 'vienna, austria' },
{ left: 50.99403, top: 25.06801, place: 'prague, czech republic' },
{ left: 48.53328, top: 24.93871, place: 'luxembourg,luxembourg' },
{ left: 50.34361, top: 23.41645, place: 'berlin,germany' },
{ left: 52.46700, top: 23.51645, place: 'warsaw,poland' },
{ left: 49.80802, top: 18.967603, place: 'oslo,norway' },
{ left: 51.50005, top: 19.39904, place: 'stockholm,sweden' },
{ left: 53.92201, top: 17.82273, place: 'helsinki,finland' },
{ left: 53.73216, top: 18.89004, place: 'tallinn,estonia' },
{ left: 53.30193, top: 20.48736, place: 'riga,latvia' },
{ left: 53.872381, top: 21.9063, place: 'vilnius,litva' },
{ left: 51.78035, top: 26.16743, place: 'bratislava,slovakia' },
{ left: 52.55118, top: 26.85312, place: 'budapest,hungary' },
{ left: 50.95915, top: 28.03881, place: 'lyubljana,slovenia' },
]

const overlays = document.querySelectorAll('.marker');
const container = document.querySelector('.container');

document.addEventListener("DOMContentLoaded", () => {
    openclose = false
    coordinates.forEach((v) => {
        const img = document.createElement('img');
        img.style.left = `calc(${v.left}% - 8px)`;
        img.style.top = `calc(${v.top}% - 20px)`;
        img.src = '../src/svg/mapmarker.svg';
        img.classList.add("marker");

        img.addEventListener('click', () => {
            Array.from(info.children).forEach(v => v.style.display = 'none')
            loadmap.style.display = 'flex'
            info.style.display = 'flex'
            forecastchild.classList.remove('hide')
            localweatherrequest(v.place);
        });
        bgmap.appendChild(img);
    });


    plussize.addEventListener("click", () => {
        const width = parseFloat(bgmap.style.width.slice(0, -1));
        if (width < 400) {
            bgmap.style.width = `${width + 100}%`;
        }
    });

    minussize.addEventListener("click", () => {
        const width = Number((bgmap.style.width).slice(0, -1))
        if (width > 100) {
            bgmap.style.width = `${width - 100}%`
        }
    })

})

