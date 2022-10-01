const container = document.querySelector('.container');

for (let i = 1; i <= 256; i++) {
    container.innerHTML += `<div class="box${i}"></div>`;
}

const sketchBoxes = document.querySelectorAll('.container > *');


sketchBoxes.forEach(box => box.addEventListener('mouseover', changeColor));
sketchBoxes.forEach(box => box.addEventListener('mousedown', changeColor));
// sketchBoxes.forEach(box => box.addEventListener('mouseo', changeColor));


let mouseDown = false;

container.addEventListener('mousedown', (e) => {
    if (e.type === 'mousedown') {
        mouseDown = true;
        console.log(mouseDown);
    }
});

container.addEventListener('mouseup', (e) => {
    if (e.type === 'mouseup') {
        mouseDown = false;
        console.log(mouseDown);
    }
});

function changeColor() {
    if (mouseDown) {
        this.classList.add('clicked');
    }
}