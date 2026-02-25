import * as core from '@actions/core';
import * as puppeteer from 'puppeteer-core';
import * as fs from 'fs';
import * as path from 'path';

async function run() {
  try {
    const website = core.getInput('website', { required: true });

    const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable';

    core.info(`Launching browser with executable path: ${executablePath}`);

    const browser = await puppeteer.launch({
      executablePath: executablePath,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    const page = await browser.newPage();
    
    await page.goto(website, { waitUntil: 'networkidle2' });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const snapshotDir = path.join(process.cwd(), 'snapshots');
    
    if (!fs.existsSync(snapshotDir)) {
      fs.mkdirSync(snapshotDir, { recursive: true });
    }
    
    const filename = `snapshot-${timestamp}.png`;
    const snapshotPath = path.join(snapshotDir, filename);
    
    await page.screenshot({ path: snapshotPath, fullPage: true });
    
    const viewport = page.viewport();
    const imageSize = `${viewport?.width || 1920}x${viewport?.height || 1080}`;
    
    await browser.close();
    
    const time = new Date().toISOString();
    
    core.setOutput('snapshot-path', snapshotPath);
    core.setOutput('time', time);
    core.setOutput('status', 'success');
    core.setOutput('image-size', imageSize);
    
    core.info(`Snapshot saved to: ${snapshotPath}`);
    core.info(`Image size: ${imageSize}`);
    core.info(`Status: success`);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    core.setFailed(`Error: ${errorMessage}`);
    
    core.setOutput('status', 'failed');
    core.setOutput('time', new Date().toISOString());
    core.setOutput('snapshot-path', '');
    core.setOutput('image-size', '');
  }
}

run();