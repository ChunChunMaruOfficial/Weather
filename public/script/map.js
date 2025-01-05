const bgmap = document.querySelector('.bgmap')
const info = document.querySelector('.info');
const forecastmenu = document.querySelector('.forecastmenu')
let bgmapstyle = bgmap.getBoundingClientRect();
let infostyle = info.getBoundingClientRect();
const card = document.querySelector(".card")
const forecastchild = document.querySelector(".forecastchild")
let res


const forecatsrender = (pagenumber) => {
    card.style.margin = ' 0 0 8px 8px'
    card.innerHTML = `<b>${(Number(res.forecast[pagenumber].high) + Number(res.forecast[pagenumber].low)) / 2}</b>`
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
    highttemp.innerHTML += `<p>&nbsp; Hight temp: <b>${res.forecast[pagenumber].high}</b></p>`
    lowtemp.appendChild(min);
    lowtemp.innerHTML += `<p>&nbsp; Low temp: <b>${res.forecast[pagenumber].low}</b></p>`
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
}

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
    document.querySelector(".info").style.display = 'flex'
let openclose = false
    forecastmenu.addEventListener("click", () => {
        if (!openclose) {
            forecatsrender(0)
            document.querySelector('.forecastmenu img').style.transform = 'none'
            forecastchild.classList.add('show')
            forecastchild.classList.remove('hide')
            openclose = true
        } else {
            document.querySelector('.forecastmenu img').style.transform = 'scaleX(-1)'
            forecastchild.classList.remove('show')
            forecastchild.classList.add('hide')
            setTimeout(() => {
                card.innerHTML = '';
            }, 300);
            openclose = false
        }
    })

}

bgmap.addEventListener("click", (e) => {
    console.log((e.clientX - bgmapstyle.left) / bgmapstyle.width * 100);
    console.log((e.clientY - bgmapstyle.top) / bgmapstyle.height * 100);
})

let offsetX, offsetY;

document.querySelector('.info>span').addEventListener('mousedown', (e) => {
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





const coordinates = [{ left: 54.7, top: 22.5, place: 'Minsk, Belarus' },
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
]

const overlays = document.querySelectorAll('.marker');
const container = document.querySelector('.container');

document.addEventListener("DOMContentLoaded", () => {
    coordinates.forEach((v) => {
        const img = document.createElement('img');
        img.style.left = `calc(${v.left}% - 8px)`;
        img.style.top = `calc(${v.top}% - 20px)`;
        img.src = '../src/svg/mapmarker.svg';
        img.classList.add("marker");

        img.addEventListener('click', () => {
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

