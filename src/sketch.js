let cols = 4;
let rows = 4;
let _width = 400;
let _height = 400;

// Make width and height smaller for smaller devices
if (window.innerWidth < 500) {
    _width = 250;
    _height = 250;
}

let source;
// Tiles is a 1D array (len = cols * rows). It contains all image parts and their index
let tiles = [];
// Board is a 1D array (len = cols * rows). It's a shuffled array of tile-indexes (indexes from tiles)
// e.x. board[2] = 5 -> tile labeled as 5 is on a third spot
let board = [];
let w, h;
// Blank Spot is an empty spot. Gives space to the board so the game can be playable and tiles can be moved
let blankSpot = -1;

function preload() {
    let imgUrl = `https://picsum.photos/${_width}/${_height}`;
    source = loadImage(imgUrl);
}

function setup() {
    // Setup the canvas
    let cvs = createCanvas(_width, _height);
    cvs.style("display", "block");
    cvs.parent("sketch-loader");

    w = _width / cols;
    h = _height / rows;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * w;
            let y = j * h;
            let index = i * cols + j;
            board.push(index);

            // Get a slice of the original image
            let img = createImage(w, h);
            img.copy(source, x, y, w, h, 0, 0, w, h);
            let tile = new Tile(index, img);
            tiles.push(tile);
        }
    }

    // Remove one tile so that tiles can be moved
    tiles.pop();
    board.pop();
    board.push(blankSpot);
    //simpleShuffle(board); // For less impactful shuffle (easier difficulty puzzle)

    // Shuffle the board
    shuffle(board, true);
}

function simpleShuffle(arr) {
    for (let i = 0; i < 1; i++) {
        randomMove(arr);
    }
}

function randomMove(arr) {
    // Choose two random tiles and swap them
    let r1 = floor(random(cols));
    let r2 = floor(random(rows));

    swap(r1, r2, arr);
}

function mousePressed() {
    // Get exact tile where mouse was clicked and move them if game rules allow
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);

    moveTile(i, j, board);
}

function draw() {
    background(255);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * w;
            let y = j * h;
            let index = i * cols + j;
            let tileIndex = board[index];

            // Display image on each tile if the tile is on the board
            if (tileIndex > blankSpot) {
                let img = tiles[tileIndex].img;
                image(img, x, y, w, h);
            }

            // Draw outline of each tile
            strokeWeight(2);
            noFill();
            rect(x, y, w, h);
        }
    }

    if (isSolved()) {
        console.log("SOLVED");

        let win = document.getElementById("win");
        win.classList.add(
            "block",
            "p-6",
            "max-w-sm",
            "bg-white",
            "rounded-lg",
            "border",
            "border-gray-200",
            "shadow-md",
            "dark:bg-gray-800",
            "dark:border-gray-700"
        );

        addHeader(win, "You solved a puzzle! Congratulations!");
        addParagraph(win, "I hope it was hard enough.");

        noLoop();
    }
}

function isSolved() {
    for (let i = 0; i < board.length - 1; i++) {
        if (board[i] !== tiles[i].index) return false;
    }
    return true;
}

function addHeader(win, text) {
    let h5 = document.createElement("h5");
    h5.classList.add(
        "mb-2",
        "text-2xl",
        "font-bold",
        "tracking-tight",
        "text-gray-900",
        "dark:text-white"
    );
    h5.textContent += text;
    win.appendChild(h5);
}

function addParagraph(win, text) {
    let p = document.createElement("p");
    p.classList.add("font-normal", "text-gray-700", "dark:text-gray-400");
    p.textContent += text;

    win.appendChild(p);
}

function moveTile(i, j, arr) {
    let blank = board.indexOf(blankSpot);
    let blankCol = blank % cols;
    let blankRow = floor(blank / cols);
    if (isNeighbor(i, j, blankCol, blankRow)) {
        swap(blank, i * cols + j, arr);
    }
}

function isNeighbor(i, j, y, x) {
    if (i >= cols || j >= rows) return false;
    if (i !== x && j !== y) return false;
    if (abs(i - x) == 1 || abs(j - y) == 1) return true;

    return false;
}

function swap(i, j, arr) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
