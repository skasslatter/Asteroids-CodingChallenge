const fs = require("fs");

const fileName = "./lvl3-0.inp";
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

function getShape(pixels) {
  let shapeRows = [];
  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      if (pixels[i][j] > 0) {
        shapeRows.push(pixels[i]);
        break;
      }
    }
  }
  if (shapeRows.length === 0) {
    return null;
  }
  let shape = [];
  for (let i = 0; i < shapeRows.length; i++) {
    shape.push([]);
  }
  for (let j = 0; j < shapeRows[0].length; j++) {
    for (let i = 0; i < shapeRows.length; i++) {
      if (shapeRows[i][j] > 0) {
        for (let k = 0; k < shapeRows.length; k++) {
          if (shapeRows[k][j] > 0) {
            shape[k].push(1);
          } else {
            shape[k].push(0);
          }
        }
        break;
      }
    }
  }
  return shape;
}

function getAsteroidShapes(images) {
  const shapeTimestamp = {};
  for (let i = 0; i < images.length; i++) {
    const shape = getShape(images[i].pixels);
    if (shape) {
      if (!(shape in shapeTimestamp)) {
        shapeTimestamp[shape] = [images[i].timestamp];
      } else {
        shapeTimestamp[shape].push(images[i].timestamp);
      }
    }
  }
  let timestamps = Object.values(shapeTimestamp);
  console.log("timestamps: ", timestamps);
  return timestamps;
}

function getValidSubsets(shapeTimestamps) {
  let count = {};
  for (let i = 0; i < shapeTimestamps.length; i++) {
    for (let j = i + 1; j < shapeTimestamps.length; j++) {
      let interval = shapeTimestamps[j] - shapeTimestamps[i];
      if (!count[interval]) {
        count[interval] = [];
      }
      count[interval].push(shapeTimestamps[i]);
    }
  }
  console.log("count", count);
  // return startTime, endTime, count
}

const dataSet = parseInput(data);
console.log(JSON.stringify(dataSet));
const asteroidShapesObject = getAsteroidShapes(dataSet.images);
// const asteroidShapes = Object.values(asteroidShapesObject).join("\n");
// let result = asteroidShapes.replace(/,/g, " ");

console.log("asteroidShapesObject", JSON.stringify(asteroidShapesObject));
console.log(JSON.stringify(getValidSubsets([1, 4, 7, 8, 12, 13, 16, 19])));
// fs.writeFileSync(fileName + ".output", result);
