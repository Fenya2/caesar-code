import * as fs from 'fs';
import {convert} from "./tools.mjs";

let offset;
let text;

try
{
    if(process.argv[2].toString() === "--help")
        showHelp();
    offset = Number(process.argv[2]);
    if(!Number.isInteger(offset) || offset < 0)
        throw new TypeError("offset must be not negative integer.")
    text = fs.readFileSync(process.argv[3].toString()).toString();
} catch (e)
{
    console.error(e.message);
    console.error("Type error. Type 'node caesar --help for info.'");
    process.exit(1);
}

console.log(convert(offset, text));
process.exit(0);

function showHelp()
{
    let help="Usage: node caesar <offset> <FILE>" + "\n" +
        "Encrypts using caesar code the сyrillic in the file at the given offset to the standard output stream."
    console.log(help);
    process.exit(0);
}
