let offset;
let text;
let letters = Object.keys(JSON.parse(require("fs").readFileSync("CanonFreq.json").toString()));

try
{
    if(process.argv[2].toString() === "--help")
        showHelp();
    offset = Number(process.argv[2]);
    if(!Number.isInteger(offset) || offset < 0)
        throw new TypeError("offset must be not negative integer.")
    text = require("fs").readFileSync(process.argv[3].toString()).toString();
} catch (e)
{
    console.error(e.message);
    console.error("Type error. Type 'node caesar --help for info.'");
    process.exit(1);
}

console.log(convert(offset, text));
process.exit(0);

export function convert(offset, text)
{
    let output = "";
    for(let i = 0; i < text.length; i++)
    {
        if(letters.indexOf(text[i].toLowerCase()) === -1)
            output+=text[i];
        else
            output+= text[i].toUpperCase() === text[i] ?
                letters[(letters.indexOf(text[i].toLowerCase())+offset)%33].toUpperCase() :
                letters[(letters.indexOf(text[i])+offset)%33];
    }
    return output;
}

function showHelp()
{
    let help="Usage: node caesar <offset> <FILE>" + "\n" +
        "Encrypts using caesar code the сyrillic in the file at the given offset to the standard output stream."
    console.log(help);
    process.exit(0);
}