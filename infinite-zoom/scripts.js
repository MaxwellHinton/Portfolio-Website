// Control variables.
let currentZoom = 1;
const maxZoom = 20; // so Far: about, 1->8. Projects, 8->16. About, 16->20.
const zoomStep = 0.5;
const fadingSpeed = 0.5;
const maxOpacity = 1;

// about page variables
let about_opacity = 1; // starting opacities
const about_threshold = 5; // at what zoom value to start fading

// project variables
let project_scale = 1; // variable to set initial project scale value, will increment by the zoomStep
let project_opacity = 1;
let project_background_opacity = 0;
const project_zoom_maximum = 16;  // Zoom threshold value for when the projects should be completely faded out
const project_zoom_minimum = 8;   // Zoom value for when the projects page will appear
const project_threshold = 10;     // at what zoom value to start fading
let projects_visible = false;

// contact page variables
let contact_scale = 1;
let contact_opacity = 1;
let contact_background_opacity = 0;
const contact_zoom_minimum = 16;
let contact_visible = false;

function calculateAboutOpacity(scale) {
    if (scale > about_threshold) {
        let opacity = maxOpacity - (scale - about_threshold) * fadingSpeed;
        return Math.max(0, opacity);
    }
    return maxOpacity;
}

function calculateProjectOpacity(scale) {
    const initialOpacity = 0.4;
    const quickIncreaseRange = 2; // Define a small range for the quick increase to full opacity

    if (scale >= project_zoom_minimum && scale <= project_zoom_maximum) {
        if (scale < project_zoom_minimum + quickIncreaseRange) {
            // Quickly increase opacity from 0.4 to 1 within the defined range
            let opacity = initialOpacity + ((scale - project_zoom_minimum) / quickIncreaseRange) * (1 - initialOpacity);
            console.log("Quick increase opacity: " + opacity);
            return Math.min(1, opacity);
        } else if (scale >= project_threshold && scale <= project_zoom_maximum) {
            // Start fading out
            let opacity = 1 - ((scale - project_threshold) / (project_zoom_maximum - project_threshold)) * (1 - initialOpacity);
            console.log("fading out opacitity: " + opacity);
            return Math.max(0, opacity);
        }
    }
    return 0;
}

// No need to fade this section as it is the last one.
function calculateContactOpacity(scale) {
    if (scale >= contact_zoom_minimum){
        let opacity = (scale - contact_zoom_minimum) * fadingSpeed;
        return Math.min(1, opacity);
    }
    return 0;
}

function applyZoom(scale, delta) {
    const scale_string = "scale(" + scale + ")";
    let project_scale_string = "scale(" + project_scale + ")";
    let about_scale_string = "scale(" + contact_scale + ")";

    console.log("scale/zoom: " + scale);

    // Calculate opacity for the about section
    about_opacity = calculateAboutOpacity(scale);

    // Calculate opacity for the projects section
    project_opacity = calculateProjectOpacity(scale);

    // Calculate opacity for the contact-me section
    contact_opacity = calculateContactOpacity(scale);

    // Project section scaling
    if (scale >= project_zoom_minimum && scale <= project_zoom_maximum) {

        if(scale < project_zoom_minimum + zoomStep){
            project_scale = 1;
        }

        document.querySelector('.projects_section').style.display = "block";
        document.querySelector('.project_info').style.display = "block";

        if (delta > 0) {
            project_scale -= zoomStep;
        } else if (delta < 0) {
            project_scale += zoomStep;
        }
        console.log("Project scale: " + project_scale);
        project_scale_string = "scale(" + project_scale + ")";
    } else {
        projects_visible = false;
        document.querySelector('.projects_section').style.display = "none";
        document.querySelector('.project_info').style.display = "none";
    }

    // Contact section scaling
    if (scale >= contact_zoom_minimum){

        if(!contact_visible){
            contact_scale = 1;
            contact_visible = true;
        }

        document.querySelector('.contact_section').style.display = "block";
        document.querySelector('.contact_info').style.display = "block";

        if (delta > 0) {
            contact_scale -= zoomStep;
        } else if (delta < 0) {
            contact_scale += zoomStep;
        }
        console.log("Contact scale: " + contact_scale);
        about_scale_string = "scale(" + contact_scale + ")";
    } else {
        contact_visible = false;
        document.querySelector('.contact_section').style.display = "none";
        document.querySelector('.contact_info').style.display = "none";
    }

    // Update transformations and opacities
    document.querySelector('.about_info').style.opacity = about_opacity;
    document.querySelector('.about_info').style.transform = scale_string;

    document.querySelector('.project_info').style.opacity = project_opacity;
    document.querySelector('.project_info').style.transform = project_scale_string;
    
    document.querySelector('.contact_info').style.opacity = contact_opacity;
    document.querySelector('.contact_info').style.transform = about_scale_string;

}

// In this listener function, DeltaY will be returned as -1 if we are zooming in
// and +1 if zooming out.
// The current zoom will never be less than 1 or greater than the maxZoom, enabling a limit on zooming in on the content.
window.addEventListener("wheel", (event) => {
    const delta = Math.sign(event.deltaY);
    if (delta > 0 && currentZoom > 1) {
        currentZoom -= zoomStep;
    } else if (delta < 0 && currentZoom < maxZoom) {
        currentZoom += zoomStep;
    }

    currentZoom = Math.min(maxZoom, Math.max(1, currentZoom));
    console.log("Zoom: " + currentZoom);

    if (currentZoom < maxZoom){
        applyZoom(currentZoom, delta);
    }
});

