const bigswitch = document.querySelector(".bigswitch")
const sendinfo = async () => {
    location.pathname += 'map'
    console.log('location')
    fetch('/senduserloc', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ loc: place.value })
    })
    console.log('nick is writed')
    fetch('/sendusernick', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ nick: nicknamer.value })
    })

    console.log('grad')
    fetch('/sendusergrad', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ gradus: bigswitch.checked ? "F" : 'C' })
    })
}
document.addEventListener("DOMContentLoaded", () => {

    send.addEventListener("click", async () => {

        if (!nicknamer.value) {
            nicknamer.style.boxShadow = '6px 6px 0px 1px rgb(221, 73, 73)';
        } else {
            nicknamer.style.boxShadow = '6px 6px 0px 1px rgb(38, 38, 38)';
        }

        if (!place.value) {
            place.style.boxShadow = '6px 6px 0px 1px rgb(221, 73, 73)';
        } else {
            place.style.boxShadow = '6px 6px 0px 1px rgb(38, 38, 38)';
        }

        place.value && nicknamer.value ? sendinfo() : ''
    });

    skip.addEventListener("click", () => {
        location.pathname += 'map'
    })

})
