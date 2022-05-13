import 'dotenv/config'
import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import Translator from './Translator.js';

async function main() {
  // Input
  const buf = fs.readFileSync('./data/dataset_02.xlsx');
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
  const data = XLSX.writeFile(outputWorkbook, './data/output.xlsx');

}

const args = process.argv.slice(2)

main();
