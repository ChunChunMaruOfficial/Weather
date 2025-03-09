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
    console.log('L- ', (Math.round(((e.clientX - bgmapstyle.left) / bgmapstyle.width * 100) * 1000000) / 1000000));
    console.log('T: ', ((Math.round(((e.clientY - bgmapstyle.top) / bgmapstyle.height * 100) * 1000000) / 1000000)) + 0.2);
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
    info.style.top = `${e.clientY - offsetY + 56}px`;
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

const overlays = document.querySelectorAll('.marker');
const container = document.querySelector('.container');

document.addEventListener("DOMContentLoaded", async () => {
    let url = new URL(window.location.href);
    openclose = false

    const req = await fetch('/createmap')
    const res = await req.json()

    res.forEach((v) => {
        console.log(v);
        
        if (v.left) {
            const img = document.createElement('img');
            img.style.left = `calc(${v.left}% - 8px)`;
            img.style.top = `calc(${v.top}% - 20px)`;
            url.searchParams.get('target') == v.place ?
            img.src = '../src/svg/redmarker.svg' :
            img.src = '../src/svg/mapmarker.svg'
            img.classList.add("marker");

            img.addEventListener('click', () => {
                Array.from(info.children).forEach(v => v.style.display = 'none')
                loadmap.style.display = 'flex'
                info.style.display = 'flex'
                forecastchild.classList.remove('hide')
                localweatherrequest(v.place);
            });
img.addEventListener('mouseover', () => {
        const hoverElement = document.createElement('div');
        hoverElement.classList.add('maptext')
        hoverElement.textContent = v.place;
        document.body.appendChild(hoverElement);

        const rect = img.getBoundingClientRect();
        hoverElement.style.top = `${rect.top - hoverElement.offsetHeight - 5 - hoverElement.getBoundingClientRect().height}px`;
        hoverElement.style.left =`calc(${rect.left}px + 8px)`;

        img.addEventListener('mouseout', () => {
            hoverElement.remove();
        }, { once: true });
    });


            bgmap.appendChild(img);
        }
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

