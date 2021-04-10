require("dotenv").config();
const puppeteer = require('puppeteer');

const username = process.env.uname;
const password = process.env.pass;

const delay = ms => new Promise(res => setTimeout(res, ms));

async function main(){
  let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"]   // For maximise screen
  });

    let pages = await browser.pages();
    tab = pages[0];

    await tab.goto('https://twitter.com/login', {waitUntil: 'networkidle2'});
    

    // Login
    await tab.type('input[name="session[username_or_email]"]',username,{delay: 25});
		await tab.type('input[name="session[password]"]',password,{delay: 25});
    await tab.click('div[data-testid="LoginForm_Login_Button"]');

    await tab.waitForNavigation({waitUntil: "networkidle2"});

    // Select to write
    await tab.waitForSelector(".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr")
    await tab.click(".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr");
    
    let sentenceList = [
      "The purpose of our lives is to be happy.",
      "Do all the good you can, for all the people you can, in all the ways you can, as long as you can."
    ];
   
    for (let j = 0; j < sentenceList.length; j++) {
      let sentence = await sentenceList[j];
      for (let i = 0; i < sentence.length; i++) {
        
          await tab.type(".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr",sentence[i]);
          
            if (i === sentence.length - 1) {
              for(let k = 0; k < 8; k++){
                await tab.keyboard.press("Tab");
              }
              
              await tab.keyboard.press("Enter");
              console.log('done');
              await delay(3000);
              await tab.waitForSelector(".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr")
              await tab.click(".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr");
        }}
    }
      await delay(3000);
      await tab.screenshot({path: "screenshot.png"});
      await browser.close();
  }
    
main();  