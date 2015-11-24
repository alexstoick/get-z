var mousedown = false;
var currentlySelected = [];
var stage;
var rect_size = 50;
var rect_corner = 5;
var min_new_letter = 0;
var threshold = 10 ;
var times_occured = 0 ;
var matrix = [];

function generateLetterId() {
  return min_new_letter + Math.floor(Math.random()*5.0) + 65;
}

function createBox(row, column, x, y) {
  letter_id = generateLetterId();
  letter = String.fromCharCode(letter_id);
  rect = createRect(bg_colors[letter_id-65]);
  rect.borderObject = createBorder();
  rect.textObject = createText(letter);
  rect.row = row;
  rect.column = column;
  rect.letter = letter;

  container = createContainer();
  container.x = x;
  container.y = y;
  container.rect = rect;
  createContainerEvents(container);
  container.addChild(rect, rect.textObject, rect.borderObject);

  stage.addChild(container);
  stage.update();

  return rect;
}

function createBorder() {
  var border = new createjs.Shape();
  border.graphics.beginStroke("#000");
  border.graphics.setStrokeStyle(2);
  border.snapToPixel = true;
  border.graphics.drawRect(0, 0, rect_size, rect_size);
  border.x = 0;
  border.y = 0;
  border.visible = false;
  return border;
}

function createText(letter) {
  var text = new createjs.Text(letter, "30px Arial", "black" );
  text.textBaseline = "alphabetic";
  text.x = 15;
  text.y = 35;
  return text;
}

function createRect(bg_color) {
  var rect = new createjs.Shape();
  rect.graphics.beginFill(bg_color).drawRoundRectComplex(0, 0, rect_size, rect_size, rect_corner, rect_corner, rect_corner, rect_corner);
  rect.border = true;
  rect.x = 0;
  rect.y = 0;

  return rect;
}
function createContainer() {
  var container = new createjs.Container();

  return container;
}

function createContainerEvents(container) {
  var rect = container.rect ;
  var border = rect.borderObject;

  container.on("mousedown", function(evt) {
    currentlySelected[currentlySelected.length] = container.rect;
    border.visible = rect.border;
    rect.border = !border.visible;
    stage.update();
    mousedown = true;
  });

  container.on("rollover", function(evt) {
    if ( mousedown )  {
      if ( neighbours(rect) && sameLetter(rect)) {
        border.visible = rect.border;
        rect.border = !border.visible;
        stage.update();
        if ( border.visible ) {
          addToSelection(rect)
        }
        else {
          removeFromSelection(rect)
        }

      }
    }
  });
}
function addToSelection(rect) {
  currentlySelected[currentlySelected.length] = rect;
}

function removeFromSelection(rect) {
  for(i=0; i < currentlySelected.length; ++i) {
    if ( currentlySelected[i].row == rect.row &&
        currentlySelected[i].column == rect.column) {
      currentlySelected.
    }
  }
  console.log("should remove from selection");
}

function sameLetter(rect) {
  return rect.letter == currentlySelected[currentlySelected.length-1].letter;
}

function neighbours(rect) {
  lastRow = currentlySelected[currentlySelected.length-1].row;
  lastColumn = currentlySelected[currentlySelected.length-1].column;
  row = rect.row;
  column = rect.column;
  return (lastRow - 1 <= row && row <= lastRow + 1) &&
    (lastColumn - 1 <= column && column <= lastColumn + 1 );
}

var bg_colors = [ "#1abc9c",  "#f39c12", "#9b59b6", "#34495e", "#95a5a6", "#e74c3c", "#95a5a6", "#c0392b", "#8e44ad", "#193441", "#91AA9D", "#F0C600", "#8EA106", "#484A47", "#687D77", "#353129", "#174C4F", "#FF9666", "#FFE184", "#00436E", "#21F53A", "#BC00FF", "#FF8AC3", "#502700", "#146E5B", "#f39c12"];


function init() {
  stage = new createjs.Stage("demoCanvas");
  row=0;
  start_x = 15 ;
  start_y = 15 ;
  limit = 4;
  stage.enableMouseOver(10);
  stage.on("stagemouseup", function(evt) {
    mousedown = false;
    if(currentlySelected.length >= 3) {
      //destroy these
      lastRect = currentlySelected[currentlySelected.length-1];
      lastRect.letter = String.fromCharCode(lastRect.letter.charCodeAt(0) + 1);
      lastRect.textObject.text = lastRect.letter;
      letter_id = lastRect.letter.charCodeAt(0) - 65;
      if ( letter_id > (5+min_new_letter) && times_occured > threshold ) {
        ++ min_new_letter ;
        threshold = threshold + min_new_letter + min_new_letter*min_new_letter ;
        times_occured = 0 ;
      } else {
        ++ times_occured;
      }
      lastRect.graphics._fill.style = bg_colors[letter_id];
      lastRect.borderObject.visible = false;
      lastRect.border = true;
      currentlySelected.splice(currentlySelected.length-1, 1)
        for(i = 0 ; i < currentlySelected.length; ++i) {
          rect = currentlySelected[i];
          removedRow = rect.row;
          removedColumn = rect.column;
          stage.removeChild(rect.parent);
          currentlySelected[i] = null;

          for ( j = removedRow -1; j >= 0 ; --j ) {
            matrix[j+1][removedColumn] = matrix[j][removedColumn];
            matrix[j+1][removedColumn].parent.y = matrix[j][removedColumn].parent.y + 60;
            matrix[j+1][removedColumn].row = j+1;
            stage.update();
          }
          //generate new box for this column
          rect = createBox(0, removedColumn, start_x + 55*removedColumn, 15)
            matrix[0][removedColumn] = rect;
          stage.update();
        }
      stage.update();
      currentlySelected = [];
    } else {
      for(i = 0 ; i < currentlySelected.length; ++i) {
        currentlySelected[i].borderObject.visible = false;
        currentlySelected[i].border = true;
      }
      stage.update();
    }
    currentlySelected = [];
  })
  for( row = 0 ; row < 6 ; ++ row ) {
    matrix[row] = [];
    for ( i = 0 ; i < 8; ++ i ) {
      rect = createBox(row, i, start_x + 55*i,15 + 60*row);
      matrix[row][i] = rect;
    }
  }

}
