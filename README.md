# Markdown Resume

一个基于 React 的 Markdown 简历排版工具。它适合用网格化布局快速制作一页式简历，支持 Markdown 编辑、普通富文本编辑、模板切换、本地导入导出和浏览器打印导出 PDF。

## 功能

- Markdown / 普通模式切换
- 网格拖拽和尺寸调整
- 多套内置简历模板
- 加粗、颜色、引用、链接、对齐、横线/竖线等排版工具
- 本地图片插入，不依赖第三方图床
- 简历数据自动保存到浏览器 `localStorage`
- 本地 JSON 备份与恢复
- 通过浏览器打印功能导出 PDF

## 本地运行

建议使用 Node.js 18 时直接运行下面命令。项目使用了旧版 webpack，启动脚本已内置 `--openssl-legacy-provider` 兼容参数。

```bash
npm install
npm start
```

启动成功后访问：

```text
http://localhost:3000
```

如果使用较旧 Node.js 版本，也可以继续使用同样命令。

## 图片使用方式

1. 点击要放图片的简历格子。
2. 点击工具栏中的图片按钮。
3. 选择本地图片。
4. 图片会被压缩后写入当前简历数据，并保存到浏览器本地缓存。

当前图片功能不会把图片上传到服务器或第三方图床。这样更稳定，也更适合离线使用；但图片会成为简历 JSON 数据的一部分，建议使用较小的头像或证件照。

## 数据与隐私

简历内容默认保存在浏览器的 `localStorage` 中，清理浏览器数据可能会导致简历丢失。建议定期使用“导入导出”功能保存 JSON 备份。



## 导出 PDF

点击页面工具栏中的导出 PDF 功能后，浏览器会打开打印窗口。建议使用 Chrome，并在打印设置中关闭页眉页脚、启用背景图形，以获得更接近页面的导出效果。

## 部署到 GitHub Pages

项目已包含 GitHub Actions 配置。推送到 `main` 分支后，GitHub 会自动安装依赖、构建项目，并发布 `build` 目录。

首次使用时需要在 GitHub 仓库中打开：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

部署完成后，页面地址通常是：

```text
https://你的用户名.github.io/仓库名/
```

## 开源协议

本项目使用 MIT License，详见 [LICENSE](./LICENSE)。
