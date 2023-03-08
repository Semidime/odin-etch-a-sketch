addSketchDivs(720);
addColorPaletteListener();
addCanvasListener();
let brushColor = 'rgb(0, 0, 0)';    

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
  sketchDivs.forEach(sketchDiv => sketchDiv.addEventListener('mouseover', assignBGColor))
}

/* add event listener to canvas size btn */
function addCanvasListener() {
  const canvasBtn = document.querySelector('#canvasBTN');
  canvasBtn.addEventListener('click', setCanvasSize)
}

/* add event listeners to palette */
function addColorPaletteListener() {
  const colorDivs = document.querySelectorAll('.color-div');
  colorDivs.forEach(colorDiv => colorDiv.addEventListener('click',setBrushColor));

  const randBtn = document.querySelector('#rand-col');
  randBtn.addEventListener('click',setRandomBrushColor);

  const rainbowBtn = document.querySelector('#rainbow');
  rainbowBtn.addEventListener('click',selectRainbowBrush);
}

/* assignColor function - called on sketchDiv mouseover*/
function assignBGColor() {
  console.log(this);
  console.log(this.id);
  const sketchDiv = document.querySelector(`#${this.id}`);
  
  /* if "rainbow" selected, set background color to change to random color
  on each mouseover */

  if (brushColor === 'rainbow') {
    const R = parseInt(Math.floor(Math.random()*256),10);
    const G = parseInt(Math.floor(Math.random()*256),10);
    const B = parseInt(Math.floor(Math.random()*256),10);
    sketchDiv.style.backgroundColor=`rgb(${R},${G},${B})`;

  } else {

    /* set opacity */
    if(sketchDiv.style.backgroundColor!=brushColor) {
      sketchDiv.style.opacity = 0.5;
    } else if (parseFloat(sketchDiv.style.opacity) < 1) {
      sketchDiv.style.opacity = parseFloat(sketchDiv.style.opacity) + 0.5;
    } 

    /* set backgroundColor */
    sketchDiv.style.backgroundColor=brushColor;
  }
  console.log(sketchDiv.style.backgroundColor);
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
  brushColor=`rgb(${R}, ${G}, ${B})`;
  
  console.log(brushColor)

  setRandomBrushBG(R,G,B);                                                                                                                                                                                                                                               
}

/* set background color of "Surprise Me" option */
function setRandomBrushBG(R,G,B) {

  const randBtn = document.querySelector('#rand-col');
  randBtn.style.backgroundColor=`rgb(${R}, ${G}, ${B})`;

  /* convert RBG colour to find luminance value  */

  const maxRGB = Math.max(R, G, B)/255;
  const minRGB = Math.min(R, G, B)/255;
  const luminance =  (maxRGB + minRGB)/2;
  console.log(luminance);

  if (luminance < 0.5) {
    randBtn.style.color='white'
  } else {
    randBtn.style.color='black'
  }
}

/* selectRainbowBrush function */
function selectRainbowBrush() {
  console.log(this);
  console.log(this.id);
  
  brushColor = 'rainbow';
  console.log(brushColor);
}


/*set custom canvas size */
function setCanvasSize () {
  const gridContainer = document.querySelector('.grid-container');
  let colNo = parseInt(prompt('Please enter a number between 5 and 50', 20),10);
  if (colNo > 50) {colNo = 50};
  if (colNo < 5) {colNo = 5};
  const colWidth = Math.round((535 - 2 - ((colNo-2)*2)) / colNo);
  const rowNo = Math.floor(395 / colWidth);
  const canvasSize = colNo * rowNo;
  console.log(rowNo);
 
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild)
  }
  
  gridContainer.style.gridTemplateColumns = `repeat(${colNo}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${rowNo}, 1fr)`;
  
  addSketchDivs(canvasSize);
}