const bgmap = document.querySelector('.bgmap');
bgmap.addEventListener('click', function (event) {
    // const rect = bgmap.getBoundingClientRect();
    // const x = event.clientX - rect.left;
    // const y = event.clientY - rect.top;
    // console.log('x: ', x, 'Y: ', y);
});

document.addEventListener("DOMContentLoaded", () => {

    const coordinates = [{ left: '19.5%', top: '39.5%', place: 'Havana, cuba' }, { left: '89%', top: '31%', place: 'Tokyo, Yapan' }, { left: '54.3%', top: '19%', place: 'Minsk, Belarus' }]



    const element = document.querySelector('.bgmap')
    const style = window.getComputedStyle(element);
    const container = document.querySelector('.bgmap');



    for (let i = 0; i < 3; i++) {
        const img = document.createElement('img');
        img.style.left = coordinates[i].left
        img.style.top = coordinates[i].top
        img.src = '../src/svg/mapmarker.svg';
        img.classList.add("marker")
        container.appendChild(img);
    }

    const overlays = document.querySelectorAll('.marker');

    window.addEventListener('resize', () => {

        let horizontalOverflow, verticalOverflow;
        const backgroundImage = style.backgroundImage.slice(5, -2);

        const image = new Image();
        image.src = backgroundImage;
        image.onload = () => {
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const imageWidth = image.width;
            const imageHeight = image.height;

            const containerAspectRatio = containerWidth / containerHeight;
            const imageAspectRatio = imageWidth / imageHeight;

            if (containerAspectRatio > imageAspectRatio) {
                const scaledImageHeight = containerWidth / imageAspectRatio;
                verticalOverflow = (scaledImageHeight - containerHeight) / scaledImageHeight * 100;
                horizontalOverflow = 0;
            } else {
                const scaledImageWidth = containerHeight * imageAspectRatio;
                horizontalOverflow = (scaledImageWidth - containerWidth) / scaledImageWidth * 100;
                verticalOverflow = 0;
            }
            overlays.forEach((v, i) => {
                console.log(horizontalOverflow);

                v.style.left = `${Number((coordinates[i].left).slice(0, -1)) - horizontalOverflow / 2}%`
                v.style.top = `${Number((coordinates[i].top).slice(0, -1)) - verticalOverflow / 2}%`
            })
        };
    })
})
