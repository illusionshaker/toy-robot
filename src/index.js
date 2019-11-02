#!/usr/bin/env node
const yargs = require("yargs");
const {PLACE, MOVE, LEFT, RIGHT, REPORT} = require("./game");

const options = yargs
.command("PLACE <position>", "place robot at X,Y,F, i.e. 0,0,NORTH", () => {}, async (argv) => {
    await PLACE(argv.position);
})
.command("MOVE", "move toy robot 1 place by the current bearing", () => {}, async (argv) => {
    await MOVE();
})
.command("LEFT", "rotate toy robot to the left of current bearing", () => {}, async (argv) => {
    await LEFT();
})
.command("RIGHT", "rotate robot to the right of the current bearing", () => {}, async (argv) => {
    await RIGHT();
})
.command("REPORT", "show current position of toy robot", () => {}, async (argv) => {
    await REPORT();
 })
 .demandCommand()
 .help()
 .argv;