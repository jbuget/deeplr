# Deeplr

## ⚠️ Warning!

This project is a work in progress!

## Usage

**1.** Copy the `sample.env` file to `.env` file and fill in your Deepl API key.

**2.** Execute the program:

```shell
$ node src/index -i input_file.xlsx -o ouput_file.xlsx -s FR -t EN-GB,IT
```

## Roadmap : 

- Packaging as an official npm binary / dependency 

```shell
$ npx deeplr -i input.xlsx -o .output.xlsx -s FR -t DE,EN,ES,FR,IT
```

- Improve arguments defaults/error handling
- Add Typescript support
- Add tests
- Add linting
- Add CI/CD
- Support other input/output formats
- Add execution metrics
- Build better reports
