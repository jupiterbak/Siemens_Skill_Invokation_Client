
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'C:/GitHub/Siemens_Skill_Invokation_Client_Restrukturierung/test/example.png'});

  await browser.close();
})();