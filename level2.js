const fs = require("fs");

const fileName = "./lvl2-4.inp";
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
  const shapeCount = {};
  for (let i = 0; i < images.length; i++) {
    const shape = getShape(images[i].pixels);
    if (shape) {
      if (!(shape in shapeCount)) {
        shapeCount[shape] = [images[i].timestamp, images[i].timestamp, 1];
      } else {
        shapeCount[shape][1] = images[i].timestamp;
        shapeCount[shape][2]++;
      }
    }
  }
  return shapeCount;
}

const dataSet = parseInput(data);
console.log(JSON.stringify(dataSet));
const asteroidShapesObject = getAsteroidShapes(dataSet.images);
const asteroidShapes = Object.values(asteroidShapesObject).join("\n");
let result = asteroidShapes.replace(/,/g, " ");

console.log("asteroidShapes", JSON.stringify(result));

fs.writeFileSync(fileName + ".output", result);
