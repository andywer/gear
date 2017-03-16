# Gear

A little experiment of mine. A wrapper around [Babel](https://babeljs.io/), [babel-preset-env](https://babeljs.io/) and some [special flavors](https://github.com/andywer/proposal-double-colon-types), all pre-configured with some sane defaults.

*Caution: Very early stage!*


## Usage

Consider this sample `package.json` of a project using `gear`:

```json
{
  "scripts": {
    "build": "gear compile src/ -d lib/ --prod",
    "build:dev": "gear compile src/ -d lib/ --dev",
    "test": "npm run build:dev && ava",
    "watch": "gear compile src/ -d lib/ --watch"
  },
  "babel-preset-env": {
    "targets": {
      "browsers": "last 2 versions",
      "node": ">= 4"
    }
  },
  "devDependencies": {}
}
```
