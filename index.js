const express=require("express");
const fs= require("fs");
const path = require("path");
const os = require('os');

const app= express();
const PORT = 8000;

// accessing the desktop directory
const homeDir = os.homedir(); // See: https://www.npmjs.com/package/os
const desktopDir = `${homeDir}\\Desktop`;
console.log(desktopDir);
const targetPath = path.join(desktopDir, 'target_dir')

//api to create file containing current timestamp and file named as current date-time
//http://localhost:8000/createFile

app.use("/createFile", async (req, res, next) => {
var date_time = new Date();
let hours = date_time.getHours();
let minutes = date_time.getMinutes();
let seconds = date_time.getSeconds();

//converting the timestamp data to a string
let timestamp = hours + ":" + minutes + ":" + seconds;

//the txt file name shouldn't contain ' : ' so replacing that 
date_time = date_time.toString().replaceAll(":", "-");
console.log(date_time);

//checking if a folder called target_dir exits in the Desktop and if it doesn't exist, creating a folder called target_dir in the desktop
fs. existsSync(targetPath) ? console.log("target_dir exists") :
 await fs.mkdir(targetPath, function(err){
  if(err)
    console.log("target_dir not created");
  else
    console.log("target_dir created")
});
   
  fs.writeFile(path.join(targetPath, `${date_time}.txt`),timestamp.toString(), err => {
     if (err) 
     {
   res.send(`unable to create the file`)
     return console.log(err);
    } 
    res.send(`File ${date_time}.txt created in target_dir`)
})
});


//api to retrieve all files from the directory
//http://localhost:8000/getFile

app.use("/getFile", (re,res,next)=>{
fs.readdir(targetPath,  (err, files) =>{
  if (err) {
      return console.log('Unable to scan directory:' + err);
  } 
  res.send(files);
});
})

app.listen(PORT, () =>{
  console.log("Sever listening on port", PORT);
});
