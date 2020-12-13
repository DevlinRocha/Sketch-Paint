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
let color = '#000000';

// FUNCTIONS:
function createGrid(gridSize) {
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let h = 1; h <= gridSize; h++) {
        for (let w = 1; w <= gridSize; w++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel')
            pixel.setAttribute('id', `H${h}W${w}`);
            pixel.setAttribute('data-opacity', 0.1);
            pixel.addEventListener('mouseover', draw);
            pixel.addEventListener('dblclick', paintBucket);
            container.appendChild(pixel);
        }
    }
}

function draw(e) {
    const doubleClass = document.querySelector('.double');
    if (e.type === 'mouseover') {
        this.style.backgroundColor = `${color}`;
        if (doubleClass) {
            let opacity = Number(this.dataset.opacity);
            this.style.opacity = opacity;
            opacity += 0.1;
            this.dataset.opacity = opacity;
        } else {
            this.style.opacity = 1;
        }
    } else if (e.type === 'touchmove') {
        const element = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (doubleClass) {
            let opacity = Number(element.dataset.opacity);
            element.style.opacity = opacity;
            opacity += 0.1;
            element.dataset.opacity = opacity;
        } else {
            if (element.classList.contains('pixel')) {
                element.style.backgroundColor = `${color}`;
            }
        }
    }
}

function paintBucket() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.style.backgroundColor = color);
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
    colorButtons.forEach((colorButton) => colorButton.addEventListener('click', changeColor));
    colorButtons.forEach((colorButton) => colorButton.classList.remove('active'));
    colorButtons.forEach((colorButton) => colorButton.classList.remove('double'));
    colorButtons.forEach((colorButton) => colorButton.removeEventListener('click', toggleDouble));
    this.removeEventListener('click', changeColor);
    this.classList.add('active');
    this.addEventListener('click', toggleDouble);
}

function customColor() {
    this.dataset.color = this.value;
    color = this.dataset.color;
}

function toggleDouble() {
    if (this.classList.contains('active')) {
        this.classList.toggle('double');
        const doubleClass = document.querySelector('.double');
    }
}

createGrid(gridSize);

// EVENT LISTENERS:
gridSizeInput.addEventListener('input', clear);
gridSizeInput.addEventListener('change', reset);
resetButton.addEventListener('click', reset);
container.addEventListener('touchmove', draw);
container.addEventListener('dblclick', paintBucket);
colorButtons.forEach((colorButton) => colorButton.addEventListener('click', changeColor));
colorButtons.forEach((colorButton) => colorButton.style.backgroundColor = colorButton.dataset.color);
customButton.addEventListener('input', customColor);
//colorButtons.forEach((activeElement) => activeElement.addEventListener('transitionend', toggleOpen));