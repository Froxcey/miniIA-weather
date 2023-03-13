import getHourlyTemp from "./getHourlyTemp";
import FroxDate from "./froxjs/date";
import prllctrl from "./froxjs/prllCtrl";
import avgArr from "./froxjs/avgArr";

let startDay = new FroxDate("2022-01-01");
let endDay = new FroxDate("2022-12-31");

export async function main(range: FroxDate[]) {
  let dailyAvgList: Array<number> = [];
  let dailyEntries: Array<number> = [];
  let dailyRangeList: Array<number> = [];
  let dailyMaxIndexList: Array<number> = [];
  await prllctrl(
    range,
    async (day) => {
      let data = await getHourlyTemp(day);
      dailyAvgList.push(data.average);
      dailyEntries.push(...data.dataClean);
      dailyRangeList.push(data.range);
      dailyMaxIndexList.push(data.maxIndex);
    },
    3
  );
  let result = {
    averageOfDailyRange: avgArr(dailyRangeList),
    averageOfMaxIndexes: avgArr(dailyMaxIndexList) + 1,
    overallAverage: avgArr(dailyEntries),
    rangeOfDailyAverage: Math.max(...dailyAvgList) - Math.min(...dailyAvgList),
    maxIndex: dailyAvgList.indexOf(Math.max(...dailyAvgList)) + 1,
    size: dailyEntries.length,
  };
  console.log(result);
}

main(startDay.to(endDay));
