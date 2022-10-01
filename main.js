const container = document.querySelector('.container');

const gridsize = '';

for (let i = 1; i <= 256; i++) {
    container.innerHTML += `<div class="box${i}"></div>`;
}

const sketchBoxes = document.querySelectorAll('.container > *');


sketchBoxes.forEach(box => box.addEventListener('mouseover', changeColor));
sketchBoxes.forEach(box => box.addEventListener('mousedown', changeColor));


let mouseDown = false;

// mousedown event
container.addEventListener('mousedown', checkMouse);
// mouseup event
container.addEventListener('mouseup', checkMouse);


// adds clicked class to style hovered box
function changeColor() {
    if (mouseDown) {
        this.classList.add('clicked');
    }
}
// checks if the mouse is held down on the container 
// and assigns true to the mouseDown variable

// checks if the mouse is not held down on the container and 
// assigns false to the mouseDown variable
function checkMouse(e) {
    if (e.type === 'mousedown') {
        mouseDown = true;
    } else if (e.type === 'mouseup') {
        mouseDown = false;
    }
}