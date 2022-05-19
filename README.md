# Deeplr

A CLI written in JavaScript/Node.js that translates data from XLSX to XLSX files with Deepl API.

## Use case

Imagine you manage an e-commerce on Shopify, for french market (`FR`), with tens, hundreds or more products (with their variants) and you intend to open up your business internationally (England, Germany, Spain and Italy).

Instead of losing hours with manual translation, you can use the [Deepl API](https://www.deepl.com/fr/docs-api/) to operate it automatically.

In order to that, you can: 
1. extract your product database as XLSX file (for example with [Matrixify](https://apps.shopify.com/excel-export-import)), 
2. execute `deeplr` program with target languages (`EN-GB`, `DE`, `ES`, `IT`) (it may take few up to 20 minutes)
3. re-import data with Matrixify
4. enjoy 🚀

## Usage

```shell
$ npx deeplr \
      --key xxx-yyy-zzz \
      --input input.xlsx \ 
      --output output.xlsx \
      --source_lang FR \
      --target_langs DE,EN,ES,FR,IT \
      --fields "Title,Body HTML" \
      --worksheet "Products"

# or with shortcuts
$ npx deeplr \
      -k xxx-yyy-zzz \ 
      -i input.xlsx \ 
      -o output.xlsx \ 
      -s FR \
      -t DE,EN,ES,FR,IT \ 
      -f "Title,Body HTML" \
      -w "Products"
```

### Supported languages

See https://www.deepl.com/docs-api/other-functions/listing-supported-languages/

### XML and HTML support

If a field name to translate includes (case insensitive) "HTML" or "XML", then the Deepl option `tagHandling` with corresponding value (`html` or `xml`) will be set and used.

See https://github.com/DeepLcom/deepl-node#text-translation-options

> ℹ️ ️For the moment, the option is marked as "Beta" by Deepl.

## Benchmark

> **Equipment:**
> - MacBook Pro (15 pouces, 2016)
> - MacOS Monterey 12.3.1
> - 2,7 GHz Intel Core i7 quatre cœurs
> - 16 Go 2133 MHz LPDDR3
> 
> **Network:**
> - ping: 18ms
> - descendant: 488.42Mbps
> - ascendant: 486.30Mbps

| Products | Languages | Time    |
|----------|-----------|---------|
| 47       | 1         | 11.250s |
| 47       | 2         | 12.193s |
| 47       | 3         | 13.316s |


## Possible improvements:

- Add Typescript support
- Add tests
- Add linting
- Add CI/CD
- Support other input/output formats
- Build better reports
