const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const assert = require("assert");
const By = webdriver.By;
const Until = webdriver.until;

var methods = {
  async createArrayTest() {
    console.log("Running createArrayTest.");
    try {
      let browser = openCodeVisualizationWebsite();
      createArray(browser);
    } catch (e) {
      console.log("Error", e.message);
    }
  }
};

function openCodeVisualizationWebsite() {
  let options = new firefox.Options();
  options.addArguments("-headless");

  let browser = new webdriver.Builder()
    .withCapabilities({ browserName: "firefox", acceptInsecureCerts: true })
    .setFirefoxOptions(options)
    .build();
  browser.get("http://localhost:4200");
  return browser;
}

async function createArray(browser) {
  browser
    .wait(Until.elementLocated(By.id("inputArray")))
    .sendKeys("1,4,3,5,8,9,2,6")
    .then(() => {
      browser
        .wait(Until.elementLocated(By.css(".btn.btn-primary")))
        .click()
        .then(() => {
          assertions(browser);
        });
    });
}

async function assertions(browser) {
  assert((await browser.findElement(By.id("node0")).getText()) == "1");
  assert((await browser.findElement(By.id("node1")).getText()) == "4");
  assert((await browser.findElement(By.id("node2")).getText()) == "3");
  assert((await browser.findElement(By.id("node3")).getText()) == "5");
  assert((await browser.findElement(By.id("node4")).getText()) == "8");
  assert((await browser.findElement(By.id("node5")).getText()) == "9");
  assert((await browser.findElement(By.id("node6")).getText()) == "2");
  assert((await browser.findElement(By.id("node7")).getText()) == "6");
  console.log("CreateArrayTest was sucessful.");
}

module.exports = methods;
