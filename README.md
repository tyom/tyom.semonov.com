# Tyom Semonov’s CV

This repo serves as single source for my current CV. It deploys static site to GH pages and generates PDF from it.

The project is built in [Vue.js](https://vuejs.org) using [Nuxt](https://nuxtjs.org).
It uses [Puppeteer](https://github.com/GoogleChrome/puppeteer) to generate PDF from site and deploys to 
GH Pages with [gh-pages](https://github.com/tschaub/gh-pages) package.

The site is automatically built and deployed on update to master using CircleCI.  
[![CircleCI](https://circleci.com/gh/tyom/tyom.semonov.com/tree/master.svg?style=svg)](https://circleci.com/gh/tyom/tyom.semonov.com/tree/master)

## How it works

The data is stored in separate YAML files in [data](data) directory. The UI is built in Vue using Nuxt which gives SSR
support.

The site is deployed via CircleCI. During the build stage PDF is generated using Puppeteer and the generated files
are pushed to GitHub pages. 

## Developing

To start development server run:

    yarn start
    
To generate static site run:

    nuxt generate
    
To generate PDF from static site run:

    yarn build-pdf
    
To build static site and generate PDF run:

    yarn build
    
## Deployment

The static site is deployed to GH Pages. To deploy manually run:

    yarn deploy

## Environment variables

| Variable         | Description                            |
|:-----------------|:---------------------------------------|
| GIT_USER_EMAIL   | Git user email for pushing to GH pages |
| GIT_USER_NAME    | Git user name for pushing to GH pages  |
| GA_TRACKING_ID   | Google Analytics tracking ID           |
