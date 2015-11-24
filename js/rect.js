const rect_size = 50;
const rect_corner = 5;

export class Rect {
  constructor(bg_color){
    let rect = new createjs.Shape();
    rect.graphics.beginFill(bg_color).drawRoundRectComplex(0, 0, rect_size, rect_size, rect_corner, rect_corner, rect_corner, rect_corner);
    rect.border = true;
    rect.x = 0;
    rect.y = 0;

    return rect;
  }
}
