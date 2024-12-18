const bgmap = document.querySelector('.bgmap');
bgmap.addEventListener('click', function (event) {
    // const rect = bgmap.getBoundingClientRect();
    // const x = event.clientX - rect.left;
    // const y = event.clientY - rect.top;
    // console.log('x: ', x, 'Y: ', y);
});

document.addEventListener("DOMContentLoaded", () => {



    window.addEventListener('resize', () => {
        const marker = document.querySelector('.marker');

        const element = document.querySelector('.bgmap'); // замените '.container' на ваш селектор
        const elementWidth = element.offsetWidth;
        const elementHeight = element.offsetHeight;

        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage.slice(5, -2);

        const image = new Image();
        image.src = backgroundImage;
        const imageWidth = image.width;
        const imageHeight = image.height;

        const elementAspectRatio = elementWidth / elementHeight;
        const imageAspectRatio = imageWidth / imageHeight;

        let scale;
        if (elementAspectRatio > imageAspectRatio) {
            scale = elementWidth / imageWidth;
        } else {
            scale = elementHeight / imageHeight;
        }

        const scaledImageWidth = imageWidth * scale;
        const scaledImageHeight = imageHeight * scale;
        console.log("scaledImageWidth ", scaledImageWidth);
        console.log("elementWidth ", elementWidth);
        console.log("imageWidth ", imageWidth);

        const horizontalOverflow = Math.round((scaledImageWidth - elementWidth) / elementWidth * 100)
        const verticalOverflow = Math.round((scaledImageHeight - elementHeight) / imageHeight * 100)

        console.log(`Horizontal overflow: ${horizontalOverflow}%`);


        marker.style.top = `${40 - verticalOverflow}%`
        marker.style.left = `${40 - horizontalOverflow}%`
    })
})