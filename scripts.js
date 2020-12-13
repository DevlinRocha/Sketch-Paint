const container = document.querySelector('#container');
const gridDimensions = document.querySelectorAll('.grid-dimensions');
const heightInput = document.querySelector('#height-input');
const widthInput = document.querySelector('#width-input');

function createGrid(height, width) {
    container.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

    for (let h = 1; h <= height; h++) {
        for (let w = 1; w <= width; w++) {
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

function link() {
    linkButton.classList.toggle('linked');
    gridDimensions.forEach((dimension) => {
        dimension.classList.toggle('linked');
        if (dimension.classList.contains('linked')) {
            dimension.addEventListener('input', changeBoth)
        } else {
            dimension.removeEventListener('input', changeBoth)
        }
    })
};

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

container.addEventListener('touchmove', draw);

let color = 'black';
const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach((colorButton) => colorButton.addEventListener('click', changeColor));
colorButtons.forEach((colorButton) => colorButton.style.backgroundColor = colorButton.dataset.color);
const customButton = document.querySelector('#custom-button');
customButton.addEventListener('input', customColor);

const linkButton = document.querySelector('#link-button');
linkButton.addEventListener('click', link);

const linked = document.querySelectorAll('.linked');
linked.forEach((link) => link.addEventListener('input', changeBoth))

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', reset);

let height = heightInput.value;
let width = widthInput.value;
createGrid(height, width);


const openClass = document.querySelectorAll('.open');
//colorButtons.forEach((activeElement) => activeElement.addEventListener('transitionend', toggleOpen));