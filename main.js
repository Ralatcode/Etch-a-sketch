const container = document.querySelector('.container');
const styleMode = document.querySelectorAll('.mode');
const gridsize = document.querySelectorAll('.grid-size');
const customGrid = document.querySelector('#custom');
const eraser = document.getElementById('eraser');
const colorType = document.querySelectorAll('.mode');
const colorPicker = document.querySelector('#color-picker');
const colorScheme = document.querySelectorAll('.clicked');
const clearBtn = document.getElementById('clear');


let currentGrid = 16;
let currentMode = '';

generateGridDiv(currentGrid);

// color mode
colorType.forEach(type => {
    type.addEventListener('click', handleClick);
})
// grid-switch
gridsize.forEach(colorMode => colorMode.addEventListener('click', switchGridSize));

// custom grid 
customGrid.addEventListener('input', switchGridSize);

// clearbtn
clearBtn.addEventListener('click', clear);
// eraser 
let eraserState = false;

eraser.addEventListener('click', toggleEraser);

function toggleEraser() {
    eraserState = !eraserState;
    if (eraserState === true) {
        eraser.classList.add('on');
        erase();
    } else {
        eraser.classList.remove('on');
        draw();
    }
}

// color picker 
let colorValue ="";

colorPicker.addEventListener('change', (e) => {
    colorValue = e.target.value;
    console.log(colorValue);
})


let mouseDown = false;


// mousedown event
container.addEventListener('mousedown', checkMouse);
// mouseup event
container.addEventListener('mouseup', checkMouse);


// adds clicked class to style hovered box
function changeColor() {
    if (mouseDown) {
        this.classList.add('clicked');
        if (currentMode === 'rgb-mode') {
            let colorH = Math.floor(Math.random() *359);
            let colorS = Math.floor(Math.random() *40) +60;
            let colorL = Math.floor(Math.random() *15) +7;
            this.style.setProperty('--colorBG', `hsl(${colorH}, ${colorS}%, ${colorL}%)`);
        } else if (currentMode === 'color-mode') {
            this.style.backgroundColor = colorValue;
        }
    }
}

function removeColor() {
    if (mouseDown) {
        this.classList.remove('clicked');
        this.style.backgroundColor = 'transparent';
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
        customGrid.classList.remove('current');

        if (e.target.value == colorMode.value) {
            colorMode.classList.add('current');
            currentGrid = parseInt(colorMode.value);
            container.style.gridTemplateColumns = `repeat(${currentGrid},1fr`;
            generateGridDiv(currentGrid);
        } else if (e.target.value == customGrid.value) {
            customGrid.classList.add('current');
            currentGrid = parseInt(customGrid.value);
            container.style.gridTemplateColumns = `repeat(${currentGrid},1fr`;
            generateGridDiv(currentGrid);
        }
    });
}

function handleClick(e) {
    colorType.forEach(type => {
        type.classList.remove('active');

        if (e.target.id == type.id) {
        type.classList.add('active');
        currentMode = type.id;
        }

        if (currentMode === 'rgb-mode') {
            let colorH = Math.floor(Math.random() *359);
            let colorS = Math.floor(Math.random() *40) +60;
            let colorL = Math.floor(Math.random() *15) +7;
        }
    })
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

function clear() {
    const sketchBoxes = document.querySelectorAll('.grid-box');
    sketchBoxes.forEach(box => {
        box.classList.remove('clicked');
    })
}