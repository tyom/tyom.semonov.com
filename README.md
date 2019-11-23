# Tyom Semonov’s CV

This repo serves as single source for my current CV. It deploys static site to GH pages and generates PDF from it.

The project is built in [Svelte](https://svelte.dev) using [Sapper](https://http://sapper.svelte.dev).
It uses [Puppeteer](https://github.com/GoogleChrome/puppeteer) to generate PDF from site and deploys to 
GH Pages with [gh-pages](https://github.com/tschaub/gh-pages) package.

The site is automatically built and deployed with CircleCI on commit to master.  

[![CircleCI](https://circleci.com/gh/tyom/tyom.semonov.com/tree/master.svg?style=svg)](https://circleci.com/gh/tyom/tyom.semonov.com/tree/master)

## Result

- Published site: https://tyom.github.io/tyom.semonov.com
- Published Storybook: https://tyom.github.io/tyom.semonov.com/storybook

## How it works

The data is stored in separate YAML files in [data](/data) directory. This data is parsed and transformed to JSON
in Sapper router and become available to client and server. The UI is composed of various components which take
this data and break it up into individual reusable pieces. Some of these can be seen in Storybook [stories](/stories).

The site is exported as static site so it can be hosted on GH Pages.

During the build stage the PDF file is generated using Puppeteer and published along to GH Pages along with the
rest of static site.

## Developing

To start development server run:

    yarn dev
    
To generate static site and PDF file run:

    yarn export
    
To serve exported static site locally run:

    yarn serve

To start Storybook run:

    yarn storybook
    
## Deployment

The deployment consists of the CV app and Storybook stories under `stories/` directory bundled as a static site.

To prepare the distribution (build and collate the files) run:

    yarn prepare-deploy

The static site is deployed to GH Pages. To deploy manually run:

    yarn deploy

## Environment variables

| Variable         | Description                            |
|:-----------------|:---------------------------------------|
| GIT_USER_EMAIL   | Git user email for pushing to GH pages |
| GIT_USER_NAME    | Git user name for pushing to GH pages  |
| GA_TRACKING_ID   | Google Analytics tracking ID           |
| CC_SECRET        | [CodeChecks](https://www.codechecks.io) secret key                  |
