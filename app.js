const fs = require("fs");
const csv = require("csv-parser");
const inputFile = "./data/cameras-defb.csv";

const camera = {};
let cameraArr = [];

//make the csv into a json
fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (row) => {
    const newCamera = Object.create(camera);
    const popertyNameArr = Object.getOwnPropertyNames(row)[0].split(";");
    const popertyArr = row[Object.keys(row)[0]].split(";");

    popertyNameArr.forEach(function (item, index) {
      newCamera[popertyNameArr[index]] = popertyArr[index];
    });
    cameraArr.push(newCamera);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");

    //search bu name "Neude"
    var i = cameraArr.findIndex((v) => {
      if (v.Camera.includes("Neude")) {
        console.log(v.Camera);
      }
    });

    //what goes where
    cameraArr.forEach((el) => {
      const cameraNumber = parseInt(el.Camera.slice(7, 10));
      if (cameraNumber % 3 && cameraNumber % 5) {
        console.log(el);
        console.log(
          "is divisible by 3 and divisible by 5, then it should go in the third column."
        );
      } else if (cameraNumber % 3) {
        console.log(el);
        console.log("is divisible by 3, then it should go in the first column");
      } else if (cameraNumber % 5) {
        console.log(el);
        console.log(
          "is divisible by 5, then it should go in the second column."
        );
      } else {
        console.log(el);
        console.log(
          "is not divisible by 3 and is not divisible by 5, then it should go in the last column."
        );
      }
    });
  });

//serving data

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(cameraArr);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
