import 'dotenv/config'
import Translator from "./Translator.js";

async function main() {
  const translator = new Translator();
  const translation = await translator.translate();
  console.log(translation.text);
}

main();
