import * as fs from 'fs';
import {convert} from "./tools.mjs";

let text;
let deltaSet = [];
let perfectFreqTable = JSON.parse(fs.readFileSync("CanonFreq.json").toString());
try
{
    if(process.argv[2].toString() === "--help")
        showHelp();
    text = fs.readFileSync(process.argv[2].toString()).toString();
} catch (e)
{
    console.error(e.message);
    console.error("Type error. Type 'node caesar --help for info.'");
    process.exit(1);
}

for(let i = 0; i < Object.keys(perfectFreqTable).length; i++)
    deltaSet.push(countApproximation(convert(i, text.toLowerCase())));
let minDelta = 10;
for(let i = 0; i < deltaSet.length; i++)
    minDelta = Math.min(minDelta, deltaSet[i]);
let offset = deltaSet.indexOf(minDelta);
console.log(convert(offset, text));
process.exit(0);

function showHelp()
{
    let help="Usage: node caesar <FILE>" + "\n" +
        "Try to decode caesar code in FILE to the standard output stream.";
    console.log(help);
    process.exit(0);
}

function countApproximation(text)
{
    let delta = 0;
    text = text.toLowerCase().split("");
    let letter_quantity = 0;
    let realFreqTable = {};
    for(let i = 0; i < text.length; i++)
    {
        if(!perfectFreqTable.hasOwnProperty(text[i]))
            continue;
        if(!realFreqTable.hasOwnProperty(text[i]))
            realFreqTable[text[i]] = 1;
        else
            realFreqTable[text[i]]++;
        letter_quantity++;
    }
    for(let i in realFreqTable)
        realFreqTable[i]/=letter_quantity;
    for(let i in realFreqTable)
        delta+=(realFreqTable[i]-perfectFreqTable[i][1])**2;
    return delta;
}