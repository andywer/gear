# Gear

A little experiment of mine. A wrapper around [Babel](https://babeljs.io/), [babel-preset-env](https://babeljs.io/) and some [special flavors](https://github.com/andywer/proposal-double-colon-types), all pre-configured with some sane defaults.

*Caution: Very early stage!*

## Installation

```sh
yarn add --dev @andywer/gear
```

or using npm

```sh
npm install --save-dev @andywer/gear
```

## Usage

Consider this sample `package.json` of a project using `gear`:

```json
{
  "scripts": {
    "build": "gear compile src/ -d lib/",
    "test": "gear type-check src/"
  },
  "babel-preset-env": {
    "targets": {
      "browsers": "last 2 versions",
      "node": ">= 4"
    }
  }
}
```
