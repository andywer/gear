# Gear

A little experiment of mine. A wrapper around [Babel 7](https://babeljs.io/), [Flow](https://flowtype.org/), [babel-preset-env](https://babeljs.io/) and [functional type syntax](https://github.com/andywer/proposal-double-colon-types).

I wanted to play a little with Hindley-Milner types in JavaScript, see how it feels and by the way reduce the boilerplate necessary to get starting with typed JavaScript.

The tool is written using all the gimmicks it supports. So have a look at its own code if your interested, [type-check.js](./src/commands/type-check.js) is quite a good example, for instance.

⚠️ *Caution: Very early stage! This is rather an experiment than a ready-to-use tool.*


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
  "devDependencies": {
    "@andywer/gear": "^0.1.0"
  }
}
```

### Write some code

You can write JS code with Flow's regular type syntax, with Hindley-Milner types or without types (Flow will infer types as good as possible).

Nice gimmick: When writing Hindley-Milner types (functional style) you don't need to add `// @flow` to the file. It will automatically be added on first encounter of a type.

```js
invokeFlow :: string => Promise<Object>

function invokeFlow (dirPath) {
  // Flow's auto color detection will always disable colors when invoked using execa
  const colorOptions = supportsColor
    ? [ '--color', 'always' ]
    : [ ]

  return execa('flow', [ 'check', dirPath, ...colorOptions ])
}

exists :: string => Promise<bool>

async function exists (path) {
  try {
    await fs.access(path)
    return true
  } catch (error) {
    return false
  }
}
```

### npm run build

`gear compile` will basically just babel your source files and write the output into the destination directory.

### npm test

This is where it becomes interesting: `gear type-check` will run babel once, but not completely babeling it, but just to resolve the type syntax Flow does not understand. It then runs flow for static type checking.


## License

Released under the terms of the MIT license.
