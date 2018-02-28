export class Container{
  constructor() {
    this.container = new createjs.Container();
  }

  set rectObject(rect) {
    this.rect = rect;
  }

  createContainerEvents() {
    let rect = this.rect ;
    let border = rect.borderObject;

    this.container.on("mousedown", function(evt) {
      currentlySelected[currentlySelected.length] = container.rect;
      border.visible = rect.border;
      rect.border = !border.visible;
      stage.update();
      mousedown = true;
    });

    this.container.on("rollover", function(evt) {
      if ( mousedown )  {
        if ( neighbours(rect) && sameLetter(rect)) {
          border.visible = rect.border;
          rect.border = !border.visible;
          stage.update();
          if ( border.visible ) {
            addToSelection(rect);
          }
          else {
            removeFromSelection(rect);
          }

        }
      }
    });
  }
}
