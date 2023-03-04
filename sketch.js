document.addEventListener('DOMContentLoaded', function() {
    addSketchDivs(1024);
    addSketchDivListener();
  });


/* function to add (n) divs with class "sketch-div" and append to grid-container div*/
  function addSketchDivs(n) {
    const gridContainer = document.querySelector('.grid-container');
    for (i = 1; i <= n; i++) {  
        const newDiv = document.createElement('div');
        newDiv.classList.add('sketch-div');
        gridContainer.appendChild(newDiv);
    }
}

/* function to attach event listener to each sketch-div */
function addSketchDivListener() {  
const sketchDivs = document.querySelectorAll('.sketch-div');
sketchDivs.forEach(sketchDiv => sketchDiv.addEventListener('mouseover', changeClass))
}

/* function to add "selected" class to sketch-div on mouseover */
function changeClass() {
    this.classList.add('selectedSD');
    console.log("wave");
}

/* add event listener to canvas size btn */
const canvasBTN = document.querySelector('#canvasBTN');
canvasBTN.addEventListener('click', function () {getCanvasSize()})

/*get custom canvas size */
function getCanvasSize () {
  const inputNo = parseInt(prompt('Please enter a number between 1 and 100', 32),10);
  const canvasSize = inputNo ** 2;
  console.log(canvasSize);
  resetCanvasSize(canvasSize);
}

/* function to remove existing sketch-divs and call addSketchDivs
with new CanvasSize */
function resetCanvasSize(newCanvasSize) {
  const gridContainer = document.querySelector('.grid-container');
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild)
  }
  addSketchDivs(newCanvasSize);
  addSketchDivListener();   
}