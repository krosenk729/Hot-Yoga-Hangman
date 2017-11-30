// initialize variables

var poses = ['half moon', 'boat', 'cobra', 'plow', 'standing bow', 'bridge', 'crane', 'ext mountain', 'down dog', 'warrior']
var randIndex = 0;
var gamePose = poses[randIndex];
var numWins = 0, numLose = 0, maxGuess = 12;
var guessLeft = maxGuess, pastGuess = []; 
var gameBoard = '_';
var currentGuess = 'a';

// function to set up a new game
function gameSet(){
	randIndex = Math.floor( Math.random() * poses.length);
	gamePose = poses[randIndex];
	guessLeft = maxGuess;
	pastGuess = [];
	gameBoard = createDashes(gamePose,'');

	console.log("Pose to guess " + gamePose); 

	document.getElementById('yogaPose').style.cssText = 'background-position-x: '+ -150*randIndex + 'px; background-position-y: 0px;';
	document.getElementById('guessLeft').innerHTML = guessLeft + ' guesses left';
	document.getElementById('mobileKey').value = '';
	document.getElementById('pastGuess').innerHTML = '';
	document.getElementById('poseName').innerHTML = gameBoard;
}

// invoke function on load
gameSet();


// function to determine if game play should occur
function keyPlay(event){
	var k = event.which || event.keyCode;
	currentGuess = String.fromCharCode(k).toLowerCase();

	console.log("Current guess " + currentGuess);

	if( k >= 65 && k <= 122 && pastGuess.indexOf(currentGuess) == -1 ){ gamePlay(); }
}

// invoke function on key click
document.body.onkeypress = function(event){ keyPlay(event); };


// function to execute game play
function gamePlay(){
	guessLeft --;
	pastGuess.push(currentGuess);

	document.getElementById('pastGuess').innerHTML += currentGuess;
	document.getElementById('guessLeft').innerHTML = guessLeft + ' guesses left';

	// check if this is a correct guess
	if( findIndexes(gamePose, currentGuess).length > 0 ){

		gameBoard = createDashes(gamePose, pastGuess) ;
		document.getElementById('poseName').innerHTML = gameBoard;

	} 

	// check this is game-ending (either win or out of guesses)
	// issue with using this method for poses that have a space in the name
	if( gameBoard.indexOf('_') == -1 ){

		numWins ++;
		document.getElementById('gameWins').innerHTML = numWins + ' wins';
		alert("You win");
		gameSet();

	}else if ( guessLeft <= 0 ){

		numLose ++;
		document.getElementById('gameLoses').innerHTML = numLose + ' utter failures';
		alert("Too hot");
		gameSet(); 
	
	} else {
		// this would be easier with jquery
		document.getElementById('yogaPose').style.cssText = 'background-position-x: '+ -150*randIndex + 'px; background-position-y: ' + Math.max(-1350, -150 * (maxGuess - guessLeft)) + 'px;'; 
	}

}


// function to find all indexes of a letter (lettr) within a string (str)
// Example: (l, hello) will return [2 3]
function findIndexes(str, letter){
	var foundIndexes = [];
	for(i = 0; i < str.length ; i++){
		if( str[i] === letter){ foundIndexes.push(i); }
	}
	return foundIndexes;
}

// function to create a string of underscores to mask a letter of a word unless the letter is within the letters array
// Example: (hello, ['h', 'l']) will return "h_ll_"
function createDashes(word, letters){
	var allDashes = '';

	for(i = 0; i < word.length; i++){
		
		if( letters.indexOf(word[i]) === -1 ){
			word[i] == ' ' ? allDashes += '  ' : allDashes += '_ ';
		} else{
			allDashes += word[i];
		}
	}

	return allDashes;

}
