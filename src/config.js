//  Game board 5 x 5 matrix
const GAMEBOARD = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
];

//  Return X, Y direction based on bearing
const BEARING = {
    'NORTH': [0, 1],
    'SOUTH': [0, -1],
    'EAST': [1, 0],
    'WEST': [-1, 0]
};

// Left/Right rotation mapping based on bearing
const ROTATEDIRECTION = { 
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

module.exports = {
    GAMEBOARD,
    BEARING,
    ROTATEDIRECTION
};