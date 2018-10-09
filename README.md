# Gulpon

A Flexible Static Site Generator.

## Install

```
git clone https://github.com/tsubo/gulpon.git
cd gulpon
npm install
```

## Directory Structure

```
gulpon/
├── public/             output destination of the generated file
│
├── data/
│   ├── menu.yml        menu settings
│   └── site.yml        site deta
│
├── src/                you'r contents
│   ├── css
│   ├── sass
│   ├── img
│   ├── js
│   │
│   ├── index.njk       pages written in nunjucks template
│   └── some_page.njk   https://mozilla.github.io/nunjucks/
│
├── template/           layout or parcial templates
│
└── gulpfile.js         task runner
```

The /src directory contains the actual contents of your site. This is where all of your site's pages, CSS, Javascript, images, etc. will be kept.kk

Gulpon will generate your static HTML and place it in the /public directory.

## Build

```
npm run build
```

## Previewing with Browsersync

```
npm run server
```
