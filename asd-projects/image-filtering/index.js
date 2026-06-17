// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter();

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2, 3 & 5: Create the applyFilter function here
function applyFilter() {
  for (var i = 0; i < image.length; i++) {
    // loop through each row of the image
    for (var j = 0; j < image[i].length; j++) {
      // loop through each pixel in the row
      var rgbString = image[i][j]; // get the RGB string for the current pixel
      var rgbNumbers = rgbStringToArray(rgbString); // convert the RGB string to an array of numbers
      console.log(image[i][j]);
    }
  }
}

// TODO 9 Create the applyFilterNoBackground function

// TODO 6: Create the keepInBounds function

// TODO 4: Create reddify filter function

// TODO 7 & 8: Create more filter functions

// CHALLENGE code goes below here
