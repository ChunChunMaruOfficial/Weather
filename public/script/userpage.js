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
            const card = document.createElement('div')
            const left = document.createElement('p')
            left.innerHTML = `<b>${(Number(v.high) + Number(v.low)) / 2}</b>`
            const right = document.createElement('div')
            card.append(left, right)
            const date = document.createElement('p')
            date.innerHTML = `${v.day} &nbsp; |  &nbsp; ${v.date}`
            date.style.color = '#727272'
            right.appendChild(date);
            const temp = document.createElement('span')
            const max = document.createElement('img')
            const min = document.createElement('img')
            max.src = '../src/svg/forecastcard/maxtemp.svg'
            min.src = '../src/svg/forecastcard/mintemp.svg'
            temp.appendChild(max)
            temp.innerHTML += `<p>&nbsp; Hight temp: <b>${v.high}</b>  &nbsp;      |    &nbsp;</p>`
            temp.appendChild(min)
            temp.innerHTML += `<p>&nbsp; Low temp: <b>${v.low}</b></p>`
            right.appendChild(temp)

            const skytext = document.createElement('span')
            const skyimg = document.createElement('img')
            skyimg.src = `../src/svg/weather/skytext/black/${v.skytextday}.svg`
            skytext.appendChild(skyimg)
            skytext.innerHTML += ` <p> &nbsp; <b>${v.skytextday}</b></p>`
            right.appendChild(skytext)
            const precip = document.createElement('span')
            const spark = document.createElement('img')
            spark.src = '../src/svg/forecastcard/spark.svg'
            precip.appendChild(spark)
            precip.innerHTML += ` <p> &nbsp; Chance of precipitation: <b>${v.precip}</b></p>`
            right.appendChild(precip)

            const cardcontainer = document.createElement('div')
            cardcontainer.classList.add('card-container')

            const cardcurrent = document.createElement('div')
            cardcurrent.classList.add('card')
            cardcontainer.appendChild(cardcurrent)
            card.classList.add('card-front')

            const back = document.createElement('textarea')
            back.classList.add("card-back")
            back.style.resize = 'none'
            back.setAttribute('placeholder', 'Enter your notes here!');
            cardcurrent.append(card, back)


            document.querySelector('#forecast').appendChild(cardcontainer);
        })
        const backs = document.querySelectorAll('.card-back')

        const users = JSON.parse(localStorage.getItem('users'))
        const currentuser = users.find(v => v.name == nickelement.innerHTML)
        currentuser.weathernotes == undefined ? currentuser.weathernotes = new Array(5) :
            backs.forEach((v, i) => v.value = currentuser.weathernotes[i])

        document.querySelectorAll('.card-front').forEach((e, i) => {
            const cards = document.querySelectorAll('.card')
            e.addEventListener('click', () => {
                cards[i].classList.add('removed-card')
            })
        })
        document.body.addEventListener('click', (e) => {
            let trigger = true
            document.querySelectorAll('.card').forEach(v => {
                v.classList.contains('removed-card') ? trigger = false : ''
                !v.contains(e.target) ? v.classList.remove('removed-card') : trigger = true
            })
            if (!trigger) {
                backs.forEach((v, i) => currentuser.weathernotes[i] = v.value)
                const index = users.findIndex(v => v.name == currentuser.name)
                users[index] = currentuser
                localStorage.setItem('users', JSON.stringify(users))
                document.querySelector('.notification').classList.remove('hidenotification')
                document.querySelector('.notification').classList.add('shownotification')
                setTimeout(() => {
                    document.querySelector('.notification').classList.replace('shownotification', 'hidenotification')
                }, 1000);

            }
        })

    } else {
        document.querySelectorAll('.info>*').forEach(e => e.style.display = 'none');
        leave.style.display = 'none'
        showwallpaper.style.display = 'none'
        document.querySelector('.info').innerHTML = `<p class="msg">To view information about your region, log in to <a href="../">your account</a></p>`;
    }
})

leave.addEventListener('click', () => {
    fetch('/sendusernick', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ nick: '' })
    })
    fetch('/senduserloc', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ loc: '' })
    });
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

const wallpaper = document.querySelector('.wallpaper')

showwallpaper.addEventListener('click', () => {
    wallpaper.classList.remove('hide')
    wallpaper.classList.add('show')
})
hidewallpaper.addEventListener('click', () => {
    wallpaper.classList.replace('show', 'hide')
})

const walls = document.querySelectorAll('.wallpaper>div>div')

walls.forEach((v, i) => {
    v.addEventListener('click', () => {
        wallpaper.classList.replace('show', 'hide')
        fetch('/getwallpaper', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ wallpaper: i })
        })
    })
})

editplace.addEventListener('click', async () => {
    if (place.classList.contains('hidden')) {
        locationelement.classList.add("hidden")
        place.classList.remove("hidden")
        closeeditplace.classList.remove("hidden")
        locationimg.src = '../src/svg/system/send.svg'
    } else {
        if (place.value) {
            const req = await fetch('/senduserloc', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ loc: place.value })
            })
            const res = await req.text()
            if (res) {

                closeeditplacefun()
                location.reload()
            }
        } else {
            alert("values isnt correct")
        }
    }
})

closeeditplace.addEventListener('click', () => closeeditplacefun())

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




