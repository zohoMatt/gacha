# GACha

![](https://img.shields.io/badge/Electron-3.1.9-yellowgreen)
![](https://img.shields.io/badge/React-16.8.6-green)
![](https://img.shields.io/badge/TypeScript-3.4.5-ff69b4)
![](https://img.shields.io/badge/Mobx-5.15.4-informational)
![](https://img.shields.io/badge/AntDesign-4.1.4-lightgrey)
![](https://img.shields.io/badge/Webpack-4.32.2-9cf)
![](https://img.shields.io/badge/Less-3.11.1-ddee44)
![](https://img.shields.io/badge/Jest-24.8.0-c2c2c2)
![](https://img.shields.io/badge/d3-5.16.0-22aacc)
![](https://img.shields.io/badge/log4js-6.2.1-adeead)
![](https://img.shields.io/badge/lowdb-1.0.0-cc8844)
![](https://img.shields.io/badge/license-GPL%203.0-blue)

> Yet another more efficient plotting tool for PFAS adsorption processing Pore-Surface Diffusion Model.

* master: [![Build Status](https://travis-ci.com/zohoMatt/gacha.svg?branch=master)](https://travis-ci.com/zohoMatt/gacha)

## Instructions

## Development

### Getting started

**Run in 2 separate shell sessions (Recommended)**
```
npm run dev-renderer
npm run dev-main
```
**OR**
```
npm run start-dev
```

### Unit Testing (currently absent)

```
npm test
```

### Packaging

Build for current platform:
```
npm run dist
```
Use [electron-bulder CLI options](https://www.electron.build/cli) like:
```
# build for all platforms (Windows, Linux, Mac)
npm run build -- -mwl
```
