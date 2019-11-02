# Toy Robot Challenge

## Introduction

The applicatoin is a simulation of a toy robot moving on a square table top, of dimensions 5 x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

## Stack

- node v12.13.0
- npm (node package manger)
- yargs (cli argument - capture user input from stdin)
- node-persist (localStage on the server - persist the position)
- jest (test framework)

## Install:

Assume you're using nvm to manage node versions

    $ nvm use
    $ npm install

## Unit Tests

    $ npm test

## Run simulation

This will run examples a, b and c - see "Example Input and Output" below

    $ npm run simulation

## Commands:

### PLACE X,Y,F

PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. The origin (0,0) can be considered to be the SOUTH WEST most corner. It is required that the first command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.

Example command(s):

    $ node . PLACE 0,0,NORTH
    $ node . PLACE 4,4,SOUTH
    $ node . PLACE 2,3,EAST
    $ node . PLACE 1,4,WEST

### MOVE

MOVE will move the toy robot one unit forward in the direction it is currently facing.

Example command(s):

    $ node . MOVE

### LEFT and RIGHT

LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

Example command(s):

    $ node . LEFT
    $ node . RIGHT

### REPORT

REPORT will announce the X, Y and F of the robot.

Example command(s):

    $ node . REPORT
    $ OUTPUT: 0,0,NORTH

A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.

Input is from standard input.

## CONSTRAINTS

The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot. Any move that would cause the robot to fall must be ignored.

## Example Input and Output

Run the following command to execute all three examples below:

    $ npm run simulation

### a)

Run the following command:

    $ npm run simulation-a

Which will execute the following instructions: 

    $ node . PLACE 0,0,NORTH
    $ node . MOVE
    $ node . REPORT
    $ OUTPUT: 0,1,NORTH

### b)

Run the following command:

    $ npm run simulation-b

Which will execute the following commands:

    $ node . PLACE 0,0,NORTH
    $ node . LEFT
    $ node . REPORT
    $ OUTPUT: 0,0,WEST

### c)

Run the following command:

    $ npm run simulation-c

Which will execute the following commands:

    $ node . PLACE 1,2,EAST
    $ node . MOVE
    $ node . MOVE
    $ node . LEFT
    $ node . MOVE
    $ node . REPORT
    $ OUTPUT: 3,3,NORTH