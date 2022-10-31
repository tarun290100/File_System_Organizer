const fs = require("fs");
const path = require("path");
let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

function organizefn(dirpath) {
  let destpath;
  //input of directory path
  if (dirpath == undefined) {
    console.log("please Enter a valid Directory path");
    //check weather dirpath is passed or not
    return;
  } 
  else {
    let doesexist = fs.existsSync(dirpath);
    //path exist or not
    if (doesexist == true) {
      destpath = path.join(dirpath, "organized_files");
      //C:\Pepcoding\4_File System Organizer\test Folder\organized_files   - i want to create a folder in this path
      if (fs.existsSync(destpath) == false) {
        fs.mkdirSync(destpath); // create folder that does not exists
      } else {
        console.log("this folder is already exists");
      }
    } else {
      console.log("plz enter valid path");
    }
  }
  organizeHelper(dirpath, destpath);
}

function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src);
  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile == true) {
      let fileCatagory = getCategory(childNames[i]);
      console.log(childNames[i] + "belongs to " + fileCatagory);
      sendFiles(childAddress, dest, fileCatagory);
    }
  }
}

function getCategory(Name) {
  let ext = path.extname(Name);
  ext = ext.slice(1);

  for (let type in types) {
    let cTypeArr = types[type];
    for (let i = 0; i < cTypeArr.length; i++) {
      if (cTypeArr[i] == ext) {
        return type;
      }
    }
  }
  return "other";
}

function sendFiles(srcFilepath, dest, fileCatergory) {
  let catpath = path.join(dest, fileCatergory);
  if (fs.existsSync(catpath) == false) {
    fs.mkdirSync(catpath);
  }

  let fileName = path.basename(srcFilepath);
  let destFilePath = path.join(catpath, fileName);
  fs.copyFileSync(srcFilepath, destFilePath);
  fs.unlinkSync(srcFilepath);
}

module.exports = {
  organizeKey: organizefn,
};
