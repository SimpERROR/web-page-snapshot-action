# 📸 Web Page Snapshot Action

>[!NOTE]
> This English version was magically translated by an LLM. There might be some tiny translation glitches or weird phrasing. If you find any, please forgive the AI spirit! (＞﹏＜)✨

A **Puppeteer**-based GitHub Action that automatically captures webpage screenshots and generates image assets. ✨

This Action summons a Headless Chrome dragon to visit a specified URL and capture a full-page screenshot! 🐉📷

## 📷 Live Demo
> 🤫 Psst... let me tell you a secret... This image actually **auto-updates every day at 0:00 UTC**! ( •̀ ω •́ )✧  
> (Though... I'm not entirely sure what it's useful for either... 🤷‍♀️)

![Demo Snapshot](https://raw.githubusercontent.com/SimpERROR/web-page-snapshot-action/refs/heads/gh-pages/latest.png)

## ⚙️ Inputs

| Name | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `website` | **Yes** | `https://www.bilibili.com/video/BV1GJ411x7h7` | The target URL to capture (e.g., `https://example.com`). 🌐 |

## 📤 Outputs

| Name | Description |
| :--- | :--- |
| `snapshot-path` | The local path of the generated screenshot on the runner. 📂 |
| `image-size` | The dimensions of the screenshot (Width x Height). 📏 |
| `time` | The timestamp when the screenshot was taken. ⏰ |
| `status` | The result status of the screenshot generation. ✅ |

## 📄 License

MIT License
