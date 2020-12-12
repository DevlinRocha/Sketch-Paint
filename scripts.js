const container = document.querySelector('#container');
//const inputs = document.querySelector('#inputs');
const gridDimensions = document.querySelectorAll('.grid-dimensions');
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
            gridItem.addEventListener('touchmove', draw);
            container.appendChild(gridItem);
        }
    }
}

function draw(e) {
    if (e.type === 'mouseover') {
        this.style.backgroundColor = `${color}`;
    }
    if (e.type === 'touchmove') {
        const element = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (element.classList.contains('pixel')) {
            element.style.backgroundColor = `${color}`;
        }
    }
}

function link() {
    linkButton.classList.toggle('linked');
    gridDimensions.forEach((dimension) => {
        dimension.classList.toggle('linked');
        if(dimension.classList.contains('linked')) {
            dimension.addEventListener('change', changeBoth)
        } else {
            dimension.removeEventListener('change', changeBoth)
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
    colorButtons.forEach((colorButton) => colorButton.style.backgroundColor = '');
    colorButtons.forEach((colorButton) => colorButton.style.flex = 1);
    this.style.backgroundColor = this.dataset.color;
    this.style.flex = 2;
}

let color = 'black';
const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach((colorButton) => colorButton.addEventListener('click', changeColor));

const linkButton = document.querySelector('#link-button');
linkButton.addEventListener('click', link);

const linked = document.querySelectorAll('.linked');
linked.forEach((link) => link.addEventListener('change', changeBoth))

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', reset);

let height = heightInput.value;
let width = widthInput.value;
createGrid(height, width);