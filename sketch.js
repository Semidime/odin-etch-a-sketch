addSketchDivs(30,30);
addColorPaletteListener();
addCanvasListener();
let brushColor = 'rgb(0, 0, 0)';

/* function to add (n) divs with class "sketch-div", append to grid-container div and attach
event listener to each sketchDiv*/
function addSketchDivs(cols, rows) {
  const n = cols * rows;
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

  /* rounded corners */
  const topLeft = document.querySelector('#SD1');
  const topRight = document.querySelector(`#SD${cols}`);
  const bottomRight = document.querySelector(`#SD${n}`);
  const bottomLeft = document.querySelector(`#SD${(cols * (rows - 1)) + 1}`);
  
  topLeft.style.borderRadius = '20px 0 0 0';
  topRight.style.borderRadius = '0 20px 0 0';
  bottomRight.style.borderRadius ='0 0 20px 0'; 
  bottomLeft.style.borderRadius = '0 0 0 20px';

  /* event listener added to each sketchDiv */
  const sketchDivs = document.querySelectorAll('.sketch-div');
  sketchDivs.forEach(sketchDiv => sketchDiv.addEventListener('mouseover', assignColor))
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
function assignColor(e) {
  console.log(this);
  console.log(e.buttons === 1);
  console.log(this.id);
  const sketchDiv = document.querySelector(`#${this.id}`);
  
  if (e.buttons === 1) {
      
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
}}



/* setBrushColor function */
function setBrushColor() {
  brushColor = this.style.backgroundColor;
  console.log(brushColor);
  
  removeSelected();
  this.classList.add('selected');
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

  removeSelected();
  this.classList.add('selected');

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

  removeSelected();
  this.classList.add('selected');
}


/*set custom canvas size */
function setCanvasSize () {
  const gridContainer = document.querySelector('.grid-container');
  let colNo = parseInt(prompt('Please enter a number between 5 and 50', 30),10);
  if (colNo > 50) {colNo = 50};
  if (colNo < 5) {colNo = 5};
/*   const colWidth = Math.round((535 - 2 - ((colNo-2)*2)) / colNo); */
  const rowNo = colNo/* Math.floor(395 / colWidth) */;
  /* const canvasSize = colNo * rowNo; */
  console.log(rowNo);
 
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild)
  }
  
  gridContainer.style.gridTemplateColumns = `repeat(${colNo}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${rowNo}, 1fr)`;
  
  addSketchDivs(colNo,rowNo);
}

function removeSelected() {
  const selectedDivs = document.querySelectorAll('.selected');
  selectedDivs.forEach(selectedDiv => selectedDiv.classList.remove('selected'));
}

