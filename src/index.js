#!/usr/bin/env node
const yargs = require("yargs");
const storage = require('node-persist');

//  Game board 5 x 5 matrix
const gameBoard = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10]
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
];
//  Return X, Y direction based on bearing
const bearing = {
    'NORTH': [0, 1],
    'SOUTH': [0, -1],
    'EAST': [1, 0],
    'WEST': [-1, 0]
};
// Left/Right rotation mapping based on bearing
const rotateDirection = { 
    'NORTH': {
        'LEFT': 'WEST',
        'RIGHT': 'EAST'},
    'SOUTH': {
        'LEFT': 'EAST',
        'RIGHT': 'WEST'
    },
    'EAST': {
        'LEFT': 'NORTH',
        'RIGHT': 'SOUTH'
    },
    'WEST': {
        'LEFT': 'SOUTH',
        'RIGHT': 'NORTH'
    }
};

const options = yargs
.command("PLACE <position>", "place robot at X,Y,F, i.e. 0,0,NORTH", () => {}, async (argv) => {
    
    let position = getPositionFromArgs(argv.position);
    if(position) {
        await setPosition(position);
    }
    else {
        console.log("OUTPUT:", "Invalid position set");
    }
})
.command("MOVE", "move toy robot 1 place by the current bearing", () => {}, async (argv) => {
    let position = await getPosition();
    if(position) {
        movePosition(position);
    }
})
.command("LEFT", "rotate toy robot to the left of current bearing", () => {}, async (argv) => {
    let position = await getPosition();
    if(position) {
        rotateLeft(position);
    }
})
.command("RIGHT", "rotate robot to the right of the current bearing", () => {}, async (argv) => {
    let position = await getPosition();
    if(position) {
        rotateRight(position);
    }
})
.command("REPORT", "show current position of toy robot", () => {}, async (argv) => {
    let position = await getPosition();
    if(position) {
        console.log("OUTPUT:", await(getPosition()));
    }
    else {
        console.log("OUTPUT:", "No position set");
    }
 })
 .demandCommand()
 .help()
 .argv;

//  Get the current position
async function getPosition() {
    await storage.init();
    let position = await storage.getItem('position');
    return position ? position : false;
};

//  Set the position if validate
async function setPosition(position) {
    await storage.init();
    if(validatePosition(position)) {
        await storage.setItem('position', position);
    }
    else {
        console.log("Invalid position");
        return false;
    }
}

//  Move position 1 position forward based on current bearing
async function movePosition(position) {
    console.log("old position:", position);
    let b = bearing[position[2]];
    position[0] += b[0];
    position[1] += b[1]; 
    console.log("new position:", position);
    setPosition(position);
}

//  Rotate position to the left
async function rotateLeft(position) {
    console.log("old position:", position);
    position[2] = rotateDirection[position[2]].LEFT;
    console.log("new position:", position);
    setPosition(position);
}

//  Rotate position to the right
async function rotateRight(position) {
    console.log("old position:", position);
    position[2] = rotateDirection[position[2]].RIGHT;
    console.log("new position:", position);
    setPosition(position);
}

//  Validate the position based on game board
function validatePosition(position) {
    try {
        return gameBoard[position[0]][position[1]];
    }
    catch(e) {
        return false;
    }
}

function getPositionFromArgs(argv) {
    let position = argv.split(',');
    try {
        position[0] = parseInt(position[0], 10);
        position[1] = parseInt(position[1], 10);
        
        if(bearing[position[2]] === undefined) {
            throw(new Error());
        }
        return position;
    }
    catch(e) {
        return false;
    }
}

