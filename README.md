# Gear

A little experiment of mine. A wrapper around [Babel](https://babeljs.io/), [babel-preset-env](https://babeljs.io/) and some [special flavors](https://github.com/andywer/proposal-double-colon-types), all pre-configured with some sane defaults.


## Usage

Consider this sample `package.json` of a project using this tool:

```json
{
  "scripts": {
    "build": "compiler src/ -d lib/ --prod",
    "build:dev": "compiler src/ -d lib/ --dev",
    "test": "npm run build:dev && ava",
    "watch": "compiler src/ -d lib/ --watch"
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
