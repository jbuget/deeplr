import * as deepl from 'deepl-node';

export default class Translator {

  constructor() {
    const authKey = process.env.DEEPL_API_KEY;
    this._translator = new deepl.Translator(authKey);
  }

  async translateMultipleLangs(products, sourceLang, targetLangs) {

    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    return targetLangs.reduce(async (results, targetLang) => {
      console.log(`Translating: ${targetLang}`);

      const translatedProducts = await this.translateSingleLang(products, sourceLang, targetLang);
      results.push({
        lang: targetLang,
        products: translatedProducts
      });

      await sleep(1000);

      return results;
    }, []);


    return await Promise.all(targetLangs.map(async (targetLang) => {
      console.log(`Translating: ${targetLang}`);
      const translatedProducts = await this.translateSingleLang(products, sourceLang, targetLang);
      return {
        lang: targetLang,
        products: translatedProducts
      };
    }))
  }

  async translateSingleLang(products, sourceLang, targetLang) {
    const translatedProducts = await Promise.all(products.map(async (product) => {
      const translatedProduct = Object.assign({}, product);

      if (product['Title'] && product['Title'].length > 0) {
        translatedProduct['Title'] = (await this.translateText(product['Title'], sourceLang, targetLang, { preserveFormatting: true })).text;
      } else {
        translatedProduct['Title'] = 'ERROR! Field "Title" is empty or null'
      }
      if (product['Body HTML'] && product['Body HTML'].length > 0) {
        translatedProduct['Body HTML'] = (await this.translateText(product['Body HTML'], sourceLang, targetLang, { preserveFormatting: true, tagHandling: 'html' })).text;
      } else {
        translatedProduct['Body HTML'] = 'ERROR! Field "Body HTML" is empty or null';
      }
      return translatedProduct;
    }));
    return translatedProducts;
  }

  async translateText(text, sourceLang, targetLang, options) {
    try {
      return this._translator.translateText(text, sourceLang, targetLang, options);
    } catch (error) {
      console.error(error);
      return 'ERROR!'
    }
  }
}
