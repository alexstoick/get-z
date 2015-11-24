export class Board {
  set minNewLetter(minNewLetter) {
    this.minNewLetter = minNewLetter;
  }

  get minNewLetter() {
    return minNewLetter;
  }

  static generateLetterId() {
    return this.minNewLetter + Math.floor(Math.random()*5.0) + 65;
  }
}
