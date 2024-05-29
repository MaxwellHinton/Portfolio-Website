

// Control variables.
let currentZoom = 1;
const maxZoom = 10;
const zoomStep = 0.3;
const fadingSpeed = 0.3;
let project_scale = 1; //variable to set initial project scale value, will increment by the zoomStep.

function applyZoom(scale, delta){

    const que_project_info = 4; // When to queue div entry
    const about_threshold = 2;
    const project_info_threshold = 8;
    const maxOpacity = 1;
    const scale_string = "scale(" + scale + ")";
    let project_scale_string = "scale(" + project_scale + ")";
    
    let about_opacity = 1; //starting opacities
    let project_opacity = 0;
    
    // Calculate opacity for the about section
    // This is when the about section begins to fade.
    if(scale > about_threshold){
        about_opacity = maxOpacity - (scale - about_threshold) * fadingSpeed;
        about_opacity = Math.max(0, about_opacity);
    }
    
    // this is when the project div begins to fade in.
    if(scale >= que_project_info && scale <= project_info_threshold){ // Means it is time to bring in the next div
        project_opacity = (scale - que_project_info) * fadingSpeed;
        project_opacity = Math.min(maxOpacity, project_opacity);

        if(delta > 0 && currentZoom > que_project_info){
            project_scale -= zoomStep;
        }
        else if(delta < 0 && currentZoom < maxZoom){
            project_scale += zoomStep;
        }
        project_scale_string = "scale(" + project_scale + ")";
        
        document.querySelector('.projects_section').style.display = "block";
        document.querySelector('.project_info').style.opacity = project_opacity;
        document.querySelector('.project_info').style.transform = project_scale_string;
    }
    else if(scale < que_project_info){
        document.querySelector('.projects_section').style.display = "none";
    }
    else{
        document.querySelector('.projects_section').style.display = "none";
    }


    document.querySelector('.about_info').style.opacity = about_opacity;
    
    // Sets visibility to true

    document.querySelector('.about_info').style.transform = scale_string;
    console.log("DEFAULT SCALE BEFORE TRANSFORMING: ", project_scale);

}

// In this listener function, DeltaY will be returned as -1 if we are zooming in.
// and +1 if zooming out.
// The current zoom will never be less than 1 or greater than the maxZoom. enabling a limit on zooming in on the content.
window.addEventListener("wheel", (event) => {
    const delta = Math.sign(event.deltaY);
    if(delta > 0 && currentZoom > 1){
        currentZoom -= zoomStep;
    }
    else if(delta < 0 && currentZoom < maxZoom){
        currentZoom += zoomStep;
    }

    currentZoom = Math.min(maxZoom, Math.max(1, currentZoom));
    console.log("Zoom: " + currentZoom);
    applyZoom(currentZoom, delta);
});