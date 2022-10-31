// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged 4 //So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder a
// so at the end you will have a arranged set of files in specific folders

const helpModule = require("./commands/help");
const organizeModule = require("./commands/organize");
const treeModule = require("./commands/tree");

let input = process.argv.slice(2); //0 and 1 position ko hata dega means array slice kr dega
let command = input[0]; //tree , organize , help
switch (command) {
  case "tree":
    treeModule.treeKey(input[1]);
    break;
  case "organize":
    organizeModule.organizeKey(input[1]);
    break;
  case "help":
    helpModule.helpKey();
    break;
  default:
    console.log("plz Enter a Valid Command");
    break;
}
