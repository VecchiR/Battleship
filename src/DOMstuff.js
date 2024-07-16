export function initializeGrid(gridContainer) {

    for (let i = 0; i < 100; i++) {
        const sqrDiv = document.createElement('div');
        sqrDiv.className = 'cell';
        gridContainer.appendChild(sqrDiv);

        // sqrDiv.addEventListener('mouseenter', () => {
        //     if (randomColorMode) {
        //         let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        //         sqrDiv.style.backgroundColor = randomColor;
        //     }

        //     else {
        //         if (progressiveDarkeningMode === true && !sqrDiv.style.backgroundColor) {
        //             sqrDiv.style.backgroundColor = "#909090";
        //         }

        //         else if (progressiveDarkeningMode === true && sqrDiv.style.backgroundColor) {
        //             let newColor = updateColor(sqrDiv.style.backgroundColor);
        //             sqrDiv.style.backgroundColor = newColor;
        //         }

        //         else {
        //             sqrDiv.style.backgroundColor = 'black';
        //         }
        //     }
        // })
    }
}