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
gridSizeLabel.textContent = `${gridSizeInput.value} x ${gridSizeInput.value}`;

let gridSize = gridSizeInput.value;
let color = activeClass.dataset.color;
const colorArray = [];
rainbow.forEach((color) => colorArray.push(color.dataset.color));
let rainbowIndex = 0;

// FUNCTIONS:
function createGrid() {
    const pixels = document.querySelectorAll('.pixel');
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    for (let h = 1; h <= gridSize; h++) {
        for (let w = 1; w <= gridSize; w++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel')
            //pixel.setAttribute('id', `H${h}W${w}`);
            pixel.style.backgroundColor = '#FFFFFF';
            pixel.style.opacity = 0.1;
            pixel.dataset.color = '#FFFFFF';
            pixel.dataset.opacity = 0.1;
            container.appendChild(pixel);
        }
    }
    gridSizeInput.addEventListener('input', clear, { once: true });
}

function draw(e) {
    //e.stopPropagation();
    const doubleClass = document.querySelector('.double');
    const currentlyActive = document.querySelector('.active');
    if (e.target.classList.contains('pixel')) {
        if (currentlyActive.dataset.rainbow === 'true') {
            rainbowColor();
        }
        if (e.type === 'mouseover') {
            if (doubleClass) {
                let opacity = Number(e.target.dataset.opacity);
                if (color === '#FFFFFF' && e.target.dataset.opacity > 0.1) {
                    opacity -= 0.1;
                    e.target.dataset.opacity = opacity;
                    e.target.style.opacity = opacity;
                } else if (e.target.dataset.color !== color && e.target.dataset.opacity < 0.5) {
                    e.target.style.backgroundColor = color;
                    e.target.setAttribute('data-color', currentlyActive.dataset.color);
                    opacity = 0.1;
                    e.target.dataset.opacity = opacity;
                    e.target.style.opacity = opacity;
                }else if (e.target.dataset.color !== color && e.target.dataset.opacity >= 0.5) {
                    return;
                } else {
                    opacity += 0.2;
                    e.target.style.opacity = opacity;
                    e.target.dataset.opacity = opacity;
                }
            } else {
                e.target.style.backgroundColor = color;
                e.target.setAttribute('data-color', currentlyActive.dataset.color);
                if (color === '#FFFFFF') {
                    e.target.style.opacity = 1;
                    e.target.dataset.opacity = 0.1;
                } else {
                    e.target.style.opacity = 1;
                    e.target.dataset.opacity = 1;
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
}

function paintBucket() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.style.opacity = 1);
    pixels.forEach((pixel) => pixel.style.backgroundColor = color);
}

function changeGridSizeLabel() {
    gridSizeLabel.textContent = `${gridSizeInput.value} x ${gridSizeInput.value}`;
    gridSize = gridSizeInput.value;
}

function clear() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.style.backgroundColor = '#FFFFFF')
    setTimeout(() => {
        pixels.forEach((pixel) => pixel.remove());
    }, 500);
};

function reset() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.style.backgroundColor = '#FFFFFF')
    pixels.forEach((pixel) => pixel.remove());
    gridSize = gridSizeInput.value;
    createGrid(gridSize);
};

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
gridSizeInput.addEventListener('input', changeGridSizeLabel);
gridSizeInput.addEventListener('change', createGrid);
resetButton.addEventListener('click', reset);
container.addEventListener('mouseover', draw);
container.addEventListener('dblclick', paintBucket);
container.addEventListener('touchmove', draw);
container.addEventListener('dblclick', paintBucket);
colorButtons.forEach((colorButton) => colorButton.addEventListener('click', changeColor));
colorButtons.forEach((colorButton) => colorButton.style.backgroundColor = colorButton.dataset.color);
customButton.addEventListener('input', customColor);
//colorButtons.forEach((activeElement) => activeElement.addEventListener('transitionend', toggleOpen));