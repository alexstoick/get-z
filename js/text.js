export class Text {
  constructor(letter) {
    let text = new createjs.Text(letter, "30px Arial", "black" );
    text.textBaseline = "alphabetic";
    text.x = 15;
    text.y = 35;
    return text;
  }
}
