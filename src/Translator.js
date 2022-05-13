import * as deepl from 'deepl-node';
import Translation from "./Translation.js";

export default class Translator {

  constructor() {
    const authKey = process.env.DEEPL_API_KEY;
    this._translator = new deepl.Translator(authKey);
  }

  async translate() {
    const result = await this._translator.translateText('Hello, world!', null, 'fr');

    const translation = new Translation(result);

    return translation;
  }

}
