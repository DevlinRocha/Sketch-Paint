// DECLARATIONS:
const secretButton = document.querySelector('#secret-button');
const gridSizeLabel = document.querySelector('#grid-size-label');
const gridSizeInput = document.querySelector('#grid-size-input');
const resetButton = document.querySelector('#reset-button');
const container = document.querySelector('#container');
const rainbow = document.querySelectorAll('.rainbow');
const colorButtons = document.querySelectorAll('.color-button');
const customButton = document.querySelector('#custom-button');
const activeClass = document.querySelector('.active');
//const openClass = document.querySelectorAll('.open');
gridSizeLabel.textContent = `Grid size: ${gridSizeInput.value} x ${gridSizeInput.value}`;

let gridSize = gridSizeInput.value;
let color = activeClass.dataset.color;
const colorArray = [];
rainbow.forEach((color) => colorArray.push(color.dataset.color));
let rainbowIndex = 0;

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
    e.stopPropagation();
    const doubleClass = document.querySelector('.double');
    const currentlyActive = document.querySelector('.active');
    if (currentlyActive.dataset.rainbow === 'true') {
        rainbowColor();
    }
    if (e.type === 'mouseover') {
        if (doubleClass) {
            let opacity = Number(this.dataset.opacity);
            if (color === '#FFFFFF' && this.dataset.opacity > 0.1) {
                opacity -= 0.1;
                this.dataset.opacity = opacity;
                this.style.opacity = opacity;
            } else if (this.dataset.color !== color && this.dataset.opacity < 0.5) {
                    this.style.backgroundColor = color;
                    this.setAttribute('data-color', currentlyActive.dataset.color);
                    opacity = 0.1;
                    this.dataset.opacity = opacity;
                    this.style.opacity = opacity;
            } else {
                opacity += 0.2;
                this.style.opacity = opacity;
                this.dataset.opacity = opacity;
            }
        } else {
            this.style.backgroundColor = color;
            this.setAttribute('data-color', currentlyActive.dataset.color);
            if (color === '#FFFFFF') {
                this.style.opacity = 1;
                this.dataset.opacity = 0.1;
            } else {
                this.style.opacity = 1;
                this.dataset.opacity = 1;
            }
        } 
    } else if (e.type === 'touchmove') {
        const element = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (element.classList.contains('pixel')) {
            if (doubleClass) {
                let opacity = Number(element.dataset.opacity);
                if (color === '#FFFFFF' && element.dataset.opacity > 0.1) {
                    opacity -= 0.1;
                    element.dataset.opacity = opacity;
                    element.style.opacity = opacity;
                } else {
                    if (element.dataset.color !== color && element.dataset.opacity < 0.5) {
                        element.style.backgroundColor = color;
                        element.setAttribute('data-color', currentlyActive.dataset.color);
                        opacity = 0.1;
                        element.dataset.opacity = opacity;
                        element.style.opacity = opacity;
                    } else {
                        opacity += 0.1;
                        element.style.opacity = opacity;
                        element.dataset.opacity = opacity;
                    }
                }
            } else {
                element.style.backgroundColor = color;
                element.setAttribute('data-color', currentlyActive.dataset.color);
                if (color === '#FFFFFF') {
                    element.style.opacity = 1;
                    element.dataset.opacity = 0.1;
                } else {
                    element.style.opacity = 1;
                    element.dataset.opacity = 1;
                }
            }
        }
    }
}

function paintBucket() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.style.opacity = 1);
    pixels.forEach((pixel) => pixel.style.backgroundColor = color);
}

function clear() {
    gridSizeLabel.textContent = `Grid size: ${gridSizeInput.value} x ${gridSizeInput.value}`;
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.style.backgroundColor = '');
}

function reset() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.style.backgroundColor = '#FFFFFF');
    pixels.forEach((pixel) => pixel.dataset.opacity = 0.1);
    pixels.forEach((pixel) => pixel.setAttribute('data-color', '#FFFFFF'));
    gridSize = gridSizeInput.value;
    createGrid(gridSize);
}

function changeColor() {
    color = this.dataset.color;
    colorButtons.forEach((colorButton) => colorButton.addEventListener('click', changeColor));
    colorButtons.forEach((colorButton) => colorButton.classList.remove('active'));
    colorButtons.forEach((colorButton) => colorButton.classList.remove('double'));
    colorButtons.forEach((colorButton) => colorButton.removeEventListener('click', toggleDouble));
    this.classList.add('active');
    this.removeEventListener('click', changeColor);
    this.addEventListener('click', toggleDouble);
}


function customColor() {
    this.dataset.color = this.value;
    color = this.dataset.color;
}

function rainbowColor() {
    const currentlyActive = document.querySelector('.active');
    color = colorArray[rainbowIndex];
    currentlyActive.dataset.color = color;
    rainbowIndex++
    if (rainbowIndex >= colorArray.length) {
        rainbowIndex = 0;
    }
}

function toggleDouble() {
    if (this.classList.contains('active')) {
        this.classList.toggle('double');
    }
}

createGrid(gridSize);

// EVENT LISTENERS:
secretButton.addEventListener('click', changeColor);
gridSizeInput.addEventListener('input', clear);
gridSizeInput.addEventListener('change', reset);
resetButton.addEventListener('click', reset);
container.addEventListener('touchmove', draw);
container.addEventListener('dblclick', paintBucket);
colorButtons.forEach((colorButton) => colorButton.addEventListener('click', changeColor));
colorButtons.forEach((colorButton) => colorButton.style.backgroundColor = colorButton.dataset.color);
customButton.addEventListener('input', customColor);
//colorButtons.forEach((activeElement) => activeElement.addEventListener('transitionend', toggleOpen));