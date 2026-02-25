# 📸 Web Page Snapshot Action

一个基于 **Puppeteer** 的 GitHub Action，用于自动抓取网页截图并生成图片资源。

该 Action 会启动无头浏览器 (Headless Chrome)，访问指定 URL，截取全屏图片。

## 📷 效果展示
> 悄悄告诉你…… 其实这张图片会在每日 0:00 自动更新 ( •̀ ω •́ )✧  尽管我也不知道有什么用……

![示例图片](https://raw.githubusercontent.com/SimpERROR/web-page-snapshot-action/refs/heads/gh-pages/latest.png)

## ⚙️ 输入参数 (Inputs)

| 参数名 | 必填 | 默认值 | 描述 |
| :--- | :---: | :--- | :--- |
| `website` | **是** | https://www.bilibili.com/video/BV1GJ411x7h7 | 需要截取截图的目标网址 (例如 `https://example.com`)。 |

## 📤 输出参数 (Outputs)

| 参数名 | 描述 |
| :--- | :--- |
| `snapshot-path` | 生成的截图在 runner 上的本地路径。 |
| `image-size` | 截图尺寸（长 x 宽） |
| `time` | 截图生成的时间。 |
| `status` | 截图生成结果。 |

## 📄 许可证

MIT License
