var MatchGame = {};
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready( function(){
  MatchGame.renderCards(MatchGame.generateCardValues());
  var clickCount = 0;
  var floatingValue = 0;
  var matchValue = 0;
  $(".card").on("click", function() {
  	if ($(this).children().hasClass("unflipped")) {
    	$(this).children().addClass("flipped").removeClass("unflipped").css("background-color",MatchGame.setBackgroundColor($(this).children().attr("class")[0]));
    	clickCount++;
    	if (clickCount === 1) {
    		floatingValue = $(this).children().attr("class")[0];

    	}

    	if (clickCount === 2) {
    		$(".mask").css("z-index","1");
    		setTimeout(function() {
    			$(".mask").css("z-index","0");
    		},600);
    		clickCount = 0;
        matchValue = $(this).children().attr("class")[0];
    		if (floatingValue === $(this).children().attr("class")[0]) {
    			$(".card div."+matchValue).addClass("matched").removeClass("flipped").css("background-color","gray");
      		$(".card div."+floatingValue).addClass("matched").removeClass("flipped").css("background-color","gray");
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
      		},500);
    		}
    	}
    }
  });
}); 
/*
  Generates and returns an array of matching card values.
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

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
	$(".card").each(function() {
		var x = cardValues.pop();
		$(this).html('<div class = "'+ x +' unflipped">' + x + '</div>');
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
