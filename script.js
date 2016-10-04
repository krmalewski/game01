// Set the initial point value to zero
console.log('JS connected')
var points = 0;


// write a function that makes a div appear and grow a bit
// function grow1() {
//   $('#one').fadeTo(100, 1);
//   $('#one').animate({
//     height: '50px',
//     width: '50px',
//   }, 1000)
//   setInterval(shrink, 4000)
// }

// // have a setInterval function that continues to call the appear function
// setInterval(grow1, 5000)


// // write a function that makes a div shrink and disappear
// function shrink() {
//   console.log('shrink')
//   $('#one').animate({
//     height: '0px',
//     width: '0px'
//   })
// }


// This function will respond to the users mouseclick on the appearing item
// and will cause the item to become transparent (in the eyes of the player
// How will you make sure they can only click once????
// I will also try to update the points live at the top of the screen
function catchMe(event) {
  $(event.target).css({
    height: '0px',
    // width: '0px'
  })
  points = points + 100;
}

// I keep this open to the entire body since the items will be located at
// different parts of the screen
$('body').click(catchMe)







function position(event) {
  console.log('I\'m here');
  var x = event.pageX;
  var y = event.pageY;
  console.log('x = ' + x + ', y = ' + y)

}


$('html').click(position)
