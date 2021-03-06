console.log('JS connected')

$( document ).ready(function() {
    console.log( "ready!" );
  // Pull the info from the form the search bar at the top of the page
  // and set it to a variable
  var formInfo = window.location.search;

  // Since we are trying to get the nickname of the player to display on our
  // gamr board, we see that it is at the end of the string in the search bar,
  // right after the last equal sign. We will look from the last equal sign and
  // return the index of that plus one, which will be the start of our string.
  // Reference code from html forms lab:  https://github.com/krmalewski/html_forms_lab
  function delineate(str) {
    point = str.lastIndexOf("=");
    // The string will be cut into a substring starting after the "="
    var nickName = (str.substring(point+1));
    // Check to see if the player accidently put a space after their name, this will
    // cause a "+" to appear at the end of the their nickname on the game screen
    if (nickName.charAt(nickName.length-1) === '+') {
      // If they did, chop the ending character off of the substring
      return nickName.substring(0,nickName.length-1);
    } else {
      //
      return nickName;
    }
  }

  var name = delineate(formInfo);
  var username = $('.username')
  // Once username is delineated from the url, it will be hidden in a secret form that
  // will pass this information on to the next round if the player moves on.
  username.attr("value", name).hide();


  // Input the name that we pulled from the form into our name div so it will display
  // on the screen
  var nameBox = $('#name');
  var player1 = nameBox.text();
  nameBox.text(player1 + " " + name);


  // After losing one life and replaying the round, we will need to get the number
  // of lives left from the URL string in a simular way as we did with the nickname
  // The lives will come before the name, after the first "=" so we need to find the
  // location of that "=" within the string and add one. The lives will never be more
  // than one digit so add one to that index to find the ending index of our substring.
  // https://github.com/krmalewski/html_forms_lab
  function delineateLives(str) {
    point = str.indexOf("=") + 1;
    return(str.substring(point, point + 1));
  }

  var life2 = parseInt(delineateLives(formInfo));
  var lifeForm = $('.life');
  lifeForm.attr("value", life2).hide();

  // Set the initial lives left to 3
  var life = 3;
  // Input the number of lives into the life box to display on screen
  var lifeBox = $('#lives');

  function displayLife() {
    if (life2 === 2 || life2 === 1) {
      lifeBox.text('Lives left: ' + life2);
    } else {
      lifeBox.text('Lives left: ' + life)
    }
  }
  $(document).ready(displayLife);


  // Set the initial point value to zero
  var points = 0;
  // Input the points into the point box so they display in the screen
  var pointBox = $('#points');
  pointBox.text('Points: ' + points);

  // Array of images locations
  var array = ["images/ghost.png", "images/crow.png", "images/escape.png", "images/ghost2.png", "images/zombie.png", "images/zombie2.png" ];


  // To generate a random number between 0 and and the maximum index of the array
  // This will be used to randomly decide an index from the array of images
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function randomArrayIndex(num) {
    var number = Math.random() * num
    return Math.floor(number);
  }

  // Randomize the image that will pop up in the windows.
  function pickImage(div) {
    var index = randomArrayIndex(6);
    var pic = array[index];
    // Since the pictures will be rotating, the picture previously appended must be
    // removed before appending a new image.
    $(div).children('img').remove();
    // Append an image tag and add an event handler to the div
    var image = $('<img>', {src: pic});
    $(div).append(image)
    $(div).one("click", catchMe);
  }

  function blood() {
    $('body').css({
      "background":"url(images/blood-frame.png) no-repeat center center fixed",
      "background-size": "cover",
      "margin-top": "0",
      "height": "100%",
      "width": "100%"
    });
  }

  function removeBlood() {
    $('body').css({
      "background-image": "none",
      "opacity": "1"
    });
  }

  // This function will respond to the users mouseclick on the appearing item
  // and will cause the item to shrink back to height 0 (disappearing in the
  // eues of the user)
  // I will also update the points live at the top of the screen
  function catchMe(event) {
    console.log('BOO');
    blood();
    setTimeout(removeBlood, 300);
    $(event.target).attr('src','images/blood-splatter.png');
    $('.flex-container').css({
      height: '80px',
    })
    points += 100;
    pointBox.text('Points: ' + points);
  }


  // write a function that makes a div appear in the a window
  // the initial height of this div is 0 so it already exists, it is
  // just growing through this animation
  function grow(div) {
    pickImage(div);
    $(div).animate({
      height: '80px',
    }, 500);
    // The shrink function will cause the height to shrink back to 0,
    // making it appear as if the div has disappeared. The setTimeout
    // will make it shrink after appearing for a set number of seconds
    // which will decrease in the next level
    setTimeout( function() {shrink(div); }, 1000);
  }

  // write a function that makes a div shrink and disappear
  function shrink(div) {
    $(div).animate({
      height: '0px',
    })
  }

  // Write a function that generates a random number
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function randomNumber(min, max) {
    var interval = Math.random() * (max - min) + min;
    return Math.floor(interval);
  }
  // have a setInterval function that continues to call the appear function
  // The randomNumber will be generated by the function above and will switch
  // up how frequently the divs appear in the windows
  // Setting setInterval methods to a variable will allow us to clear the inerval
  // when the time is up.
  var window1 = setInterval(function() { grow('#one'); }, randomNumber(4000, 10000));
  var window2 = setInterval(function() { grow('#two'); }, randomNumber(4000, 10000));
  var window3 = setInterval(function() { grow('#three'); }, randomNumber(4000, 10000));
  var window4 = setInterval(function() { grow('#four'); }, randomNumber(4000, 10000));
  var window5 = setInterval(function() { grow('#five'); }, randomNumber(4000, 10000));
  var window6 = setInterval(function() { grow('#six'); }, randomNumber(4000, 10000));
  var window7 = setInterval(function() { grow('#seven'); }, randomNumber(4000, 10000));
  var window8 = setInterval(function() { grow('#eight'); }, randomNumber(4000, 10000));
  var window9= setInterval(function() { grow('#nine'); }, randomNumber(4000, 10000));
  var window10 = setInterval(function() { grow('#ten'); }, randomNumber(4000, 10000));
  var window11 = setInterval(function() { grow('#eleven'); }, randomNumber(4000, 10000));
  var window12 = setInterval(function() { grow('#twelve'); }, randomNumber(4000, 10000));

  // Create a timer using a loop
  // Tictoc will add seconds to clock
  var seconds = 20;
  var timer = null;

  function tictoc(){
    var timeBox = $('#timer');
    timeBox.text('Time left: ' + seconds);
    seconds -= 1;
    console.log(seconds);
    if (seconds === 0) {
      // Clear "grow" intervals when timer is up so that creatures stop popping up in the windows.
      clearInterval(window1);
      clearInterval(window2);
      clearInterval(window3);
      clearInterval(window4);
      clearInterval(window5);
      clearInterval(window6);
      clearInterval(window7);
      clearInterval(window8);
      clearInterval(window9);
      clearInterval(window10);
      clearInterval(window11);
      clearInterval(window12);
      timeBox.text('Time\'s up!');
      stopTime();
      // Immediately hide the images once the time is up.
      $('.flex-container').hide();
      displayButton();
    }
  }

  // The set interval will ensure that tictoc is only adding seconds
  // to the clock after every second
  function startTime() {
    timer = setInterval(tictoc, 1000)
  }

  // Make a function to turn off the timer
  function stopTime() {
    clearInterval(timer);
  }

  // Document.ready will start the timer when the document has loaded
  // so they player has a specific amount of time to catch as many creatures
  // as possible before the time is up
  $(document).ready(startTime)


  // Initally hide these divs
  var form1 = $('#next-round').eq(0);
  form1.hide();

  var form2 = $('#try-again').eq(0);
  form2.hide();

  var gameOver = $('.game-over');
  gameOver.hide();



  function displayButton() {
    // If player is out of lives and does not score enough points, game over.
    if (life2 === 1 && points < 1000) {
      life2 -= 1;
      lifeBox.text('Lives left: ' + life2);
      gameOver.show();
      // If player scores enough points, they advance to the next round.
    } else if (points >= 1000)  {
      lifeForm.attr("value", life2)
      form1.show();
      // If player does not score enough points but is not out of lives yet,
      // they loose a life and replay the current round.
    } else {
      life2 -= 1;
      lifeBox.text('Lives left: ' + life2);
      lifeForm.attr("value", life2);
      form2.show();
    }
  }

});
