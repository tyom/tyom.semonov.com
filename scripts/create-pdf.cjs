const { spawn } = require('child_process');
const puppeteer = require('puppeteer');
const kill = require('tree-kill');

const PORT = process.env.PORT || 5173;
const PDF_PATH = 'static/tyom-semonov-cv.pdf';
const PAGE_URL = `http://localhost:${PORT}`;

(async () => {
  const server = spawn('yarn', ['dev'], {
    env: {
      PORT,
      NODE_ENV: 'production',
      ...process.env,
    },
  });

  server.stdout.on('data', async (data) => {
    console.log(data.toString());

    if (data.includes(PAGE_URL)) {
      try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(PAGE_URL, { waitUntil: 'networkidle0' });

        await page.pdf({ path: PDF_PATH, format: 'a4' });

        console.log('PDF generated!');

        await browser.close();
      } catch (err) {
        console.log(err);
      } finally {
        kill(server.pid);
      }
    }
  });

  server.stderr.on('data', async (data) => {
    console.log(data.toString());
  });
})();
