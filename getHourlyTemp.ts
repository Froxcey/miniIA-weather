import fs from "fs";
import FroxDate from "./froxjs/date";
import pull from "./pull";
import avgArr from "./froxjs/avgArr";

let parse = async (day: FroxDate) => {
  let year = day.getFullYear();
  let month = (day.getMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  let pDay = day.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  let rawData: Array<string> = [];
  try {
    rawData = fs.readFileSync(`${__dirname}/data/C0V810-${year}-${month}-${pDay}.csv`).toString().split("\n");
  } catch (err) {
    console.log(`Pulling C0V810-${year}-${month}-${pDay}.csv`);
    await pull(year, month, pDay);
    rawData = fs.readFileSync(`${__dirname}/data/C0V810-${year}-${month}-${pDay}.csv`).toString().split("\n");
  }

  let tempCol: number = 3;
  let data: Array<number> = [];
  let dataClean: Array<number> = [];
  rawData.shift();
  rawData[0].split(",").forEach((val, i, arr) => {
    if (val == '"Temperature"') {
      tempCol = i;
    }
  });
  rawData.shift();
  rawData.forEach((val, i, arr) => {
    let value = Number(val.split(",")[tempCol].replaceAll('"', ""));
    data.push(value);
    if (value) dataClean.push(value);
  });
  return {
    entry: day,
    data,
    dataClean,
    max: Math.max(...dataClean),
    min: Math.min(...dataClean),
    maxIndex: data.indexOf(Math.max(...dataClean)),
    range: Math.max(...dataClean) - Math.min(...dataClean),
    average: avgArr(dataClean),
  };
};

export default parse;
