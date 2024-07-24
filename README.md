# Tyom Semonov’s CV

The repo contains the data of the CV in YAML format with Markdown flavours. The
data is used to generate a static website, along with the print-friendly PDF
version of the CV.

The project is built with [Svelte](https://svelte.dev) and [Svelte Kit](https://kit.svelte.dev/).
It uses [Playwright](https://playwright.dev/) to generate PDF from site and deploys to
GH Pages with [gh-pages](https://github.com/tschaub/gh-pages) package.

The site is automatically built and deployed with GitHub workflow on commit to `master` branch.

[![GH Workflow Status](https://github.com/tyom/tyom.semonov.com/workflows/Deployer/badge.svg)](https://github.com/tyom/tyom.semonov.com/actions?query=workflow%3ADeployer)

## Result

- Published site: https://tyom.github.io/tyom.semonov.com
- Published Storybook: https://tyom.github.io/tyom.semonov.com/storybook

## How it works

The data is stored in separate YAML files in [data](/data) directory. This data is transformed to JSON on the server
and is [loaded](https://kit.svelte.dev/docs#loading) with Svelte Kit. The UI is composed of various components which take
this data and break it up into individual reusable pieces. Some of these can be seen in Storybook [stories](/stories).

The result is built and uploaded to GitHub Pages.

During the build stage the PDF file is generated using Playwright. This PDF is built from the print preview
version of the site and is located in static directory, available for download.

## Developing

To start development server run:

    pnpm dev

To generate static site run:

    pnpm build

To create PDF run:

    pnpm create-pdf

To serve the static build run:

    pnpm start

To start Storybook run:

    pnpm storybook

## Deployment

The deployment consists of the CV app and Storybook stories under `stories/` directory bundled as a static site.

To prepare the distribution (build and collate the files) run:

    pnpm predeploy

The static site is deployed to GH Pages. To deploy manually (this also runs predeploy script) run:

    pnpm deploy

## Environment variables

| Variable                       | Description                            |
| :----------------------------- | :------------------------------------- |
| GIT_USER_EMAIL                 | Git user email for pushing to GH pages |
| GIT_USER_NAME                  | Git user name for pushing to GH pages  |
| PUBLIC_POSTHOG_PROJECT_API_KEY | Project ID key for PostHog             |
