var MatchGame = {};
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready( function(){
  MatchGame.renderCards(MatchGame.generateCardValues());
  var clickCount = 0;                                // obvious?
  var floatingValue = 0;                             // this is where we save the value of the first card we've clicked 
  var matchValue = 0;                                // this will be the value of the second card   
  var pause = 500;                                   // this is how long the second card will be visible before flipping back over 
  $(".card").on("click", function() {
  	if ($(this).hasClass("unflipped")) {             // checks the clicked card is not already matched or flipped

      clickCount++;                                  // if it's a valid choice we want to iterate the count
      $(".mask").css("z-index","1");                 // brings a full screen div to the front which prevents clicks until our animations complete 
      var $card = $(this);                           // assigns the active card div to a named variable to avoid confusion
      var bgColor = MatchGame.setBackgroundColor($card.attr("class")[14]); // saves the background color value returned after passing the card value to the function

      $card.css("border-color","rgb(255, 242, 242)");  // changes border color before animation so it doesn't show white
      $(this).animate({                                // $card.animate wouldn't work 
          borderLeftWidth: "9.16vw",                   // grows the border on left and right allows the element to keep its position 
          borderRightWidth: "9.16vw"                   // while giving the appearance of shrinking 
        });
      $(this).animate({
          borderLeftWidth: "4px",                      // shrinking border looks like growing element  
          borderRightWidth: "4px"
        });
      setTimeout(function() {                          // we want to wait until the animation is half completed 
        $card.css("background-color",bgColor);         // before changing background color
        $card.addClass("flipped").removeClass("unflipped"); // and adding visibility to the value
      },500);

      setTimeout(function() {
      $card.css("border-color","white");             // returns the border color to it's initial state
      $(".mask").css("z-index","0");                 // hides the mask div back behind all the rest
    	if (clickCount === 1) {                        // if it's the first card flipped
    		floatingValue = $card.attr("class")[14];     // we are assigning this variable the value of the fifteenth character of the active card's class which is it's number value but as a string
    	}                
                                                     // whitespace... 
    	if (clickCount === 2) {                        // if it's the second card flipped
    		clickCount = 0;                              // resets the count here cuz it's unconditional and the rest of the code is conditional statements 
        matchValue = $card.attr("class")[14];        // the fifteenth index of the card's class it also it's value 
    		if (floatingValue === matchValue) {          // if the two card value variables are equal we have a match 
    			$(".card."+matchValue).addClass("matched").removeClass("flipped").css("background-color","lightgray"); // toggles the matched class for flipped class and sets the background color grey
      		var gameOver = true;                      // this variable is instantiated to false and if it makes it through the next loop the game's continues
      		if($(".card").hasClass("unflipped")) {
            gameOver = false;
          }
      		if (gameOver === true) {                   // if we made it through the loop and no cards are still face down 
     				alert("You win!");                       // a helpful message to inform the player of their accomplishment
     				location.reload();                       // starts a new game  
      		}      		
    		} else {                                     // if the second card is not a match to the first 
    			setTimeout(function() {                    // wait half a second so we get a chance to see what was under the second card
      			$(".card."+matchValue).removeClass("flipped").addClass("unflipped").css("background-color","rgb(32, 64, 86)");  // flip the second card over
      			$(".card."+floatingValue).removeClass("flipped").addClass("unflipped").css("background-color","rgb(32, 64, 86)");  // flip the first card over
      		},pause);                                  // this value determins how long the second card is visible
    		}
    	}},600);
    }
  });
}); 
/*
  I tried a couple of different methods to randomize the array but ended up just using the suggested method.
 */

MatchGame.generateCardValues = function () {
  var values = [];
  var cards = [];
  for (var i = 1; i <= 8; i++) {
  	values.push(i);
  	values.push(i);
  }

  while (values.length > 0) {
  	var i = Math.floor(Math.random() * values.length);
  	cards.push(values[i]);
  	values.splice(i,1);
  }
  return cards;
};

/* I decided not to create a game object. Instead this function takes the randomized array of cards
   and adds the html inside the elements with a class of card*/ 

MatchGame.renderCards = function(cardValues, $game) {
	$(".card").each(function() {                           // selector .each() loops through each instance of a selector 
		var x = cardValues.pop();                            // takes a value out of the array we generated and assigns it to this variable
		$(this).html(x);   // adds the value x and "unflipped" to the class of a div nested inside each .card
    $(this).addClass(x+" ");
    $(this).addClass("unflipped");
	});

};

/*                                                                          
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.    // doesn't do what this says
 */                                                                           

MatchGame.flipCard = function($card, $game) {
                                                  // I didn't use this function at all. I guess I won't pass the test
};

MatchGame.setBackgroundColor = function(val) {  // this function will return a color for the active card's background
	if (val === "1") {return "red";}              // a switch statement might have been cleaner but I couldn't remember the syntax 
	if (val === "2") {return "orange";}
	if (val === "3") {return "yellow";}
	if (val === "4") {return "green";}
	if (val === "5") {return "blue";}
	if (val === "6") {return "indigo";}
	if (val === "7") {return "violet";}
	if (val === "8") {return "brown";} 
};
