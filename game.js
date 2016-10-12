console.log('JS connected')

$( document ).ready(function() {
    console.log( "ready!" );
  // Pull the info from the form the search bar at the top of the page
  // and set it to a variable
  var formInfo = window.location.search;

  // Since we are trying to get the username of the player to display on our
  // gameboard, we will need to break up the string that returns the form info
  // and pull out the username.
  // Reference code from html forms lab:  https://github.com/krmalewski/html_forms_lab
  function delineate(str) {
    theLeft = str.indexOf("=") + 1;
    // The string will be cut into a substring starting after the first "="
    theRight = str.lastIndexOf("&");
    // The substring will end right before the '&'
    var nickName = (str.substring(theLeft, theRight));
    return nickName;
  }


  var name = delineate(formInfo);
  var username = $('.username')
  // In order to carry username to next round (since it is on a serparate html file)
  // I need to save the username in a secret form that will submit to the next page
  // and can be displayed on the screen for round2 and round 3
  username.attr("value", name).hide();
  // Input the name that we pulled from the form into our name div so it will display
  // on the screen
  var nameBox = $('#name');
  var player1 = nameBox.text();
  nameBox.text(player1 + " " + name);


  // Set the initial lives left to 3
  var life = 3;
  // Input the number of lives into the life box to display on screen
  var lifeBox = $('#lives');
  function displayLife() {
    // If user does not pass this round, the page reloads and the current number of lives
    // is saved and submitted via a form (life2). Check to see if life2 has a value and if not,
    // used the initial life variable.
    if (life2 === 2 || life2 === 1) {
      lifeBox.text('Lives left:   ' + life2);
    } else {
      lifeBox.text('Lives left:   ' + life)
    }
  }
  displayLife();

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



  // Set the initial point value to zero
  var points = 0;
  // Input the points into the point box so they display in the screen
  var pointBox = $('#points');
  pointBox.text('Points:   ' + points);

  // This function causes blood to smear around the border of the screen when an object is hit.
  function blood() {
    $('body').css({
      "background":"url(images/blood-frame.png) no-repeat center center fixed",
      "background-size": "cover",
      "margin-top": "0",
      "height": "100%",
      "width": "100%"
    });
  }

  // This function basically times out the previous function as well as sets the body's opacity back to 1.
  function removeBlood() {
    $('body').css({
      "background-image": "none",
      "opacity": "1"
    });
  }

  // When a creature is clicked on, the screen will look bloody and the image of the object will
  // change to a blood splat so they player will know they have hit that creature.
  function catchMe(event) {
    console.log('BOO');
    blood();
    setTimeout(removeBlood, 300);
    $(event.target).attr('src','images/blood-splatter.png');
    // In order to keep the divs from shifting, it was important to keep the height of the flex
    // container constant.
    $('.flex-container').css({
      height: '80px',
    })
    points += 100;
    pointBox.text('Points:   ' + points);
  }


  // Array of images locations
  var array = ["images/ghost.png", "images/crow.png", "images/escape.png", "images/ghost2.png", "images/zombie.png", "images/zombie2.png" ];

  // To generate a random number between 0 and the last array index
  // This will be used to randomly decide an index from the array of images
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
    setTimeout( function() {shrink(div); }, 2000);
  }

  // write a function that makes a div shrink and disappear
  function shrink(div) {
    $(div).animate({
      height: '0px',
    })
  }

  // Write a function that generates a random number
  // This function will respond to the users mouseclick on the appearing item
  // and will cause the item to shrink back to height 0 (disappearing in the
  // eues of the user)
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

  function beginAnimation() {
    console.log('clicked');

    var seconds = 20;
    var timer = null;

    function tictoc(){
      // Create a timer using a loop
      // Tictoc will add seconds to clock
      var timeBox = $('#timer');
      timeBox.text('Time left:   ' + seconds);
      seconds -= 1;
      console.log(seconds);
      // When the time is up, stop the images from popping up in the windows by clearing the interval.
      if (seconds === 0) {
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
        // This will help to imediately hide all images.
        $('.flex-container').hide();
        displayButton();
      }
    }

    // The set interval will ensure that tictoc is only adding seconds
    // to the clock after every second
    function startTime() {
      timer = setInterval(tictoc, 1000);
    }

    // Make a function to turn off the timer
    function stopTime() {
      clearInterval(timer);
    }

    // Each div will grow at random inervals
    var window1 = setInterval(function() { grow('#one'); }, randomNumber(2000, 10000));
    var window2 = setInterval(function() { grow('#two'); }, randomNumber(2000, 10000));
    var window3 = setInterval(function() { grow('#three'); }, randomNumber(2000, 10000));
    var window4 = setInterval(function() { grow('#four'); }, randomNumber(2000, 10000));
    var window5 = setInterval(function() { grow('#five'); }, randomNumber(2000, 10000));
    var window6 = setInterval(function() { grow('#six'); }, randomNumber(2000, 10000));
    var window7 = setInterval(function() { grow('#seven'); }, randomNumber(2000, 10000));
    var window8 = setInterval(function() { grow('#eight'); }, randomNumber(2000, 10000));
    var window9 = setInterval(function() { grow('#nine'); }, randomNumber(2000, 10000));
    var window10 = setInterval(function() { grow('#ten'); }, randomNumber(2000, 10000));
    var window11 = setInterval(function() { grow('#eleven'); }, randomNumber(2000, 10000));
    var window12 = setInterval(function() { grow('#twelve'); }, randomNumber(2000, 10000));

    $('.directions').hide();
      startTime();
  }

  // Once player has read through directions, the game will begin by clicking this button.
  $('.begin').click(beginAnimation);


  // Initally hide these divs
  var form1 = $('#next-round');
  form1.hide();

  var form2 = $('#try-again');
  form2.hide();

  var gameOver = $('.game-over');
  gameOver.hide();


  // Depending on the amount of points a player scores at the end of the round....
  function displayButton() {
    // If they are out of lives and do not score enough points, game over.
    if (life2 === 1 && points < 2000) {
      life2 -= 1;
      lifeBox.text('Lives left: ' + life2);
      gameOver.show();
      // If they score enough points, they will move to the next round.
      // In this case and the next, the player has already lost this round once and their current lives left
      // has been deliniated from a form so it will need to be reentered to move onto the next round/ replay this round.
    } else if ((life2 === 1 && points >= 2000) || (life2 === 2 && points >= 2000) || (life2 === 3 && points >= 2000))  {
      lifeForm.attr("value", life2)
      form1.show();
      // If they did not score enough points but still have lives left, they will replay this round.
    } else if (life2 === 2 && points < 2000) {
      life2 -= 1;
      lifeBox.text('Lives left: ' + life2);
      lifeForm.attr("value", life2);
      form2.show();
      // Enough points, move to next round.
    } else if (points >= 2000) {
      lifeForm.attr("value", life)
      form1.show();
      // Not enough points, replay this round.
    } else {
      life -= 1;
      life2 -= 1;
      lifeBox.text('Lives left:   ' + life);
      lifeForm.attr("value", life)
      form2.show();
    }
  }

});
