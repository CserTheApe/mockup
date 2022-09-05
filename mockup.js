const fs = require("fs");
const express = require("express");

const DEFAULT_COUNT = 10;

function populateArray(item) {
  const count = isNaN(parseInt(item.count))
    ? DEFAULT_COUNT
    : parseInt(item.count);

  if (item.data.length === 0) return [];

  const finalData = [];
  let i = 0;
  while (finalData.length < count) {
    finalData.push(item.data[i]);
    i++;
    if (i >= item.data.length) i = 0;
  }
  return finalData;
}

function getData() {
  const filename = process.argv[2];

  const rawData = fs.readFileSync(filename);
  return JSON.parse(rawData);
}

function startServer(data) {
  const app = express();

  for (const item of data) {
    const loadedData = Array.isArray(item.data)
      ? populateArray(item)
      : item.data;

    app.get(item.path, (_req, res) => {
      res.json(loadedData);
    });
  }

  app.listen(9000, () => console.log("Listening on port 9000"));
}

function main() {
  try {
    const data = getData();
    console.log(data);

    startServer(data);
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
  }
}

main();
