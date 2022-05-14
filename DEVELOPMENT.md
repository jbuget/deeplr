# Development guide

## Installation

```shell
git clone git@github.com:jbuget/deeplr.git
cd deeplr
npm install
```

The program includes [Dotenv](https://www.npmjs.com/package/dotenv) to read the Deepl API key if not provided as argument.

So you can copy the `sample.env` file to `.env` file and fill in your Deepl API key or just set an environment/shell variable `DEEPL_API_KEY`.

## Execution

```shell
$ node src/index -i input_file.xlsx -o output_file.xlsx -s FR -t EN-GB,IT [-f 'Title,Body HTML'] [-k <xxx-yyy-zzz>]
```

## Release

1. In `src/index.js`, upgrade the version defined by variable `VERSION` to the next release version (for example, from `0.6.1` to `0.7.0`).
2. Commit the change
3. Execute the following instructions:

```shell
npm version <major|minor|patch>
git push
git push --tags 
npm publish
```
