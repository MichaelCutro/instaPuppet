const puppeteer = require('puppeteer');
const credentials = require('./creds');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=1200,764'
    ]
  }); 
  const page = await browser.newPage();
  page.setViewport({
    height: 764,
    width: 1200
  });
  //Go to instagram login page
  var website = 'https://www.instagram.com/accounts/login/';
  await page.goto(website);

  //Wait for selectors to load
  await page.waitFor(() => document.querySelectorAll('input[name=username]').length);
  
  //Type in Username and Password from the Credentials file
  await page.type('[name=username]', credentials.username);
  await page.type('[name=password]', credentials.password);

  await page.waitFor(1000)

  //Click the Login Button
  await page.evaluate(()=> {
    document.querySelector('button[type=submit]').click();
  });
  
  //Wait for the div class of the notifications request Box
  await page.waitFor(()=> document.querySelectorAll('.mt3GC'));
  
  //console.log('Ready to Click the Button');

  await page.waitFor(2000);

  // Click the STUBBORN notifications button
  // aOOlW   HoLwm Button Class of 'not now' Button
  // mt3GC Button Class of entirety 
  try {
    await page.waitForSelector('.mt3GC');
    await page.click('.mt3GC');
  } catch (e) {
    await page.waitForSelector('.aOOlW   HoLwm');
    await page.click('.aOOlW   HoLwm');
  }

 //const text = await page.evaluate( ()=> Array.from( document.querySelectorAll('.mt3GC'),element => element.textContent));
  await page.waitFor(2000);
  
  //Click like button

    await page.waitForSelector('.fr66n');
    await page.click('.fr66n');

  //Scroll Down

    page.evaluate(_ => {
      window.scrollBy(0, window.innerHeight);
    });
  
  
  await browser.close();
  


})(); 
