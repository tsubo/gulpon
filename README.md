# Gulpon

A Flexible Static Site Generator.

## Install

```
npm install gulpon-cli -g
gulpon init my-site
cd my-site
gulpon serve
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
│   ├── assets/
│   │   ├── img/
│   │   ├── js/
│   │   └── sass/
│   │
│   ├── some_page.njk   page written in nunjucks template
│   └── some_page.md    page written in markdown
│
├── template/           layout or parcial templates
├── theme/              theme templates
│
└── gulpfile.js         task runner
```

The /src directory contains the actual contents of your site. This is where all of your site's pages, CSS, Javascript, images, etc. will be kept.

Gulpon will generate your static HTML and place it in the /public directory.

## Build

```
gulpon build
```

## Previewing with Browsersync

```
gulpon serve
```
