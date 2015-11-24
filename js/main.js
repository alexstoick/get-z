import $ from 'jquery';
import 'createjs';
import {Board} from './board';
import {Box} from './box';

var mousedown = false;
var currentlySelected = [];
var stage;
var rect_size = 50;
var rect_corner = 5;
var min_new_letter = 0;
var threshold = 10 ;
var times_occured = 0 ;
var matrix = [];
new Box();

function addToSelection(rect) {
  currentlySelected[currentlySelected.length] = rect;
}

function removeFromSelection(rect) {
  currentlySelected.slice(rect);
}

function sameLetter(rect) {
  return rect.letter == currentlySelected[currentlySelected.length-1].letter;
}

function neighbours(rect) {
  let lastRow = currentlySelected[currentlySelected.length-1].row;
  let lastColumn = currentlySelected[currentlySelected.length-1].column;
  let row = rect.row;
  let column = rect.column;
  return (lastRow - 1 <= row && row <= lastRow + 1) &&
    (lastColumn - 1 <= column && column <= lastColumn + 1 );
}

function init() {
  stage = new createjs.Stage("demoCanvas");
  let row=0;
  let start_x = 15 ;
  let start_y = 15 ;
  let limit = 4;
  stage.enableMouseOver(10);
  stage.on("stagemouseup", function(evt) {
    mousedown = false;
    if(currentlySelected.length >= 3) {
      //destroy these
      let lastRect = currentlySelected[currentlySelected.length-1];
      lastRect.letter = String.fromCharCode(lastRect.letter.charCodeAt(0) + 1);
      lastRect.textObject.text = lastRect.letter;
      let letter_id = lastRect.letter.charCodeAt(0) - 65;
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
      currentlySelected.splice(currentlySelected.length-1, 1);
        for(let i = 0 ; i < currentlySelected.length; ++i) {
          let rect = currentlySelected[i];
          let removedRow = rect.row;
          let removedColumn = rect.column;
          stage.removeChild(rect.parent);
          currentlySelected[i] = null;

          for (let j = removedRow -1; j >= 0 ; --j ) {
            matrix[j+1][removedColumn] = matrix[j][removedColumn];
            matrix[j+1][removedColumn].parent.y = matrix[j][removedColumn].parent.y + 60;
            matrix[j+1][removedColumn].row = j+1;
            stage.update();
          }
          //generate new box for this column
          rect = createBox(0, removedColumn, start_x + 55*removedColumn, 15);
            matrix[0][removedColumn] = rect;
          stage.update();
        }
      stage.update();
      currentlySelected = [];
    } else {
      for(let i = 0 ; i < currentlySelected.length; ++i) {
        currentlySelected[i].borderObject.visible = false;
        currentlySelected[i].border = true;
      }
      stage.update();
    }
    currentlySelected = [];
  });
  for( let row = 0 ; row < 6 ; ++ row ) {
    matrix[row] = [];
    for ( let i = 0 ; i < 8; ++ i ) {
      let rect = createBox(row, i, start_x + 55*i,15 + 60*row);
      matrix[row][i] = rect;
    }
  }

}

$(document).ready(function(){
  init();
});
