/**
 * The Easter Egg surprise:
 * A game where a person with a trail of
 * toilet paper is trying to collect more.
 * 
 * This game was created by following along a tutorial
 * that was made by:
 * 
 * @author Steven Lambert
 * @see https://gist.github.com/straker/ff00b4b49669ad3dec890306d348adc4
 * 
 */

/** Holds the element by id */
let canvas = document.getElementById('game');

/** Holds the element by id */
let context = canvas.getContext('2d');

/** Sets the grid number */
let grid = 16;

/** Counter that keepstrack **/
let count = 0;

/** Sets the shopper (player's attributes and positions **/
let shopper = {
    x: 160,
    y: 160,

    /** Sets velocity **/
    dx: grid,
    dy: 0,

    /** Track grids the shopper body occupies **/
    cells: [],

    /** Starting length of the shopper **/
    maxCells: 4
};

/** Sets position of toilet paper  **/
let toiletpaper = {
    x: 320,
    y: 320
};

/* Gets random whole numbers in a specific range
 * @see https://stackoverflow.com/a/1527820/2124254
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/* Loops the game continuously */
function loop() {
    requestAnimationFrame(loop);

    if (++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    /* Sets position of the shopper, causing it to move */
    shopper.x += shopper.dx;
    shopper.y += shopper.dy;

    /* Prevents shopper from colliding on border horizontally 
     * by wrapping around the screen
     */
    if (shopper.x < 0) {
        shopper.x = canvas.width - grid;
    } else if (shopper.x >= canvas.width) {
        shopper.x = 0;
    }

    /* Prevents shopper from colliding on border horizontally
     * by wrapping around the screen
     */
    if (shopper.y < 0) {
        shopper.y = canvas.height - grid;
    } else if (shopper.y >= canvas.height) {
        shopper.y = 0;
    }

    /* Keeps track of shopper's movement */
    shopper.cells.unshift({
        x: shopper.x,
        y: shopper.y
    });

    /* Removes cells as we move away from them */
    if (shopper.cells.length > shopper.maxCells) {
        shopper.cells.pop();
    }

    /* Creates toiletpaper */
    context.fillStyle = 'white';
    context.fillRect(toiletpaper.x, toiletpaper.y, grid - 1, grid - 1);

    /* Creates toiletpaper */
    context.drawImage = 'white';
    shopper.cells.forEach(function (cell, index) {

        /* drawing 1 px smaller than the grid creates a grid effect 
         * in the shopper body so you can see how long it is
         */
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        /* Increments shopper's trail if it eats toiletpaper */
        if (cell.x === toiletpaper.x && cell.y === toiletpaper.y) {
            shopper.maxCells++;

            /* Sets toilet paper's position */
            toiletpaper.x = getRandomInt(0, 25) * grid;
            toiletpaper.y = getRandomInt(0, 25) * grid;
        }

        /* Checks collision */
        for (let i = index + 1; i < shopper.cells.length; i++) {

            /* Resets game is shopper collides with body */
            if (cell.x === shopper.cells[i].x && cell.y === shopper.cells[i].y) {
                shopper.x = 160;
                shopper.y = 160;
                shopper.cells = [];
                shopper.maxCells = 4;
                shopper.dx = grid;
                shopper.dy = 0;

                toiletpaper.x = getRandomInt(0, 25) * grid;
                toiletpaper.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

/* keyboard movement to move the shopper, writtten so it
 * shopper does not collide with it's tail easily
 */
document.addEventListener('keydown', function (e) {
 
    /* left arrow key */
    if (e.which === 37 && shopper.dx === 0) {
        shopper.dx = -grid;
        shopper.dy = 0;
    }
    /* up arrow key */
    else if (e.which === 38 && shopper.dy === 0) {
        shopper.dy = -grid;
        shopper.dx = 0;
    }
    /* right arrow key */
    else if (e.which === 39 && shopper.dx === 0) {
        shopper.dx = grid;
        shopper.dy = 0;
    }
    /* down arrow key */
    else if (e.which === 40 && shopper.dy === 0) {
        shopper.dy = grid;
        shopper.dx = 0;
    }
});

/* start the game */
requestAnimationFrame(loop);