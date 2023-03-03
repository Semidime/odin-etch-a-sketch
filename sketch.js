document.addEventListener("DOMContentLoaded", function() {
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
    this.classList.add("selectedSD");
    console.log("wave");
}
