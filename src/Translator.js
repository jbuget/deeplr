import * as deepl from 'deepl-node';

export default class Translator {

  constructor(deeplApiKey) {
    this._translator = new deepl.Translator(deeplApiKey);
    this._count = 0;
  }

  async translateMultipleLangs(products, sourceLang, targetLangs, fields) {
    return Promise.all(targetLangs.map(async (targetLang) => {
      const translatedProducts = await this.translateSingleLang(products, sourceLang, targetLang, fields);
      return {
        lang: targetLang,
        products: translatedProducts
      };
    }));
  }

  async translateSingleLang(products, sourceLang, targetLang, fields) {
    const translatedProducts = [];
    for (const product of products) {
      const translatedProduct = Object.assign({}, product);

      const requests = {};
      for (const field of fields) {
        if (product[field] && product[field].length > 0) {
          let tagHandling = null;
          if (field.toUpperCase().includes('HTML')) {
            tagHandling = 'html'
          }
          if (field.toUpperCase().includes('XML')) {
            tagHandling = 'xml'
          }
          requests[field] = new Promise(async (resolve, reject) => {
            translatedProduct[field] = await this.translateText(product[field], sourceLang, targetLang, {
              preserveFormatting: true,
              tagHandling
            });
            resolve(translatedProduct[field]);
          });
        }
      }
      await Promise.all(Object.values(requests));

      translatedProducts.push(translatedProduct);
    }
    return translatedProducts;
  }

  async translateText(text, sourceLang, targetLang, options) {
    try {
      console.log(`count = ${this._count}`);
      const result = await this._translator.translateText(text, sourceLang, targetLang, options);
      this._count++;
      return result.text;
    } catch (error) {
      console.error(error);
      return 'ERROR!'
    }
  }
}
