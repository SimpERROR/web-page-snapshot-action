"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const puppeteer = __importStar(require("puppeteer-core"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        core.setFailed(`Error: ${errorMessage}`);
        core.setOutput('status', 'failed');
        core.setOutput('time', new Date().toISOString());
        core.setOutput('snapshot-path', '');
        core.setOutput('image-size', '');
    }
}
run();
//# sourceMappingURL=main.js.map