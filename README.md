# My blog: Ghost + Remix

This repo contains the source code of my blog, which runs on Ghost with a custom front-end build with Remix.

## Updating Ghost
To update the Ghost version in the Docker image, you need to
- Export the current database + contents from the Ghost admin.
- Stop the Docker container, and remove it.
- Empty the `./ghost/content` folder.
- Run `npm run docker`, which will pull the latest version from Docker Hub.
- Import the exported database dump.
