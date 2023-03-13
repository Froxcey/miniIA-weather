import { Builder, By, until } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";

let get = async (year: number, month: string, day: string, retry = true) => {
  let options = new firefox.Options();
  options.setPreference("browser.download.folderList", 2);
  options.setPreference("browser.download.manager.showWhenStarting", false);
  options.setPreference("browser.download.dir", __dirname + "/data");
  options.headless();
  let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
  try {
    await driver.get(`https://e-service.cwb.gov.tw/HistoryDataQuery/index.jsp`);
    await driver.wait(until.elementLocated(By.name("stationCounty")), 5000);
    await driver.sleep(1500);
    await driver.findElement(By.name("stationCounty")).sendKeys("高雄市");
    await driver.findElement(By.name("station")).sendKeys("左營");
    await driver.findElement(By.id("datepicker")).sendKeys(`${year}-${month}-${day}`);
    await driver.findElement(By.id("doquery")).click();
    await driver.sleep(500);
    await driver.switchTo().window((await driver.getAllWindowHandles())[1]);
    await driver.wait(until.elementLocated(By.id("downloadCSV")), 10000);
    await driver.findElement(By.id("downloadCSV")).click();
    await driver.sleep(1000);
    driver.quit();
    return true;
  } catch (e) {
    driver.quit();
    if (retry) {
      console.error(e);
      await get(year, month, day);
    } else {
      console.error(e);
      return false;
    }
  }
};

export default get;
