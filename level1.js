const fs = require("fs");

const fileName = "./lvl1-4.inp";
const data = fs.readFileSync(fileName, { encoding: "utf8", flag: "r" });

function parseInput(data) {
  let lines = data.split("\n");

  let firstLine = lines[0].split(" ");
  let startTime = firstLine[0];
  let endTime = firstLine[1];
  let nrOfImages = parseInt(firstLine[2]);
  let images = [];

  let currentLine = 1;
  for (let i = 0; i < nrOfImages; i++) {
    let firstImageLine = lines[currentLine].split(" ");
    let image = {
      timestamp: parseInt(firstImageLine[0]),
      pixels: [],
    };
    const rows = parseInt(firstImageLine[1]);
    const cols = parseInt(firstImageLine[2]);
    currentLine++;

    for (let j = 0; j < rows; j++) {
      let rowPixels = lines[currentLine].split(" ").map((val) => {
        return parseInt(val);
      });
      image.pixels.push(rowPixels);
      currentLine++;
    }
    // console.log("rows", rows, "cols", cols, "image", image);
    images.push(image);
  }
  return { startTime, endTime, images };
}

function isAsteroid(pixelArr) {
  for (let i = 0; i < pixelArr.length; i++) {
    for (let j = 0; j < pixelArr[i].length; j++) {
      if (pixelArr[i][j] > 0) {
        return true;
      }
    }
  }
  return false;
}

function getAsteroidTimestamp(images) {
  let asteroidTimestamps = [];
  for (let i = 0; i < images.length; i++) {
    if (isAsteroid(images[i].pixels)) {
      asteroidTimestamps.push(images[i].timestamp);
    }
  }
  return asteroidTimestamps;
}

const dataSet = parseInput(data);
console.log(JSON.stringify(dataSet));
const timestamps = getAsteroidTimestamp(dataSet.images).join("\n");
console.log("timestamps", timestamps);

fs.writeFileSync(fileName + ".output", timestamps);
