// DECLARATIONS:
const gridSizeLabel = document.querySelector('#grid-size-label');
const gridSizeInput = document.querySelector('#grid-size-input');
const resetButton = document.querySelector('#reset-button');
const container = document.querySelector('#container');
const colorButtons = document.querySelectorAll('.color-button');
const customButton = document.querySelector('#custom-button');
//const openClass = document.querySelectorAll('.open');
gridSizeLabel.textContent = `Grid size: ${gridSizeInput.value} x ${gridSizeInput.value}`;
let gridSize = gridSizeInput.value;
let color = 'black';

// FUNCTIONS:
function createGrid(gridSize) {
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let h = 1; h <= gridSize; h++) {
        for (let w = 1; w <= gridSize; w++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel')
            pixel.setAttribute('id', `H${h}W${w}`);
            pixel.addEventListener('mouseover', draw);
            pixel.addEventListener('dblclick', paintBucket);
            container.appendChild(pixel);
        }
    }
}

function draw(e) {
    if (e.type === 'mouseover') {
        this.style.backgroundColor = `${color}`;
    } else if (e.type === 'touchmove') {
        const element = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (element.classList.contains('pixel')) {
            element.style.backgroundColor = `${color}`;
        }
    }
}

function paintBucket() {
    const doubleClass = document.querySelector('.double');
    const pixels = document.querySelectorAll('.pixel');
    if (doubleClass) {
        pixels.forEach((pixel) => pixel.style.backgroundColor = color);
    }
}

function clear() {
    gridSizeLabel.textContent = `Grid size: ${gridSizeInput.value} x ${gridSizeInput.value}`;
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.style.backgroundColor = '');
}

function reset() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.style.backgroundColor = '');
    gridSize = gridSizeInput.value;
    createGrid(gridSize);
}

function changeColor() {
    color = this.dataset.color;
    colorButtons.forEach((colorButton) => colorButton.classList.remove('active'));
    colorButtons.forEach((colorButton) => colorButton.classList.remove('double'));
    this.classList.add('active');
    const activeClass = document.querySelector('.active');
    activeClass.addEventListener('dblclick', toggleDouble);
}

function customColor() {
    this.dataset.color = this.value;
    color = this.dataset.color;
}

function toggleDouble() {
    if (this.classList.contains('active')) {
        this.classList.add('double');
        const doubleClass = document.querySelector('.double');
    }
}

createGrid(gridSize);

// EVENT LISTENERS:
gridSizeInput.addEventListener('input', clear);
gridSizeInput.addEventListener('change', reset);
resetButton.addEventListener('click', reset);
container.addEventListener('touchmove', draw);
colorButtons.forEach((colorButton) => colorButton.addEventListener('click', changeColor));
colorButtons.forEach((colorButton) => colorButton.style.backgroundColor = colorButton.dataset.color);
customButton.addEventListener('input', customColor);
//colorButtons.forEach((activeElement) => activeElement.addEventListener('transitionend', toggleOpen));