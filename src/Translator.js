import * as deepl from 'deepl-node';

export default class Translator {

  constructor() {
    const authKey = process.env.DEEPL_API_KEY;
    this._translator = new deepl.Translator(authKey);
    this._count = 0;
  }

  async translateMultipleLangs(products, sourceLang, targetLangs) {
    return Promise.all(targetLangs.map(async (targetLang) => {
      const translatedProducts = await this.translateSingleLang(products, sourceLang, targetLang);
      return {
        lang: targetLang,
        products: translatedProducts
      };
    }));
  }

  async translateSingleLang(products, sourceLang, targetLang) {
    const translatedProducts = [];
    for (const product of products) {
      const translatedProduct = Object.assign({}, product);

      const requests = {};

      if (product['Title'] && product['Title'].length > 0) {
        requests['Title'] = this.translateText(product['Title'], sourceLang, targetLang, { preserveFormatting: true });
      }
      if (product['Body HTML'] && product['Body HTML'].length > 0) {
        requests['Body HTML'] = this.translateText(product['Body HTML'], sourceLang, targetLang, {
          preserveFormatting: true,
          tagHandling: 'html'
        });
      }

      const responses = await Promise.all(Object.values(requests));

      for (const [key, value] of Object.entries(responses)) {
        translatedProduct[key] = value;
      }

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
