send.addEventListener("click", async () => {
    const t = { nick: nick.value, place: place.value };


    const req = await fetch('../senduserdata', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(t)
    })
    const res = await req.json()
    console.log(res.ans);
    
   res.ans ? window.location += '../map' : alert("введите корректные данные")
});

