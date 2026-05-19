Screenshots

I captured responsive screenshots (phone/tablet, portrait and landscape) during testing. The images are available in this chat session snapshot. If you want to re-create them locally, run:

```bash
# from project root
python3 -m http.server 5500  # start server
# then open http://127.0.0.1:5500/index.html in a browser and take screenshots
```

Or use Playwright to capture automatically (example):

```js
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/index.html');
  await page.setViewportSize({width:812, height:375});
  await page.screenshot({path:'screenshots/phone-landscape.png', fullPage:true});
  await page.setViewportSize({width:1024, height:768});
  await page.screenshot({path:'screenshots/tablet-landscape.png', fullPage:true});
  await browser.close();
})();
```

If you want, I can try again to save images into the repo if you prefer and provide guidance to enable that locally.
