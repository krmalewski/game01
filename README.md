#  Project #1: The Spooktacular House

## Overview 
In this [game](https://krmalewski.github.io/game01/), users will try to eliminate creatures in a haunted house by clicking on them as they randomly appear 
in windows. Player wins the game by making it through all three rounds before running out of lives.


## Landing Page Design

The design for the landing page can be found at this [site](https://www.elegantthemes.com/blog/divi-resources/free-divi-custom-login-page-extension-allows-you-to-easily-create-a-beautiful-login-experience-for-site-visitors). 

![login-design](https://github.com/krmalewski/game01/blob/master/images/landing-page-design.png)


### Limitations 

 * This landing page was just a design and not an actual page so I was not able to get the exact image that was used in the background of this landing page. 


## Game Design 

### Wireframe
![game-design](https://github.com/krmalewski/game01/blob/master/images/wireframe-design.png)

* The box to the left will hold user information collected from the form and game such as: username, points, time left, and lives left. 
* The boxes to the right represent the windows that creatures will randomly appear in. 

## Approach 
* setInterval was used to have the divs grow and shrink as the timer counted down 
* Math.random was used to randomize the intervals of each window growing and shrinking 
* Math.random was also used to randomize which image from the array of images will be displayed in each div 
* jQuery was used to target divs and add event handlers to indicate when clicked 

## Unsolved Problems 
* I would have liked to add all levels in one object in a js file but I was unable to figure out a streamline way to make this work. 
* I would also like to extend this game to have a two players option. 

## Technology Used 

* HTML/CSS
* JavaScript 
* jQuery 
* Flexbox
