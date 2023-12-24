# Description

TODO: add description

# Quick start

TODO: add quick start

# Styles

CSS Modules are used for styles.
<br><br>

# Compressed images

In order to create `lowresBase64` image do following steps:

1. Reduce width of the image to `20px` (let height to be set automatically keeping the proportion). Don't save it in super heavy quality.
2. Go to [this page](https://compressor.io/) and compress image using `lossy` compression type.
3. Go to [this page](https://elmah.io/tools/base64-image-encoder/) and upload compressed image. Copy the result with `data:image/[TYPE];base64,` in the beggining.
   <br><br>

# Testing

## Hooks

- **Husky pre-commit hook** - every time one's committing its changes, it will be lint checked first.
- **Husky pre-push hook** - every time one's pushing its changes, it will be tested first with coverage threshold check.

## Static

- **ESLint** - there's a lot of rules in `.eslint` I calibrated for my own preferences. One's might freak out seeing this. I'd like to stress, this is code style of my own preference. In real world projects with teams I ajust myself to the rules defined in a project.
- No **TypeScript** or **Flow** - only `prop-types` as mandatory.

## Unit and Integration

- **Jest** - testing framework.
  <br>
  Libs, and plugins for jest:
  - `eslint-plugin-jest` - ESLint for Jest.
  - [`snapshot-diff`](https://github.com/jest-community/snapshot-diff) - diffing snapshot utility. Takes two values, and return their difference as a string, ready to be snapshotted with `toMatchSnapshot()`.
- **React Testing Library** - React DOM testing utilities.
  <br><br>

---

TODO:

- describe theming
