const container = document.querySelector('.container');
const styleMode = document.querySelectorAll('.mode');
const gridsize = document.querySelectorAll('.grid-size');
const eraser = document.getElementById('eraser');


let currentGrid = 16;

generateGridDiv(currentGrid);

// color mode
gridsize.forEach(colorMode => colorMode.addEventListener('click', switchGridSize));

// eraser 
let eraserState = false;

eraser.addEventListener('click', toggleEraser);

function toggleEraser() {
    eraserState = !eraserState;
    console.log(eraserState);
    if (eraserState === true) {
        eraser.classList.add('on');
        erase();
    } else {
        eraser.classList.remove('on');
        draw();
    }
}


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

function removeColor() {
    if (mouseDown) {
        this.classList.remove('clicked');
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


function switchGridSize(e) {
    gridsize.forEach(colorMode => {
        colorMode.classList.remove('current');

        if (e.target.value == colorMode.value) {
            colorMode.classList.add('current');
            currentGrid = parseInt(colorMode.value);
            container.style.gridTemplateColumns = `repeat(${currentGrid},1fr`;
            generateGridDiv(currentGrid);
        }
    });
}

function generateGridDiv(currentGrid) {
    const gridLayout = currentGrid ** 2;
    container.innerHTML = '';

    for (let i = 1; i <= gridLayout; i++) {
        const square = document.createElement('div');
        square.classList.add(`grid-box`);
        square.classList.add(`box${i}`);
        container.appendChild(square);
    }

    draw();
}

function draw() {
    const sketchBoxes = document.querySelectorAll('.grid-box');

    // sketchbox
    sketchBoxes.forEach(box => box.addEventListener('mouseover', changeColor));
    sketchBoxes.forEach(box => box.addEventListener('mousedown', changeColor));
}

function erase() {
    const sketchBoxes = document.querySelectorAll('.grid-box');

    sketchBoxes.forEach(box => box.addEventListener('mouseover', removeColor));
    sketchBoxes.forEach(box => box.addEventListener('mousedown', removeColor));    
}