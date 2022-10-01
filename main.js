const container = document.querySelector('.container');

for (let i = 1; i <= 256; i++) {
    container.innerHTML += `<div class="box box${i}"></div>`;
}