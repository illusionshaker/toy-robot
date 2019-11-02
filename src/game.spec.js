const storage = require('node-persist');
const {PLACE, MOVE, LEFT, RIGHT, REPORT} = require("./game");

let outputData;
let storeLog;

beforeAll( async () => {
    storage.init = jest.fn(() => true);
    storage.setItem = jest.fn(() => true);
});

beforeEach(()=> {
    outputData = '';
    storeLog = inputs => (outputData += inputs);
});

test('PLACE given valid position and bearing of NORTH place command should be successful', async () => {
    let position = "0,0,NORTH"
    expect(await PLACE(position)).toBe(true);
});

test('PLACE given valid position and bearing of SOUTH place command should be successful', async () => {
    let position = "4,4,SOUTH"
    expect(await PLACE(position)).toBe(true);
});

test('PLACE given valid position and bearing of EAST place command should be successful', async () => {
    let position = "2,3,EAST"
    expect(await PLACE(position)).toBe(true);
});

test('PLACE given valid position and bearing of WEST place command should be successful', async () => {
    let position = "1,2,WEST"
    expect(await PLACE(position)).toBe(true);
});

test('PLACE given invalid X position of -1 place command should be unsuccessful', async () => {
    let position = "-1,0,NORTH"
    console["log"] = jest.fn(storeLog);
    expect(await PLACE(position)).toBe(false);
    expect(outputData).toBe("OUTPUT: INVALID POSITION");
});

test('PLACE given invalid X position of 5 place command should be unsuccessful', async () => {
    let position = "5,0,NORTH"
    console["log"] = jest.fn(storeLog);
    expect(await PLACE(position)).toBe(false);
    expect(outputData).toBe("OUTPUT: INVALID POSITION");
});

test('PLACE given invalid Y position of -1 place command should be unsuccessful', async () => {
    let position = "0,-1,NORTH"
    console["log"] = jest.fn(storeLog);
    expect(await PLACE(position)).toBe(false);
    expect(outputData).toBe("OUTPUT: INVALID POSITION");
});

test('PLACE given invalid Y position of 5 place command should be unsuccessful', async () => {
    let position = "0,5,NORTH"
    console["log"] = jest.fn(storeLog);
    expect(await PLACE(position)).toBe(false);
    expect(outputData).toBe("OUTPUT: INVALID POSITION");
});

test('PLACE given invalid bearing of NORT place command should be unsuccessful', async () => {
    let position = "0,5,NORT"
    console["log"] = jest.fn(storeLog);
    expect(await PLACE(position)).toBe(false);
    expect(outputData).toBe("OUTPUT: INVALID POSITION");
});

test('MOVE given valid position toy robot should move forward successfully', async () => {
    storage.getItem = jest.fn(() => [0,0,"NORTH"]);
    expect(await MOVE()).toBe(true);
});

test('MOVE given toy robot is on the table bounds and facing off the table toy robot should move forward unsuccessfully', async () => {
    storage.getItem = jest.fn(() => [0,0,"SOUTH"]);
    
    expect(await MOVE()).toBe(false);
    expect(outputData).toBe("OUTPUT: INVALID POSITION");
});

test('MOVE given toy robot has not been placed on the table toy robot should move forward unsuccessfully', async () => {
    storage.getItem = jest.fn(() => null);
    expect(await MOVE()).toBe(false);
});

test('LEFT given position set toy robot should successfully rotate left', async () => {
    storage.getItem = jest.fn(() => [0,0,"NORTH"]);
    expect(await LEFT()).toBe(true);
});

test('LEFT given position not set toy robot should unsuccessfully rotate left', async () => {
    storage.getItem = jest.fn(() => null);
    expect(await LEFT()).toBe(false);
});

test('RIGHT given position set toy robot should successfully rotate right', async () => {
    storage.getItem = jest.fn(() => [0,0,"NORTH"]);
    expect(await RIGHT()).toBe(true);
});

test('RIGHT given position note set toy robot should unsuccessfully rotate right', async () => {
    storage.getItem = jest.fn(() => null);
    expect(await RIGHT()).toBe(false);
});


test('REPORT given position set should display current position to console', async () => {
    storage.getItem = jest.fn(() => [0,0,"NORTH"]);
    console["log"] = jest.fn(storeLog);
    await REPORT();
    expect(outputData).toBe('OUTPUT: 0,0,NORTH');
});

test('REPORT given position not set should display position not set to console', async () => {
    storage.getItem = jest.fn(() => null);
    console["log"] = jest.fn(storeLog);
    await REPORT();
    expect(outputData).toBe('OUTPUT: NO POSITION SET');
});
