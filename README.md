# Description

Application that potentially will be a guide for menswear.

Current state: not even MVP.

It is an SPA application, built with Next.js. The routing of SPA is done with `react-router-dom`. As SPA has animated page transitions, so with this Next.js routing is not used. Next.js planned to be used for preloading `react-query` initial data, authorization (with Clerk), database connection (with PlanetScale) and for tRPC typing. The application is deployed on Vercel.

What is done:

- basic structure
- header & footer components
- basic routing
- animated menus (desktop & mobile)
- animated page transitions
- language switcher
- theme switcher
- progressive image loading (if an image is out of viewport, it will be loaded only when it's about to be visible)

What is not done (closest plans):

- content (parse content using [`html-to-react`](https://www.npmjs.com/package/html-to-react))
- comments section (Clerk & PlanetScale needed)
- main page layout (tiles)

# Quick start

Development environment:\
_(page transitions heavily lagging - the problem came with Next.js - was not an issue with CRA & Vite)_

```
pnpm i
pnpm dev
```

Build preview:\
_(no animation issues)_

```
pnpm i
pnpm build
pnpm start
```

# Styles

CSS Modules are used for styles.

# Compressed images

In order to create `lowresBase64` image do following steps:

1. Reduce width of the image to `20px` (let height to be set automatically keeping the proportion). Don't save it in super heavy quality.
2. Go to [this page](https://compressor.io/) and compress image using `lossy` compression type.
3. Go to [this page](https://elmah.io/tools/base64-image-encoder/) and upload compressed image. Copy the result with `data:image/[TYPE];base64,` in the beginning.
   <br><br>

# Testing

_(currently broken, awaits fixing and migration to Vitest, then, readme will be updated)_

## Hooks

- **Husky pre-commit hook** - every time one's committing its changes, it will be lint checked first.
- **Husky pre-push hook** - every time one's pushing its changes, it will be tested first with coverage threshold check.

## Static

- **ESLint** - there's a lot of rules in `.eslint` I calibrated for my own preferences. One's might freak out seeing this. I'd like to stress, this is code style of my own preference. In real world projects with teams I ajust myself to the rules defined in a project.
- No **TypeScript** or **Flow** - only `prop-types` as mandatory.

## Unit and Integration

- **Jest** - testing framework. (TODO: migrate to Vitest)
  <br>
  Libs, and plugins for jest:
  - [`snapshot-diff`](https://github.com/jest-community/snapshot-diff) - diffing snapshot utility. Takes two values, and return their difference as a string, ready to be snapshotted with `toMatchSnapshot()`.
- **React Testing Library** - React DOM testing utilities.
