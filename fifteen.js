// Deborah Hier - This file contains my JavaScript code for the Fifteen Puzzle

$(function() {
  "use strict";
  $("#puzzlearea > div").addClass("puzzlepiece");
  $("#puzzlearea > div").addClass("movablepiece");

  // return the empty square's current neighbors
  function getNeighbors(empty_x, empty_y) {
    var up = getSquare(empty_x, empty_y - 1);
    var down = getSquare(empty_x, empty_y + 1);
    var right = getSquare(empty_x + 1, empty_y);
    var left = getSquare(empty_x - 1, empty_y);

    return [up, down, right, left];
  }

  // toggle 'movablepiece' class when the mouse enters or exits the area of
  // a puzzle piece only if it is one of the empty square's neighbors
  function hover(event, empty_coords) {
    var xy = empty_coords.split("/");
    var x = xy[0];                      // x,y coords of empty square
    var y = xy[1];
    var empty_x = x / 100;              // which square x and y it is (0, 1, 2, 3)
    var empty_y = y / 100;
    // get (possible) neighbors:
    var neighbors = getNeighbors(empty_x, empty_y);
    var up    = neighbors[0];
    var down  = neighbors[1];
    var right = neighbors[2];
    var left  = neighbors[3];

    // if the square the mouse is on is neighbors with the empty square, then change text and border color to red
    if ((up != "none") && (event.target == up)) {
      event.target.classList.toggle("movablepiece");
    } else if ((down != "none") && (event.target == down)) {
      event.target.classList.toggle("movablepiece");
    } else if ((right != "none") && (event.target == right)) {
      event.target.classList.toggle("movablepiece");
    } else if ((left != "none") && (event.target == left)) {
      event.target.classList.toggle("movablepiece");
    }
  }

  // return a random int in the range 0 - (max - 1)
  function randInt(max) {
    var rand_choice = Math.floor(Math.random() * Math.floor(max));
    return rand_choice;
  }

  // when the player clicks one of the puzzle pieces
  function puzzleClick(event, empty_coords) {
    var xy = empty_coords.split("/");
    var empty_x = xy[0];
    var empty_y = xy[1];
    // save info on clicked piece
    var left = parseInt(event.target.style.left);
    var top = parseInt(event.target.style.top);
    var x = left / 100;
    var y = top / 100;
    var new_top = top;
    var new_left = left;
    var new_x = x;
    var new_y = y;

   // are any of its neighbors the empty square?
   // check above, below, right, and left
   if ((x * 100 == empty_x) && (top - 100) == empty_y) {
     new_y = y - 1;
     new_top = empty_y;
     new_left = empty_x;
     empty_y = top;
     empty_x = left;
   } else if ((x * 100 == empty_x) && (top + 100) == empty_y) {
     new_y = y + 1;
     new_top = empty_y;
     new_left = empty_x;
     empty_y = top;
     empty_x = left;
   } else if ((y * 100 == empty_y) && (left + 100) == empty_x) {
     new_x = x + 1;
     new_top = empty_y;
     new_left = empty_x;
     empty_y = top;
     empty_x = left;
   } else if ((y * 100 == empty_y) && (left - 100) == empty_x) {
     new_x = x - 1;
     new_top = empty_y;
     new_left = empty_x;
     empty_y = top;
     empty_x = left;
   }

   // if one of its neighbors is the empty square:
   var new_id = "square_" + new_x + "_" + new_y;  //  1) change its id to its new x y vals
   event.target.id = new_id;
   event.target.style.top =  new_top + "px";      //  2) move into position of empty square
   event.target.style.left = new_left + "px";
   var new_empty_xy = empty_x + "/" + empty_y;    //  3) save the empty square's new coords
   return new_empty_xy;
 }

 // shuffle the tiles
 function shuffle(event, empty_coords) {
   // swap empty square with a random neighbor (function will be repeated 200 times)
   var xy = empty_coords.split("/");
   var x = xy[0];                       // x and y coords of empty square
   var y = xy[1];
   var empty_x = x / 100;               // which square x and y it is (0, 1, 2, 3)
   var empty_y = y / 100;
   var new_empty_x = empty_x;           // new x and y coords of empty square
   var new_empty_y = empty_y;
   var rand_choice;
   var rand_square;

   // get (possible) neighbors:
   var neighbors = getNeighbors(empty_x, empty_y);
   var up    = neighbors[0];
   var down  = neighbors[1];
   var right = neighbors[2];
   var left  = neighbors[3];

   var move_up, move_down, move_left, move_right = false;

   // if the empty square is not on any edge...
   if (up != "none" && down != "none" && right != "none" && left != "none") {
     // get random int between 0 and 3  (up, down, left, right)
     rand_choice = randInt(4);
     if (rand_choice == 0)        { move_up = true;    }
     else if (rand_choice == 1)   { move_down = true;  }
     else if (rand_choice == 2)   { move_right = true; }
     else                         { move_left = true;  }
   }

   // if the empty square is in the top row and leftmost column (0, 0) (has 2 neighboring squares)
   else if (left == "none" && up == "none") {
     // get random int between 0 and 1  (down, right)
     rand_choice = randInt(2);
     if (rand_choice == 0)   { move_down = true;  }
     else                    { move_right = true; }
   }

   // if the empty square is in the bottom row and rightmost column (3, 3)
   else if (down == "none" && right == "none") {
     // get random int between 0 and 1  (up, left)
     rand_choice = randInt(2);
     if (rand_choice == 0)    { move_up = true; }
     else                     { move_left = true; }
   }

   // if the empty square is in the top row and rightmost column (3, 0)
   else if (up == "none" && right == "none") {
     // get random int between 0 and 1  (down, left)
     rand_choice = randInt(2);
     if (rand_choice == 0)    {  move_down = true;  }
     else                     {  move_left = true;  }
   }

   // if the empty square is in the bottom row and leftmost column (0, 3) (has 2 neighboring squares)
   else if (down == "none" && left == "none") {
     // get random int between 0 and 1  (up, right)
     rand_choice = randInt(2);
     if (rand_choice == 0)     {  move_up = true;    }
     else                      {  move_right = true; }
   }

   // if the empty square is in the top row (has 3 neighboring squares)
   else if (up == "none" || empty_y == 0) {
     // get random int between 0 and 2  (down, left, right)
     rand_choice = randInt(3);
     if (rand_choice == 0)      {  move_down = true;  }
     else if (rand_choice == 1) {  move_left = true;  }
     else                       {  move_right = true; }
   }

   // if the empty square is in the leftmost column (has 3 neighboring squares)
   else if (left == "none" || empty_x == 0) {
     // get random int between 0 and 2  (up, down, right)
     rand_choice = randInt(3);
     if (rand_choice == 0)      {  move_up = true;    }
     else if (rand_choice == 1) {  move_down = true;  }
     else                       {  move_right = true; }
   }

   // if the empty square is in the rightmost column (has 3 neighboring squares)
   else if (right == "none" || empty_x == 3) {
     // get random int between 0 and 2  (up, down, right)
     rand_choice = randInt(3);
     if (rand_choice == 0)      { move_up = true;   }
     else if (rand_choice == 1) { move_down = true; }
     else                       { move_left = true; }
   }

   // if the empty square is in the bottom row (has 3 neighboring squares)
   else if (down == "none" || empty_y == 3) {
     // get random int between 0 and 2  (up, down, right)
     rand_choice = randInt(3);
     if (rand_choice == 0)      { move_up = true;    }
     else if (rand_choice == 1) { move_left = true;  }
     else                       { move_right = true; }
   }

   // now move the empty square based on the random choices made (and options available)
   if (move_up == true) {
     rand_square = up;
     new_empty_y = empty_y - 1;
   }
   else if (move_down == true) {
     rand_square = down;
     new_empty_y = empty_y + 1;
   }
   else if (move_right == true) {
     rand_square = right;
     new_empty_x = empty_x + 1;
   }
   else if (move_left == true) {
     rand_square = left;
     new_empty_x = empty_x - 1;
   }

   // put the random square in the empty square's position
   rand_square.style.top = y + "px";
   rand_square.style.left = x + "px";

   // change the random square's id
   var new_id = "square_" + empty_x + "_" + empty_y;
   rand_square.id = new_id;

   // keep track of empty square's new position
   var new_empty_x_coord = new_empty_x * 100;
   var new_empty_y_coord = new_empty_y * 100;
   var new_empty_xy =  new_empty_x_coord + "/" + new_empty_y_coord;

   return new_empty_xy;
 }

 // return the DOM object for the corresponding square,
 // "none" if it does not exist
 function getSquare(x, y) {
   const full_id = "square_" + x + "_" + y;
   const square = document.getElementById(full_id);
   if (square) {
     return square;
   } return "none";
 }

  window.addEventListener("load", () => {
    // empty square starts off at this position (before shuffle)
    var empty_xy = "300/300";

    const pieces = document.querySelectorAll("#puzzlearea > div")
    pieces.forEach((piece) => {
      piece.classList.add("puzzlepiece");
      piece.classList.toggle("movablepiece");
      const num = parseInt(piece.textContent) - 1;
      const x = num % 4;
      const y = Math.floor(num / 4);
      const left = x * 100;
      const top = y * 100;
      piece.style.top = top + "px";
      piece.style.left = left + "px";

      // special thanks to my nephew Sam for being such a great model!
      piece.style.backgroundImage = "url('background.jpg')";
      if (top == 0 && left == 0) {
        piece.style.backgroundPosition = left + "px" + " " + top + "px";
      } else if (top > 0 && left == 0) {
        piece.style.backgroundPosition = left + "px" + " -" + top + "px";
      } else if (top == 0 && left > 0 ) {
        piece.style.backgroundPosition = "-" + left + "px" + " " + top + "px";
      } else {
        piece.style.backgroundPosition = "-" + left + "px" + " -" + top + "px";
      }

      // give each piece an initial id in the form "square_x_y"
      const piece_id = "square_" + x + "_" + y;
      piece.id =  piece_id;

      piece.addEventListener("mouseover", () => {
        hover(event, empty_xy);
      });
      piece.addEventListener("mouseout", () => {
        hover(event, empty_xy);
      });
      piece.addEventListener("click", () => {
        empty_xy = puzzleClick(event, empty_xy);
      });

    });
     var shufflebutton = document.getElementById("shufflebutton");
     shufflebutton.addEventListener("click", () => {    // swap empty square with random neighbor
       empty_xy = shuffle(event, empty_xy);
       var i;
       for (i = 0; i <= 200; i++) {                    // repeat 200 more times
         empty_xy = shuffle(event, empty_xy);
       }
     });

   });
  });
