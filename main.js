const container = document.querySelector('.container');

for (let i = 1; i <= 16; i++) {
    container.innerHTML += `<div class="box box${i}"></div>`;
}