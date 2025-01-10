const bigswitch = document.querySelector(".bigswitch")

const sendgrad = async () => {
    fetch('/sendusergrad', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ gradus: bigswitch.checked ? "F" : 'C' })
    })
}

const sendtolocal = () => {
    const userarray = { name: nicknamer.value, location: place.value, gradus: bigswitch.checked ? "F" : 'C' };

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([userarray]));
    } else {
        const users = JSON.parse(localStorage.getItem('users'));

        if (!users.some(user => user.name === userarray.name && user.location === userarray.location)) {
            localStorage.setItem('users', JSON.stringify([...users, userarray]));
        }
    }
}

const sendinfo = async (plc, ncknmr) => {

    fetch('/senduserloc', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ loc: plc })
    })
        .then(() => fetch('/sendusernick', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ nick: ncknmr })
        }))
        .then(() => sendgrad())
        .then(() => location.pathname += 'map')

}



document.addEventListener("DOMContentLoaded", () => {
    const locstr = JSON.parse(localStorage.getItem('users'))
    if (locstr) {
        locstr.forEach(v => {
            users.innerHTML += `<p>${v.name} - ${v.location}</p>`
        })
    } else {
        localstoragediv.style.display = 'none'
    }
    send.addEventListener("click", async () => {

        if (!nicknamer.value) {
            nicknamer.style.boxShadow = '6px 6px 0px 1px rgb(221, 73, 73)'
        } else {
            nicknamer.style.boxShadow = '6px 6px 0px 1px rgb(38, 38, 38)'
        }

        if (!place.value) {
            place.style.boxShadow = '6px 6px 0px 1px rgb(221, 73, 73)'
        } else {
            place.style.boxShadow = '6px 6px 0px 1px rgb(38, 38, 38)'
        }

        place.value && nicknamer.value ? (sendinfo(place.value,nicknamer.value), sendtolocal()) : ''
    })

    skip.addEventListener("click", () => {
        location.pathname += 'map'
        sendgrad()
    })

    const usersp = document.querySelectorAll('#users p');
    console.log(usersp);

    usersp.forEach(v => {
        v.addEventListener('click', (e) => {
           const userarray =  e.target.innerHTML.split('-')
           sendinfo(userarray[1], userarray[0].slice(0, -1))
        });
    });


})
