import * as deepl from 'deepl-node';

export default class Translator {

  constructor(deeplApiKey) {
    this._translator = new deepl.Translator(deeplApiKey);
    this._count = 0;
  }

  async translateMultipleLangs(items, sourceLang, targetLangs, fields) {
    this._nbRequests = items.length * targetLangs.length * fields.length;

    return Promise.all(targetLangs.map(async (targetLang) => {
      const translatedItems = await this.translateSingleLang(items, sourceLang, targetLang, fields);
      return {
        lang: targetLang,
        items: translatedItems
      };
    }));
  }

  async translateSingleLang(items, sourceLang, targetLang, fields) {
    const translatedItems = [];
    for (const item of items) {
      const translatedItem = Object.assign({}, item);

      const requests = {};
      for (const field of fields) {
        if (item[field] && item[field].length > 0) {
          let tagHandling = null;
          if (field.toUpperCase().includes('HTML')) {
            tagHandling = 'html'
          }
          if (field.toUpperCase().includes('XML')) {
            tagHandling = 'xml'
          }
          requests[field] = new Promise(async (resolve, reject) => {
            translatedItem[field] = await this.translateText(item[field], sourceLang, targetLang, {
              preserveFormatting: true,
              tagHandling
            });
            resolve(translatedItem[field]);
          });
        }
      }
      await Promise.all(Object.values(requests));

      translatedItems.push(translatedItem);
    }
    return translatedItems;
  }

  async translateText(text, sourceLang, targetLang, options) {
    try {
      const startTime = new Date();
      const result = await this._translator.translateText(text, sourceLang, targetLang, options);
      const endTime = new Date();
      this._count++;
      console.log(`translation requests done: ${this._count}/${this._nbRequests} (${endTime.getTime() - startTime.getTime()} ms)`);
      return result.text;
    } catch (error) {
      console.error(error);
      return 'ERROR!'
    }
  }
}
