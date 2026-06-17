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
  applyFilter(reddify);
  applyFilter(decreaseBlue);
  //applyFilter(increaseGreenByBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  applyFilterNoBackground(decreaseBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2, 3 & 5: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (var i = 0; i < image.length; i++) {
    // loop through each row of the image
    for (var j = 0; j < image[i].length; j++) {
      // loop through each pixel in the row
      var pixel = image[i][j]; // get the current pixel
      var pixelArray = rgbStringToArray(pixel); // convert the pixel to an array of numbers
      filterFunction(pixelArray); // apply the filter function to the pixel array

      var updatedPixel = rgbArrayToString(pixelArray); // convert the updated pixel back to an RGB string
      image[i][j] = updatedPixel; // update the pixel in the image with the new RGB string
      //console.log(image[i][j]);
    }
  }
}

// TODO 9 Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  var backgroundColor = image[0][0]; // get the background color from the top-left pixel
  for (var i = 0; i < image.length; i++) {
    //loop through the pixel rows
    for (var j = 0; j < image[i].length; j++) {
      //loop through pixel columns
      if (image[i][j] !== backgroundColor) {
        //checks if pixel doesn't equal background
        var pixel = image[i][j]; //turn pixels into strings
        var pixelArray = rgbStringToArray(pixel); // convert the pixel to an array of numbers
        filterFunction(pixelArray); // apply the filter function to the pixel array
        var updatedPixel = rgbArrayToString(pixelArray); // convert the updated pixel back to an RGB string
        image[i][j] = updatedPixel; // update the pixel in the image with the new RGB string
      }
    }
  }
}

// TODO 6: Create the keepInBounds function
function keepInBounds(value) {
  return value < 0 ? 0 : value > 255 ? 255 : value;
}

/* console.log(keepInBounds(-20)); // should print 0
console.log(keepInBounds(300)); // should print 255
console.log(keepInBounds(125)); // should print 125 */

// TODO 4: Create reddify filter function
function reddify(pixelArray) {
  pixelArray[RED] = 200;
}

/* var testArray = [100, 100, 100];
reddify(testArray);
console.log(testArray); // Should show [200, 100, 100] */

// TODO 7 & 8: Create more filter functions
function decreaseBlue(pixelArray) {
  pixelArray[BLUE] = keepInBounds(pixelArray[BLUE] - 50);
}

function increaseGreenByBlue(pixelArray) {
  pixelArray[GREEN] = keepInBounds(pixelArray[GREEN] + pixelArray[BLUE]);
}

// CHALLENGE code goes below here
