import {Board} from './board';
import {Rect} from './rect';
import {Border} from './border';
import {Text} from './text';
import {Container} from './container';

const bg_colors = [ "#1abc9c",  "#f39c12", "#9b59b6", "#34495e", "#95a5a6", "#e74c3c", "#95a5a6", "#c0392b", "#8e44ad", "#193441", "#91AA9D", "#F0C600", "#8EA106", "#484A47", "#687D77", "#353129", "#174C4F", "#FF9666", "#FFE184", "#00436E", "#21F53A", "#BC00FF", "#FF8AC3", "#502700", "#146E5B", "#f39c12"];
export class Box {
  constructor(row, column, x, y) {
    let letter_id = Board.generateLetterId();
    let letter = String.fromCharCode(letter_id);
    let rect = new Rect(bg_colors[letter_id-65]);
    rect.borderObject = new Border();
    rect.textObject = new Text(letter);
    rect.row = row;
    rect.column = column;
    rect.letter = letter;

    let container = new Container();
    console.log(container);
    container.x = x;
    container.y = y;
    container.rectObject = rect;
    container.createContainerEvents();
    container.container.addChild(rect, rect.textObject, rect.borderObject);

    stage.addChild(container);
    stage.update();

    return rect;
  }

  get letterId() {
    return letterId;
  }
}
