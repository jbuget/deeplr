import 'dotenv/config'
import * as deepl from 'deepl-node';

const authKey = process.env.DEEPL_API_KEY; // Replace with your key
const translator = new deepl.Translator(authKey);

(async () => {
  const result = await translator.translateText('Hello, world!', null, 'fr');
  console.log(result.text); // Bonjour, le monde !
})();
