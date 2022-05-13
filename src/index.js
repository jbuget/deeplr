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
  const iBuf = fs.readFileSync(options.input_file);
  const inputWorkbook = XLSX.read(iBuf);
  const inputWorksheet = inputWorkbook.Sheets["Products"];
  const products = XLSX.utils.sheet_to_json(inputWorksheet);

  // Processing
  const sourceLang = options.source_lang;
  const targetLangs = options.target_lang.split(',');
  const translator = new Translator();
  const translatedProductsByTargetLang = await translator.translateMultipleLangs(products, sourceLang, targetLangs);

  // Output
  const workbook = XLSX.utils.book_new();
  // Add original products
  XLSX.utils.book_append_sheet(workbook, inputWorksheet, `Products`);
  // Add translated products
  translatedProductsByTargetLang.forEach(translation => {
    const worksheet = XLSX.utils.json_to_sheet(translation.products);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Products_${translation.lang}`);
  });
  console.log('File generated successfully ✅');
  const oBuf = XLSX.write(workbook, {type: "buffer", bookType: "xlsx"});
  fs.writeFileSync(options.output_file, oBuf);
}

main();
