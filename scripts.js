const container = document.querySelector('#container');

function createGrid(height, width) {
    container.style.gridTemplateColumns = `repeat(${height}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${width}, 1fr)`;

    for (let h = 1; h <= height; h++) {
        for (let w = 1; w <= width; w++) {
            let gridItem = document.createElement('div');
            gridItem.textContent = 'X';
            gridItem.classList.toggle('pixel')
            gridItem.setAttribute('id', `H${h}W${w}`);
            container.appendChild(gridItem);
            
        }
        //gridItem.style.gridArea = h;
        //gridItem.textContent = h;
    }

    //for (let w = 1; w <= width; w++) {
    //    let gridItem = document.createElement('div');
    //    gridItem.style.gridArea = w;
    //    gridItem.textContent = w;
    //    container.appendChild(gridItem);
    //}
}

function draw(e) {
    this.style.backgroundColor = 'red';
    //console.log(e);
}

createGrid(16, 16);

const pixels = document.querySelectorAll('.pixel');
pixels.forEach((pixel) => pixel.addEventListener('mouseover', draw));