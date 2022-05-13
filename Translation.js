export default class Translation {

  constructor(result) {
    this._result = result;
  }

  get text() {
    return this._result.text;
  }
}
