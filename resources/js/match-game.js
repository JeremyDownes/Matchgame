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
  	if ($(this).children().hasClass("unflipped")) {  // checks the clicked card is not already matched or flipped
      var $card = $(this).children();                // assigns the active card div to a variable to save typing
    	$card.addClass("flipped").removeClass("unflipped").css("background-color",MatchGame.setBackgroundColor($card.attr("class")[0])); // toggles flipped for unflipped class and changes the background color to whatever is returned from the setBackgroundColor function when it is passed the cards value
    	clickCount++;                                  // obvious?
    	if (clickCount === 1) {                        // if it's the first card flipped
    		floatingValue = $card.attr("class")[0];      // we are assigning this variable the value of the first character of the active card's class which is it's number value but as a string
    	}                
                                                     // whitespace... 
    	if (clickCount === 2) {                        // if it's the second card flipped
    		$(".mask").css("z-index","1");               // we prevent a third click by bringing this full screen div forward to cover everything. 
    		setTimeout(function() {                      // we can't leave it there forever or we won't be able to finish the game   
    			$(".mask").css("z-index","0");             // so we put it back behind everything
    		},pause+50);                                 // after a short pause to reveal the second card selected
    		clickCount = 0;                              // resets the count here cuz it's unconditional and the rest of the code is conditional statements 
        matchValue = $card.attr("class")[0];         // the first index of the card's class it also it's value 
    		if (floatingValue === matchValue) {          // if the two card value variables are equal we have a match 
    			$(".card div."+matchValue).addClass("matched").removeClass("flipped").css("background-color","lightgray"); 
      		var gameOver = true;
      		$(".card div").each(function(){
      			if ($(this).hasClass("unflipped")) {
      				gameOver = false;
      			}
      		});
      		if (gameOver === true) {
     				alert("You win!");
     				location.reload();
      		}      		
    		} else {
    			setTimeout(function() {
      			$(".card div."+matchValue).addClass("unflipped").removeClass("flipped");
      			$(".card div."+floatingValue).addClass("unflipped").removeClass("flipped");
      		},pause);
    		}
    	}
    }
  });
}); 
/*
  I tried a couple of other methods to randomize the array but ended up just using the suggested method.
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
	$(".card").each(function() {                           //selector .each() loops through each instance of a selector 
		var x = cardValues.pop();
		$(this).html('<div class = "'+ x +' unflipped">' + x + '</div>');   // the div may be unnessesary maybe just addClass() to the .card
	});

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};

MatchGame.setBackgroundColor = function(val) {
	if (val === "1") {return "red";}
	if (val === "2") {return "orange";}
	if (val === "3") {return "yellow";}
	if (val === "4") {return "green";}
	if (val === "5") {return "blue";}
	if (val === "6") {return "indigo";}
	if (val === "7") {return "violet";}
	if (val === "8") {return "brown";} 
};
