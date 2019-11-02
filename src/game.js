const storage = require('node-persist');
const {GAMEBOARD, BEARING, ROTATEDIRECTION} = require('./config');

const PLACE = async function(argv) {
    const position = getPositionFromArgs(argv);

    if(await setPosition(position)) {
        return true;
    }
    
    return false;
};

const MOVE = async function() {
    const position = await getPosition();

    if(position) {
        return await movePosition(position)
    }

    return false;
};

const LEFT = async function() {
    const position = await getPosition();

    if(position) {
        return await rotateLeft(position)
    }

    return false;
};

const RIGHT = async function() {
    const position = await getPosition();

    if(position) {
        return await rotateRight(position);
    }
    
    return false;
};

const REPORT = async function() {
    const position = await getPosition();

    if(position) {
        console.log("OUTPUT: " + position[0]+","+position[1]+","+position[2]);
    }
    else {
        console.log("OUTPUT: NO POSITION SET");
    }
};

//  Get the current position
const getPosition = async function() {
    await storage.init();
    const position = await storage.getItem('position');
    return position ? position : false;
};

//  Set the position if validate
const setPosition = async function(position) {
    await storage.init();
    if(validatePosition(position)) {
        await storage.setItem('position', position);
        return true;
    }
    else {
        console.log("OUTPUT: INVALID POSITION");
        return false;
    }
};

//  Move position 1 position forward based on current bearing
const movePosition = async function(position) {
    const b = BEARING[position[2]];
    position[0] += b[0];
    position[1] += b[1]; 
    return await setPosition(position);
};

//  Rotate position to the left
const rotateLeft = async function(position) {
    position[2] = ROTATEDIRECTION[position[2]].LEFT;
    return await setPosition(position);
};

//  Rotate position to the right
const rotateRight = async function(position) {
    position[2] = ROTATEDIRECTION[position[2]].RIGHT;
    return await setPosition(position);
};

//  Validate the position based on game board
const validatePosition = function(position) {
    try {
        return GAMEBOARD[position[0]][position[1]];
    }
    catch(e) {
        return false;
    }
};

const getPositionFromArgs = function(argv) {
    const position = argv.split(',');
    try {
        position[0] = parseInt(position[0], 10);
        position[1] = parseInt(position[1], 10);
        
        if(BEARING[position[2]] === undefined) {
            throw(new Error());
        }
        return position;
    }
    catch(e) {
        return false;
    }
};

module.exports = {
    PLACE,
    MOVE,
    LEFT,
    RIGHT,
    REPORT
};