import dotenv from 'dotenv';
import { Browser } from 'puppeteer';
import { app } from './server';

dotenv.config();

const browserOptions = {
  headless: process.env.HEADLESS_BROWSER != null ? process.env.HEADLESS_BROWSER == 'true' : true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  defaultViewport: {
    width: 900,
    height: 600,
  },
  timeout: 120000,
};

export let browser: Browser;

const port = process.env.PORT;


async function main() {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

main();
