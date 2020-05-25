# DatesDemo

This project is only a sample. (typescript only)

## Running the App 

Procedure 1: This typescript file will create a javascript file at runtime with the same name. To run any typescript file there are a few ways:

Syntax:

Step 1: First, run the typescript file with the following command. This will create a javascript file from typescript automatically with the same name.

`tsc solution.ts`

Step 2:Now run the javascript file, the greet.ts file will get executed:

`node solution.js`

Procedure 2: You can merge both the commands by using a pole | and && like below :

Syntax:

In Windows:
`tsc solution.ts | node solution.js`
In Linux or MacOS:
`tsc solution.ts && node solution.js`

Procedure 3: You can also install ts-node along with typescript using the following command:

Syntax:

To install:
`npm install -g ts-node`
To run:
`ts-node solution.ts`
Output: Using any of the three ways, the output will remain the same.

## Running unit tests

I have not added unit tests for this sample. I have not used this before. This is something that I'm willing to learn and work on.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
