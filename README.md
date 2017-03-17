# Gear

Bootstrap typed JavaScript projects in less than a minute or easily add types to untyped code. Built around [Babel 7](https://babeljs.io/), [Flow](https://flowtype.org/), [babel-preset-env](https://babeljs.io/) and [functional type syntax](https://github.com/andywer/proposal-double-colon-types).

The tool is written using itself. So have a look at its own code if your interested, [type-check.js](./src/commands/type-check.js) is quite a good example, for instance.

I wanted to play a little with Hindley-Milner types in JavaScript, see how it feels and by the way reduce the boilerplate necessary to get starting with typed JavaScript.

⚠️ *Caution: This is highly experimental.*


## Installation

```sh
yarn add --dev @andywer/gear
```

or using npm

```sh
npm install --save-dev @andywer/gear
```


## Usage

```json
{
  "scripts": {
    "build": "gear compile src/ -d lib/",
    "test": "gear type-check src/"
  }
}
```

### Compile sources

```sh
# Run Babel
gear compile src/ -d lib/
```

### Type checking

```sh
# Run Babel & Flow
gear type-check src/
```

Will create a `.flowcheck` directory, babel the sources, but not completely, just translating the custom type syntax Flow does not understand. Creates a `.flowconfig` and runs Flow.


## Write some code

You can write JS code with Flow's regular type syntax, with Hindley-Milner types or without types (Flow will infer types as good as possible).

Gimmick: When writing Hindley-Milner types (functional style) you don't need to add `// @flow` to the file. It will automatically be added on first encounter of a type.

```js
exists :: string => Promise<bool>

/** Checks if a file or directory exists */
async function exists (path) {
  try {
    await fs.access(path)
    return true
  } catch (error) {
    return false
  }
}
```


## License

Released under the terms of the MIT license.
