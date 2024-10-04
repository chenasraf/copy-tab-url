# Copy Tab URL

Firefox extension that lets you copy current tab URL to clipboard. Simple but effective, and makes
sharing and saving links way easier.

## ⚡️ Features

- Copy Tab URL with shortcut
- Copy Tab URL+Title in Markdown format with another shortcut

## ℹ️ Usage

### Default Shortcuts

- Copy tab URL
  - Mac:<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd>
  - Windows/Linux: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd>
- Copy tab Markdown
  - Mac: <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>
  - Windows/Linux: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>

Shortcuts can be customized by going to Settings -> Extensions & themes -> Cog menu (top right) ->
Manage Extension Shortcuts

- Copying tab URL will copy the URL in plain text, like so: `https://example.com`
- Copying tab Markdown will copy the URL in Markdown format with the title, like so:
  `[Example Site](https://example.com)`

## 💻 Development

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/) - fast, disk space efficient package manager
- [esno](https://github.com/antfu/esno) - TypeScript / ESNext node runtime powered by esbuild
- [npm-run-all](https://github.com/mysticatea/npm-run-all) - Run multiple npm-scripts in parallel or
  sequential
- [web-ext](https://github.com/mozilla/web-ext) - Streamlined experience for developing web
  extensions

### Start Dev Server

```bash
pnpm dev
```

Then **load extension in browser with the `extension/` folder**.

For Firefox developers, you can run the following command instead:

```bash
pnpm start:firefox
```

`web-ext` auto reloads the extension when `extension/` files changed.

> While Vite handles HMR automatically in the most of the case,
> [Extensions Reloader](https://chrome.google.com/webstore/detail/fimgfedafeadlieiabdeeaodndnlbhid)
> is still recommanded for cleaner hard reloading.

### Build

To build the extension, run

```bash
pnpm build
```

And then pack files under `extension`, you can upload `extension.crx` or `extension.xpi` to
appropriate extension store.

## 👤 Credits

This template codes are based on
[vite-react-webext](https://github.com/YangJonghun/vite-react-webext), which is based on
[Anthony Fu](https://github.com/antfu)'s [vitesse-webext](https://github.com/antfu/vitesse-webext).

## 💪🏼 Contributing

I am developing this package on my free time, so any support, whether code, issues, or just stars is
very helpful to sustaining its life. If you are feeling incredibly generous and would like to donate
just a small amount to help sustain this project, I would be very very thankful!

<a href='https://ko-fi.com/casraf' target='_blank'>
  <img height='36' style='border:0px;height:36px;'
    src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3'
    alt='Buy Me a Coffee at ko-fi.com' />
</a>

I welcome any issues or pull requests on GitHub. If you find a bug, or would like a new feature,
don't hesitate to open an appropriate issue and I will do my best to reply promptly.
