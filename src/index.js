import 'dotenv/config'
import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import Translator from './Translator.js';
import { Command } from 'commander';

const program = new Command();

program
  .name('deeplr')
  .description('CLI to translate files with Deepl API')
  .version('0.0.1');

program
  .option('-i, --input_file <string>')
  .option('-o, --output_file <string>')
  .option('-s, --source_lang <string>')
  .option('-t, --target_lang <string>')

program.parse();

const options = program.opts();

console.table(options);

async function main() {
  // Input
  const buf = fs.readFileSync(options.input_file);
  const inputWorkbook = XLSX.read(buf);
  const inputWorksheet = inputWorkbook.Sheets["Products"];

  // Processing
  const translator = new Translator();
  const translation = await translator.translate();

  // Output
  console.log(translation.text);
  const outputWorkbook = XLSX.utils.book_new();
  const outputWorksheet = XLSX.utils.aoa_to_sheet([
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"]
  ]);
  const data = XLSX.writeFile(outputWorkbook, options.output_file);
}

main();
