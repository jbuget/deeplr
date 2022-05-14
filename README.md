# Deeplr

A CLI written in JavaScript/Node.js that translates data from XLSX to XLSX files with Deepl API.

## Usage

### As a binary (with npx/npmjs)

```shell
$ npx deeplr \
      --key xxx-yyy-zzz \
      --input input.xlsx \ 
      --output output.xlsx \
      --source_lang FR \
      --target_langs DE,EN,ES,FR,IT \
      --fields 'Title,Body HTML'

# or with shortcuts
$ npx deeplr -k xxx-yyy-zzz -i input.xlsx -o .output.xlsx -s FR -t DE,EN,ES,FR,IT -f 'Title,Body HTML'
```

### Programmatically

**1.** Copy the `sample.env` file to `.env` file and fill in your Deepl API key.

**2.** Execute the program:

```shell
$ node src/index -i input_file.xlsx -o output_file.xlsx -s FR -t EN-GB,IT
```

### Supported languages

See https://www.deepl.com/docs-api/other-functions/listing-supported-languages/

### XML and HTML support

If a field name to translate includes (case insensitive) "HTML" or "XML", then the Deepl option `tagHandling` with corresponding value (`html` or `xml`) will be set and used.

See https://github.com/DeepLcom/deepl-node#text-translation-options

> ⚠️ The option is marked as "Beta" by Deepl.

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


## Roadmap : 

- Add Typescript support
- Add tests
- Add linting
- Add CI/CD
- Support other input/output formats
- Build better reports
