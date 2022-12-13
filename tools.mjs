import * as fs from 'fs';

export function convert(offset, text)
{
    let letters = Object.keys(JSON.parse(fs.readFileSync("CanonFreq.json").toString()));
    let output = "";
    for(let i = 0; i < text.length; i++)
    {
        if(letters.indexOf(text[i].toLowerCase()) === -1)
            output+=text[i];
        else
            output+=text[i].toUpperCase() === text[i] ?
                letters[(letters.indexOf(text[i].toLowerCase())+offset)%33].toUpperCase() :
                letters[(letters.indexOf(text[i])+offset)%33];
    }
    return output;
}