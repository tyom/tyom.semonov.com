const path = require("path")
const puppeteer = require("puppeteer")

;(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
    await page.goto(`file://${path.join(__dirname, "../dist/index.html")}`, {
      waitUntil: "networkidle2"
    });
    await page.pdf({ path: "static/cv.pdf", format: "A4" })
    console.log('PDF generated!')
    await browser.close()
  } catch (err) {
    console.log(err)
  }
})()
