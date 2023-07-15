const express=require("express");
const fs= require("fs");
const path = require("path");
const os = require('os');

const app= express();
const PORT = 2000;

// accessing the desktop directory
const homeDir = os.homedir(); // See: https://www.npmjs.com/package/os
console.log(homeDir);
const targetPath = path.join(homeDir, 'target_dir')

//api to create file containing current timestamp and file named as current date-time

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

//api to read contents of a particular file

app.use("/getContents/:file", (re,res,next)=>{
try {
  const data = fs.readFileSync(`${targetPath}/${req.params.file}`, 'utf8');
 res.send(data);
} catch (err) {
  res.send("unable to read file, make sure the file exists by hitting the getFile api")
}
})

app.listen(PORT, () =>{
  console.log("Sever listening on port", PORT);
});
