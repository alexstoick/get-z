const rect_size = 50;
const rect_corner = 5;

export class Border {
  constructor() {
    let border = new createjs.Shape();
    border.graphics.beginStroke("#000");
    border.graphics.setStrokeStyle(2);
    border.snapToPixel = true;
    border.graphics.drawRect(0, 0, rect_size, rect_size);
    border.x = 0;
    border.y = 0;
    border.visible = false;
    return border;
  }
}
