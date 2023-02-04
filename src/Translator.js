import * as deepl from 'deepl-node';

export default class Translator {

  constructor(deeplApiKey) {
    this._translator = new deepl.Translator(deeplApiKey);
    this._count = 0;
  }

  async translateMultipleLangs(items, sourceLang, targetLangs, fields) {
    this._nbRequests = items.length * targetLangs.length * fields.length;

    const sourceAndTargetLangs = [sourceLang, ...targetLangs];

    return Promise.all(sourceAndTargetLangs.map(async (targetLang) => {
      const translatedItems = await this.translateSingleLang(items, sourceLang, targetLang, fields);
      return {
        lang: targetLang,
        items: translatedItems
      };
    }));
  }

  async translateSingleLang(items, sourceLang, targetLang, fields) {
    console.log(`Start translation from ${sourceLang} to ${targetLang}…`)

    const translatedItems = [];
    for (const item of items) {
      const translatedItem = Object.assign({}, item);

      const requests = {};
      for (const field of fields) {
        // define `tagHandling` mode : none, HTML or XML parser
        let tagHandling = undefined;
        if (field.toUpperCase().includes('HTML')) {
          tagHandling = 'html'
        }
        if (field.toUpperCase().includes('XML')) {
          tagHandling = 'xml'
        }

        if (item[field] && item[field].length > 0) {
          requests[field] = new Promise(async (resolve, reject) => {
            if (sourceLang === targetLang) {
              resolve(item[field]);
            } else {
              const translationOptions = { preserveFormatting: true };
              if (tagHandling) translationOptions.tagHandling = tagHandling;
              translatedItem[field] = await this.translateText(item[field], sourceLang, targetLang, translationOptions);
              resolve(translatedItem[field]);
            }
          });
        }
      }
      await Promise.all(Object.values(requests));

      translatedItems.push(translatedItem);
    }

    console.log(`End translation from ${sourceLang} to ${targetLang}`);

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
