/* addSketchDiv(); 
 */
document.addEventListener("DOMContentLoaded", function() {
    addSketchDivs();
  });

function addSketchDivs() {
    const gridContainer = document.querySelector('.grid-container');
    for (i = 1; i <= 1024; i++) {  
        const newDiv = document.createElement('div');
        newDiv.classList.add('sketch-div');
        newDiv.style.backgroundColor = 'lightgray';
        gridContainer.appendChild(newDiv);
    }
}



