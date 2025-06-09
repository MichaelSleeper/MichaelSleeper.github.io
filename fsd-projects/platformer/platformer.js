$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    toggleGrid();

    // TODO 2 - Create Platforms
    createPlatform(200, 650, 200, 20, "red");
    createPlatform(550, 515, 200, 20, "red");
    createPlatform(900, 400, 200, 20, "red");
    createPlatform(1100, 270, 100, 20, "red");
    createPlatform(700, 250, 200, 20, "red");
    createPlatform(1120, 120, 50, 20, "red");
    createPlatform(450, 115, 200, 20, "red");
    createPlatform(900, 520, 200, 20, "red");

    // TODO 3 - Create Collectables
    createCollectable("steve", 1120, 80);
    createCollectable("diamond", 980, 480, 0.5, 0.7);
    createCollectable("max", 530, 70, 0.5, 0.5);

    // TODO 4 - Create Cannons
    createCannon("left", 400, 3000);
    createCannon("right", 800, 0.000001);
    createCannon("top", 1130, 5000);
    createCannon("bottom", 500, 1000);
    createCannon("left", 250, 2000);

    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
