let weatherarray = []
const filter = document.querySelector(".filter")
const sort = document.querySelector(".sort")
let res
const render = (array) => {
  count.innerHTML = array.length
  catalogitems.innerHTML = ''
  array.forEach((v,i) => {
    const item = document.createElement("div")
    const timespan = document.createElement("span")
    const timeimg = document.createElement("img")
    const time = document.createElement("p")

    timeimg.src = `../src/svg/weather/daystatus/black/${v.daystatuscurrent}.svg`
    time.innerHTML = `${v.current.observationtime} &nbsp |  &nbsp ${v.current.date} (${v.current.day})`
    timespan.append(timeimg, time)

    const temp = document.createElement("p")
    temp.innerHTML = `${v.current.temperature} °${v.location.degreetype}`

    const feelslike = document.createElement("p")
    feelslike.innerHTML = `feels like: ${v.current.feelslike} °${v.location.degreetype}`

    const namespan = document.createElement("span")
    const nameimg = document.createElement("img")
    const name = document.createElement("p")
    nameimg.src = '../src/svg/usercard/blackearth.svg'
    name.innerText = v.current.observationpoint
    namespan.append(nameimg, name)

    const baseinfo = document.createElement("span")

    const skytextspan = document.createElement("span")
    const skytextimg = document.createElement("img")
    const skytext = document.createElement("p")
    skytextimg.src = `../src/svg/weather/skytext/black/${v.current.skytext}.svg`
    skytext.innerHTML = v.current.skytext
    skytextspan.append(skytextimg, skytext)

    const humidityspan = document.createElement("span")
    const humidityimg = document.createElement("img")
    const humidity = document.createElement("p")
    humidityimg.src = `../src/svg/weather/humidity/humidityblack.svg`
    humidity.innerHTML = v.current.humidity
    humidityspan.append(humidityimg, humidity)

    const windspan = document.createElement("span")
    const windimg = document.createElement("img")
    const wind = document.createElement("p")

    windimg.src = `../src/svg/weather/arrows/black/${v.windstatesrc}.svg`
    wind.innerHTML = v.current.winddisplay
    windspan.append(windimg, wind)

    const searchonmap = document.createElement("button")
    searchonmap.innerHTML = 'show on map'

    searchonmap.addEventListener('click', () => 
      window.location = `../map?${'target=' + array[i].current.observationpoint}`
    )


    baseinfo.append(skytextspan, humidityspan, windspan)
    item.append(timespan, temp, feelslike, namespan, baseinfo,searchonmap)
    catalogitems.appendChild(item)
  })
}

const searchfun = async () => {
  catalogitems.innerHTML = '<img src="../src/loading.gif" id="load" alt="">'
  const req = await fetch(`/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: searchtext.value,
      maxtemp: maxtemp.value,
      mintemp: mintemp.value,
      maxfeelstem: maxfeelstem.value,
      minfeelstem: minfeelstem.value,
      maxhumidity: maxhumidity.value,
      minhumidity: minhumidity.value,
      maxwind: maxwind.value,
      minwind: minwind.value,
      weather: weatherarray,
      winddirection: Wind_direction.value
    })
  })
  res = await req.json()
  res.length === 0 ?
    catalogitems.innerHTML = `<span><img src="../src/not-found.png" alt=""><p>Sorry, we didn't find anything</p></span>` :
    render(res)
}

const createallweather = async () => {
  catalogitems.innerHTML = '<img src="../src/loading.gif" id="load" alt="">'
  const req = await fetch("/createallweather")
  res = await req.json()
  render(res)
}

allsearch.addEventListener("click", async () => {
  searchtext.value = ''
  createallweather()
})


document.addEventListener("DOMContentLoaded", async () => {
  createallweather()

  const checkboxes = document.querySelectorAll('input[type="checkbox"]')

  checkboxes.forEach((e) => {
    e.addEventListener("click", () => {
      const name = document.querySelector(`label[for="${e.id}"]`).innerHTML
      if (e.checked) {
        weatherarray.push(name)
      } else {
        weatherarray = weatherarray.filter(v => v != name)
      }
    })
  })

})

searchbutton.addEventListener("click", () => {
  searchfun()
})

accept.addEventListener("click", () => {
  window.scrollTo(0, 0)
  filter.classList.add('hide')
  filter.classList.remove('show')
  searchfun()
})

const closefilters = () => {
  filter.classList.add('hide')
  filter.classList.remove('show')
}

filters.addEventListener("click", () => {
  if (filter.classList.contains('show')) {
    closefilters()
  } else {
    filter.classList.remove('hide')
    filter.classList.add('show')

  }
})

closingfilter.addEventListener("click", () => {
  closefilters()
})

const closesort = () => {
  sort.classList.remove('showsort')
  sort.classList.add('hidesort')
}

sorting.addEventListener("click", () => {
  if (sort.classList.contains('showsort')) {
    closesort()
  } else {
    sort.classList.remove('hidesort')
    sort.classList.add('showsort')
  }
})

closingsort.addEventListener("click", () => closesort())


const sortingfun = (param, asc) => {
  let newres
  sorttext.innerHTML = 'sorted by ' + param
  switch (asc) {
    case true:
      if (param == "observationpoint") {
        newres = res.sort((a, b) => a.current[param].localeCompare(b.current[param]))
      } else {
        newres = res.sort((a, b) => Number(a.current[param]) - Number(b.current[param]))
      }
      break
    case false:
      if (param == "observationpoint") {
        newres = res.sort((a, b) => b.current[param].localeCompare(a.current[param]))
      } else {
        newres = res.sort((a, b) => Number(b.current[param]) - Number(a.current[param]))
      }
      break
  }
  closesort()
  render(newres)
}

document.querySelectorAll(".sort button").forEach((e) => {
  e.addEventListener("click", () => {
    const param = e.classList.contains("name") ? "observationpoint" :
      e.classList.contains("humidity") ? "humidity" :
        e.classList.contains("grad") ? "temperature" :
          e.classList.contains("feelslike") ? "feelslike" :
            e.classList.contains("windspeed") ? "windspeednumber" : ''
    const asc = e.classList.contains("asc") ? true : false
    sortingfun(param, asc)
  })
})