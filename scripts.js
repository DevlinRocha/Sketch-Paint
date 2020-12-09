const container = document.querySelector('#container');
const heightInput = document.querySelector('#height-input');
const widthInput = document.querySelector('#width-input');

function createGrid(height, width) {
    container.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

    for (let h = 1; h <= height; h++) {
        for (let w = 1; w <= width; w++) {
            let gridItem = document.createElement('div');
            gridItem.classList.add('pixel')
            gridItem.setAttribute('id', `H${h}W${w}`);
            gridItem.addEventListener('mouseover', draw);
            container.appendChild(gridItem);
        }
    }
}

function draw() {
    this.style.backgroundColor = 'red';
}

function link() {
    linkButton.classList.toggle('linked');
    heightInput.classList.toggle('linked');
    widthInput.classList.toggle('linked');
    const linked = document.querySelectorAll('.linked');
    linked.forEach((link) => link.addEventListener('change', changeBoth))
}

function reset() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.remove());
    height = heightInput.value;
    width = widthInput.value;
    createGrid(height, width);
}

function changeBoth(e) {
    heightInput.value = this.value;
    widthInput.value = this.value;
}

const linkButton = document.querySelector('#link-button');
linkButton.addEventListener('click', link);

const linked = document.querySelectorAll('.linked');
linked.forEach((link) => link.addEventListener('change', changeBoth))

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', reset);

let height = heightInput.value;
let width = widthInput.value;
createGrid(height, width);