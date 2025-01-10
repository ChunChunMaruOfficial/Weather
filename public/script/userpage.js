document.addEventListener("DOMContentLoaded", async () => {
    if (locationelement.innerHTML) {
        const req = await fetch('/serchingweather', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ pl: locationelement.innerHTML })
        })
 
        const res = await req.json()
        console.log(res);

        res.isdaynow ? daystatus.src = '../src/svg/usercard/orangesun.svg' : daystatus.src = '../src/svg/usercard/orangemoon.svg'
        targettime.innerHTML = `${res.current.observationtime} &nbsp; |  &nbsp; ${res.current.date} (${res.current.day})`
        targetplace.innerHTML = res.current.observationpoint;
        res.tempisgrowing ? tempstate.src = '../src/svg/weather/updown/orangetemperaturearrowup.svg' : tempstate.src = '../src/svg/weather/updown/orangetemperaturearrowdown.svg'
        targettemp.innerHTML = `${res.current.temperature} °C    &nbsp;      |    &nbsp;      feels like: ${res.current.feelslike} °C`
        skytext.src = `../src/svg/weather/skytext/orange/${res.current.skytext}.svg`
        targetskytext.innerHTML = res.current.skytext
        windstate.src = `../src/svg/weather/arrows/orange/${res.windstatesrc}.svg`
        targetwind.innerHTML = res.current.winddisplay
        humidity.src = `../src/svg/weather/humidity/humidityorange.svg`
        targethumidity.innerHTML = `${res.current.humidity} %`


        res.forecast.forEach((v) => {
            const card = document.createElement('div');
            const left = document.createElement('p');
            left.innerHTML = `<b>${(Number(v.high) + Number(v.low)) / 2}</b>`
            const right = document.createElement('div');
            card.append(left, right);
            const date = document.createElement('p');
            date.innerHTML = `${v.day} &nbsp; |  &nbsp; ${v.date}`
            date.style.color = '#727272'
            right.appendChild(date);
            const temp = document.createElement('span');
            const max = document.createElement('img');
            const min = document.createElement('img');
            max.src = '../src/svg/forecastcard/maxtemp.svg'
            min.src = '../src/svg/forecastcard/mintemp.svg'
            temp.appendChild(max);
            temp.innerHTML += `<p>&nbsp; Hight temp: <b>${v.high}</b>  &nbsp;      |    &nbsp;</p>`
            temp.appendChild(min);
            temp.innerHTML += `<p>&nbsp; Low temp: <b>${v.low}</b></p>`
            right.appendChild(temp)

            const skytext = document.createElement('span');
            const skyimg = document.createElement('img');
            skyimg.src = `../src/svg/weather/skytext/black/${v.skytextday}.svg`
            skytext.appendChild(skyimg)
            skytext.innerHTML += ` <p> &nbsp; <b>${v.skytextday}</b></p>`
            right.appendChild(skytext);
            const precip = document.createElement('span');
            const spark = document.createElement('img');
            spark.src = '../src/svg/forecastcard/spark.svg'
            precip.appendChild(spark)
            precip.innerHTML += ` <p> &nbsp; Chance of precipitation: <b>${v.precip}</b></p>`

            right.appendChild(precip);
            document.querySelector('#forecast').appendChild(card);
       });
    } else {
        document.querySelectorAll('.info>*').forEach(e => e.style.display = 'none');
        document.querySelector('.info').innerHTML = `<p class="msg">To view information about your region, log in to <a href="../">your account</a></p>`;
    }
})

function closeeditplacefun() {
    locationelement.classList.remove("hidden")
    place.classList.add("hidden")
    closeeditplace.classList.add("hidden")
    locationimg.src = '../src/svg/system/edit.svg'
}

function closeeditnickfun() {
    nickelement.classList.remove("hidden")
    nick.classList.add("hidden")
    closeeditnick.classList.add("hidden")
    nickimg.src = '../src/svg/system/edit.svg'
}

editplace.addEventListener('click', async () => {
    if (place.classList.contains('hidden')) {
        locationelement.classList.add("hidden")
        place.classList.remove("hidden")
        closeeditplace.classList.remove("hidden")
        locationimg.src = '../src/svg/system/send.svg'
    } else {
        if (place.value) {
            fetch('/senduserloc', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ loc: place.value })
            })
            closeeditplacefun()
            location.reload()
        } else {
            alert("values isnt correct")
        }
    }
})

closeeditplace.addEventListener('click',() => closeeditplacefun())

closeeditnick.addEventListener('click', () => closeeditnickfun())

editnick.addEventListener('click', async () => {
    if (nick.classList.contains('hidden')) {
        nickelement.classList.add("hidden")
        nick.classList.remove("hidden")
        closeeditnick.classList.remove("hidden")
        nickimg.src = '../src/svg/system/send.svg'
    }
    else {
        if (nick.value) {
            fetch('/sendusernick', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ nick: nick.value })
            })
            closeeditnickfun()
            location.reload()
        } else {
            alert("values isnt correct")
        }
    }
})




