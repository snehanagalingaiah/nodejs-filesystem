const express=require("express");
const fs= require("fs");
const path = require("path");

const app= express();
const PORT = 8000;

//api to create file containing current timestamp and file named as current date-time

//http://localhost:8000/createFile

app.use("/createFile", (req, res, next) => {

var date_time = new Date();

let hours = date_time.getHours();

let minutes = date_time.getMinutes();

let seconds = date_time.getSeconds();

//converting the timestamp data to a string
let timestamp = hours + ":" + minutes + ":" + seconds;

//the txt file name shouldn't contain ' : ' so replacing that 
date_time = date_time.toString().replaceAll(":", "-");

console.log(date_time);
   
  fs.writeFile(`./target_dir/${date_time}.txt`,timestamp.toString(), err => {
     if (err) 
     {
    // return  console.error(`Unable to create file`,+err);
     return console.log(err);
    } 
    res.send(`File ${date_time}.txt created in target_dir`)
})
});


//api to retrieve all files from the directory

//http://localhost:8000/getFile


app.use("/getFile", (re,res,next)=>{

const fullpath = path.join(__dirname, "target_dir");

fs.readdir(fullpath,  (err, files) =>{
 
  if (err) {
      return console.log('Unable to scan directory:' + err);
  } 
  res.send(files);
 
});
  
})



app.listen(PORT, () =>{
  console.log("Sever listening on port", PORT);
});