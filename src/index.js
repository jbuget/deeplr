#!/usr/bin/env node

import 'dotenv/config';
import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import Translator from './Translator.js';
import { Command } from 'commander';

const VERSION = '0.9.0';

const program = new Command();

program
  .name('deeplr')
  .description('A CLI written in JavaScript/Node.js that translates data from XLSX to XLSX files with Deepl API.')
  .version(VERSION);

program
  .option('-k, --key <string>', 'Deepl API key')
  .requiredOption('-i, --input_file <file_path.xlsx>', 'input XLSX file to translate [required]')
  .requiredOption('-o, --output_file <file_path.xlsx>', 'output XLSX file with translations (one tab by trans. lang.)  [required]')
  .requiredOption('-s, --source_lang <FR>', 'source language [required]')
  .requiredOption('-t, --target_langs <DE,EN-GB,IT>', 'list of target languages, separated with a comma [required]')
  .option('-f, --fields <Title,Body HTML>', 'list of fields to be translated, separated with a comma')
  .option('-w, --worksheet <Products>', 'workbook sheet to translate');

program.parse();

const options = program.opts();

console.table(options);

/* ----------- */

function isUndefinedOrBlank(str) {
  return (!str || /^\s*$/.test(deeplApiKey));
}

// Get Deepl API key (required for translation)
const deeplApiKey = options.key || process.env.DEEPL_API_KEY;
if (isUndefinedOrBlank(deeplApiKey)) {
  throw new Error('Missing Deepl API key');
}

// Check input file path
if (!fs.existsSync(options.input_file)) {
  throw new Error('Wrong input file path');
}

if (isUndefinedOrBlank(options.worksheet)) {
  options.worksheet = 'Products';
}

if (isUndefinedOrBlank(options.fields)) {
  options.fields = 'Title,Body HTML';
}

/* ----------- */

async function main() {
  console.time('process');

  // Input
  console.time('input');
  const iBuf = fs.readFileSync(options.input_file);
  const inputWorkbook = XLSX.read(iBuf);
  const inputWorksheet = inputWorkbook.Sheets[options.worksheet];
  const items = XLSX.utils.sheet_to_json(inputWorksheet);
  console.timeEnd('input');

  // Processing
  console.time('processing');
  const sourceLang = options.source_lang;
  const targetLangs = options.target_langs.split(',');
  const fields = options.fields.split(',');
  const translator = new Translator(deeplApiKey);
  const translatedItemsByTargetLang = await translator.translateMultipleLangs(items, sourceLang, targetLangs, fields);
  console.timeEnd('processing');

  // Output
  console.time('output');
  const workbook = XLSX.utils.book_new();
  translatedItemsByTargetLang.forEach(translation => {
    // Replace too long cell by "error_field_text_too_long"
    translation.items.forEach((item) => {
      for (const field of fields) {
        if (item[field] && item[field].length > 32767) {
          item[field] = 'error_field_text_too_long';
        }
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(translation.items);
    XLSX.utils.book_append_sheet(workbook, worksheet, `${options.worksheet}_${translation.lang}`);
  });
  console.log('File generated successfully ✅');
  const oBuf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  fs.writeFileSync(options.output_file, oBuf);
  console.timeEnd('output');

  console.timeEnd('process');
}

main();
