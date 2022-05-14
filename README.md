# Deeplr

A CLI written in JavaScript/Node.js that translates data from XLSX to XLSX files with Deepl API.

## Usage

### With npmjs/npx

```shell
$ npx deeplr \
      --key xxx-yyy-zzz \
      --input input.xlsx \ 
      --output output.xlsx \
      --source_lang FR \
      --target_langs DE,EN,ES,FR,IT

# or with shortcuts
$ npx deeplr -k xxx-yyy-zzz -i input.xlsx -o .output.xlsx -s FR -t DE,EN,ES,FR,IT
```

### From source code

**1.** Copy the `sample.env` file to `.env` file and fill in your Deepl API key.

**2.** Execute the program:

```shell
$ node src/index -i input_file.xlsx -o output_file.xlsx -s FR -t EN-GB,IT
```

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

- Improve arguments defaults/error handling
- Add Typescript support
- Add tests
- Add linting
- Add CI/CD
- Support other input/output formats
- Add execution metrics
- Build better reports
