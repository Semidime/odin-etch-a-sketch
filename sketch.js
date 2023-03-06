addSketchDivs(25);
addColorPaletteListener();
addCanvasListener();
let brushColor = "";    


/* function to add (n) divs with class "sketch-div", append to grid-container div and attach
event listener to each sketchDiv*/
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

  const sketchDivs = document.querySelectorAll('.sketch-div');
  sketchDivs.forEach(sketchDiv => sketchDiv.addEventListener('mouseover', changeColor))
}

/* add event listener to canvas size btn */
function addCanvasListener() {
  const canvasBtn = document.querySelector('#canvasBTN');
  canvasBtn.addEventListener('click', setCanvasSize)
}

/* add event listener to palette */
function addColorPaletteListener() {
  const colorDivs = document.querySelectorAll('.color-div');
  colorDivs.forEach(colorDiv => colorDiv.addEventListener('click',setBrushColor))

  const randBtn = document.querySelector('#rand-col');
  randBtn.addEventListener('click',setRandomBrushColor)
}


/* function to control behaviour on sketchDiv mouseover 
calls selected functions and passes sketchDiv id as an argument*/
function changeColor() {
  console.log(this);
  console.log(this.id);
  
  assignOpacity(this.id);
  assignRandomColor(this.id);
/*   assignClass(this.id); */
}
/* function to add "selectedSD" class to sketchDiv on mouseover */
function assignClass(sdID) {
    const sketchDiv = document.querySelector(`#${sdID}`)
    sketchDiv.classList.add('selectedSD');
}

/* randomly assign RGB on first mouseover 
remove if statement to change RGB on every mousover*/
function assignRandomColor(sdID) {
  const sketchDiv = document.querySelector(`#${sdID}`)
  
  if (sketchDiv.style.backgroundColor === "") {
    const R = parseInt(Math.floor(Math.random()*256),10);
    const G = parseInt(Math.floor(Math.random()*256),10);
    const B = parseInt(Math.floor(Math.random()*256),10);
    sketchDiv.style.backgroundColor=`rgb(${R},${G},${B})`;
  }
  console.log(sketchDiv.style.backgroundColor);
}
 
/* function to check if opacity has been assigned, if not assign an initial value
if value already assigned increment value on each subsequent mouseover*/
function assignOpacity(sdID) {
  const sketchDiv = document.querySelector(`#${sdID}`)

  if (sketchDiv.style.opacity === "") {
    sketchDiv.style.opacity = 0.25;
  } else if (parseFloat(sketchDiv.style.opacity) > 0 && parseFloat(sketchDiv.style.opacity) < 1) {
    const oldOpacity = parseFloat(sketchDiv.style.opacity);
    const newOpacity = oldOpacity + 0.25;
    console.log(oldOpacity);
    console.log(newOpacity);
    sketchDiv.style.opacity = newOpacity;
  }
  console.log(sketchDiv.style.opacity);
}


/* setBrushColor function */
function setBrushColor() {
  console.log(this);
  console.log(this.id);
  
  brushColor = this.style.backgroundColor
  console.log(brushColor)

}

/* setRandomBrushColor function */
function setRandomBrushColor() {
  console.log(this);
  console.log(this.id);

  const R = parseInt(Math.floor(Math.random()*256),10);
  const G = parseInt(Math.floor(Math.random()*256),10);
  const B = parseInt(Math.floor(Math.random()*256),10);
  brushColor=`rgb(${R},${G},${B})`;
  
  console.log(brushColor)
}


/*set custom canvas size */
function setCanvasSize () {
  const gridContainer = document.querySelector('.grid-container');
  let inputNo = parseInt(prompt('Please enter a number between 1 and 100', 5),10);
  if (inputNo > 100) {inputNo = 100};
  if (inputNo < 1) {inputNo = 1};
  const canvasSize = inputNo ** 2;
 
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild)
  }
  
  gridContainer.style.gridTemplateRows = `repeat(${inputNo}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${inputNo}, 1fr)`;
  
  addSketchDivs(canvasSize);
}