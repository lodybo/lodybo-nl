# My blog: Ghost + Remix

This repo contains the source code of my blog, which runs on Ghost with a custom front-end build with Remix.

If you want to read the README for the Remix stack, take a look at the [remix-README.md](./remix-README.md) file.

## Roboto Serif font
My blog uses Roboto Serif, a variable font from Google. A few manual steps are needed to get it up and running with Remix.
A walkthrough can be viewed here: https://gist.github.com/knowler/d74f1cdfa0d80a63910b554998eec112.

These step need to be run at project setup, and after that on a regular basis when updating `@fontsource/recursive`:
- Run `npm run link-fonts` (or `npm run setup` if you're just starting and need to start Docker as well). Periodically check whether the file names are still correct.
- Open `node_modules/@fontsource/recursive/variable-full.css` and `node_modules/@fontsource/recursive/variable-full-italic.css`, and pick the `@font-face` declaration marked with `recursive-latin-variable-full(-italic)`.
- Open `app/assets/fonts/recursive/index.ts` and check whether the file imports are still correct.
- In that same file, check whether the `@font-face` declarations for the normal and italic styles are still up to date.
- Open `app/root.tsx`, import the two `@font-face` declarations and put them in the `<head/>`, in a `<style/>` element (you'll need to use `dangerouslySetInnerHTML`).

## Updating Ghost
To update the Ghost version in the Docker image, you need to
- Export the current database + contents from the Ghost admin.
- Stop the Docker container, and remove it.
- Empty the `./ghost/content` folder.
- Run `npm run docker`, which will pull the latest version from Docker Hub.
- Import the exported database dump.
