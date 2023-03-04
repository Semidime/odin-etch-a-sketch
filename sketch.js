document.addEventListener('DOMContentLoaded', function() {
    addSketchDivs(25);
    addSketchDivListener();
  });


/* function to add (n) divs with class "sketch-div" and append to grid-container div*/
function addSketchDivs(n) {
  const gridContainer = document.querySelector('.grid-container');
  let idCounter = 1;
  for (i = 1; i <= n; i++) {  
    const newDiv = document.createElement('div');
    console.log(idCounter);
    newDiv.classList.add('sketch-div');
    newDiv.id = `SD${idCounter}`;
    gridContainer.appendChild(newDiv);
    idCounter = idCounter + 1;    
  }
}

/* function to attach event listener to each sketch-div */
function addSketchDivListener() {  
const sketchDivs = document.querySelectorAll('.sketch-div');
sketchDivs.forEach(sketchDiv => sketchDiv.addEventListener('mouseover', randomRGB))
}

/* function to add "selected" class to sketch-div on mouseover */
/* function changeClass() {
    this.classList.add('selectedSD');
    console.log("wave");
} */

/* randomly change RGB on mouseover */
function randomRGB() {
  console.log("wave");
  console.log(this);
  console.log(this.id);
  const R = parseInt((Math.floor(Math.random()*255)+1),10);
  const G = parseInt((Math.floor(Math.random()*255)+1),10);
  const B = parseInt(Math.floor((Math.random()*255)+1),10);
  this.style.backgroundColor=`rgb(${R},${G},${B})`;
  console.log(this.style.backgroundColor);
}

/* add 10% black to sketchDiv on mouseover */
/* function fadeBlack() {
 
} */

/* add event listener to canvas size btn */
const canvasBTN = document.querySelector('#canvasBTN');
canvasBTN.addEventListener('click', function () {setCanvasSize()})

/*set custom canvas size */
function setCanvasSize () {
  const gridContainer = document.querySelector('.grid-container');
  const inputNo = parseInt(prompt('Please enter a number between 1 and 100', 32),10);
  const canvasSize = inputNo ** 2;
 
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild)
  }
  
  gridContainer.style.gridTemplateRows = `repeat(${inputNo}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${inputNo}, 1fr)`;
  
  addSketchDivs(canvasSize);
  addSketchDivListener();   
}