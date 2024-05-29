// script.js


// Infinite zoom script.

let currentZoomLevel = 1;
const zoomStep = 0.1;
const zoomContainer = document.querySelector('.zoom-container');
const zoomContents = document.querySelectorAll('.zoom-content');

window.addEventListener('wheel', (event) => {
    event.preventDefault();

    if (event.deltaY < 0) {
        // Zooming in
        currentZoomLevel += zoomStep;
        console.log(currentZoomLevel);
    } else {
        // Zooming out
        currentZoomLevel = Math.max(currentZoomLevel - zoomStep, 1);
        console.log(currentZoomLevel);
    }

    zoomContents.forEach((content, index) => {
        const relativeZoomLevel = currentZoomLevel - 1 - index;
        const scale = Math.pow(1.2, relativeZoomLevel);
        content.style.transform = `scale(${scale})`;

        // Calculate opacity based on zoom level
        const midwayPoint = index + 0.5;
        if (currentZoomLevel > midwayPoint) {
            const fadeAmount = (currentZoomLevel - midwayPoint) / 0.5;
            content.style.opacity = Math.max(1 - fadeAmount, 0);
            content.style.transform += ` translateY(${-50 * fadeAmount}%)`;
        } else if (currentZoomLevel < midwayPoint - 0.5) {
            const fadeAmount = (midwayPoint - currentZoomLevel) / 0.5;
            content.style.opacity = Math.max(1 - fadeAmount, 0);
            content.style.transform += ` translateY(${50 * fadeAmount}%)`;
        } else {
            content.style.opacity = 1;
            content.style.transform += ` translateY(0)`;
        }
    });
}, {passive : false});



