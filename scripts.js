const container = document.querySelector('#container');
const pixels = document.querySelectorAll('.pixel');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');


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

function reset() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.remove());
    height = parseInt(heightInput.value);
    width = parseInt(widthInput.value);
    createGrid(height, width);
}

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', reset);

let height = parseInt(heightInput.value);
let width = parseInt(widthInput.value);
createGrid(height, width);