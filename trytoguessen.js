/* Functions for Trytoguess game :
   List of functions :
    - pickAword : Function that picks up the word to guess from a customed array containing words, then returns this word.
    - start : Function that prints message in the 1st display zone : indicates how many letters in word to guess + display of words entered by player.
    - chainDisplay : Function that receives a chain as parameter and returns a new chain of paths to corresponding animated gif letters files.
    - catchDataIn : Function that catches word entered by player then compares it to the word to the solution (then displays result + resets data entry field).
*/

// --------  GLOBAL VARIABLES  --------- 
const wordTG = pickAword() ; // word to guess, generated by wordToGuess() function

// Initialization of display for word entered by player ("-" signs for beginning of game).
let wordPlayer = "" ;
for (let i=0 ; i<wordTG.length ; i++) {
  wordPlayer += "-" ;
}

let counter = 0 ; // counter of rounds
let score = 0 ; // end of round score
let totalScore = 0 ; // total score

const pattern = /-/ ; // pattern for test() regular expression method -> to test if "-" in a string.

// ---------  FUNCTIONS  ---------

function pickAword() {
/* Function that picks up the word to guess from a customed
   array containing words, then returns this word.

	 Passed parameters : none. 
	 Return : word to guess. 
*/
  const myWords = [ 'FRIENDSHIP' , 'KINDNESS' , 'TRUTH' , 'FREEDOM' , 'JUSTICE' , 'COMPASSION' , 'GENEROSITY' , 'SUPPORT' , 'PATIENCE' , 'LOVE' , 'HAPPINESS' , 'JOY' , 'MAGIC' , 'BEAUTY' , 'HEART' , 'COURAGE' , 'PEACE' , 'SERENITY' , 'HARMONY' , 'HOPE' ] ;

  let randNum = Math.floor (Math.random() * Math.floor(myWords.length));

  return myWords[randNum] ;
} // End of function wordToGuess()



const start = () => {
/* Function launched on load of the page. 

	 Prints message in the 1st display zone.
   This message indicates how many letters are in the word to guess, and
   displays the words entered by the player in the data input field.

	 Passed parameters : none. 
	 Return : none.
*/
  document.getElementById("dataInput").value = "" ; // reset of input field
  document.getElementById("dataInput").focus() ; // focus in input field

  // Display letters of "wordPlayer" variable, where letters are animated gif.
  wordPlayer = chainDisplay(wordPlayer) ;

  document.getElementById("message").innerHTML = "Welcome to the \"Try to guess\" game. <br/>The word you must guess has " + wordTG.length + " letters.<br/>You have 20 chances to find it. <br/>Good luck !" ;
  document.getElementById("dataOutput").innerHTML = wordPlayer ;
} // End of function printMessage()



const chainDisplay = (chain) => {
/*  Function that receives a chain as parameter and returns a new chain,
    containing <img src='path to animated gif letters files, corresponding to the chain letters' /> + <img src ...etc.
    The chain returned is then used with the corresponding html tag, to display
    animated gif letters instead of chain parameter.

		Passed parameters : word chain. 
		Return : path chain to animated gif letters files. 
*/
  let chainOut = "" ;

  for (let i=0 ; i<chain.length ; i++) {
    chainOut += "<img src='trytoguess_img/" + chain[i] + ".gif' />" ;
  }
  return chainOut ;
} // End of function chainDisplay(chain)


const updateScore = (newScore) => {
	/* Function to store scores in browser local storage (cache) and update them.

		  Passed parameter : new score. 
		  Return : current score.  
	*/
	let currentScore = "" ;
	if (!localStorage.getItem('score')) {

	  newScore.toString() ;
	  localStorage.setItem('score', newScore) ;

	}else{
	  currentScore = localStorage.getItem('score') ;
	  localStorage.clear() ; 		// empty cache

	  currentScore = Number(currentScore) ;
	  currentScore += newScore ;

	  currentScore.toString() ;
    localStorage.setItem('score' , currentScore) ;  // store new updated score

	}
	currentScore = localStorage.getItem('score') ;
	return currentScore ;
}


function catchDataIn() {
/* function that catches the word entered by player then
   compares this word to the word to guess (the solution).
   Then, it displays the result and resets the data entry field.

	 Passed parameters : none. 
	 Return : none. 
*/
  let entry = document.getElementById("dataInput").value ;   // catch of data input

  // chain entered treatment
  let wordIn = entry.toUpperCase() ;    // conversion of data entered by player in capitals

  wordPlayer = "" ; // Reset of "wordPlayer" for player new data input

  // Comparison of word entered by player and word to guess (solution), result stored in wordPlayer variable
  for (let i=0 ; i<wordTG.length ; i++) {
    if (wordTG[i] === wordIn[i]) {
      wordPlayer += wordIn[i] ;
    }else{
      wordPlayer += "-" ;
    }
  }

  // conversion of wordPlayer variable into chain for gif animated letters display
  wordPlayer = chainDisplay(wordPlayer) ;

  // display of wordPlayer
  document.getElementById("dataOutput").innerHTML = wordPlayer ;

  document.getElementById("dataInput").value = "" ;  // Reset of input field
  document.getElementById("dataInput").focus() ; // Focus in input field

  // Round counter update and return
  counter += 1 ;
  score = 20-counter ;

  // Actions according to results (win, loose, next round)
  if (pattern.test(wordPlayer) === false) {   // if no "-" signs found in wordPlayer, meaning if player wins

    let newScore = updateScore(score) ;  // update score in local storage

    totalScore = localStorage.getItem('score') ;  // get updated score

    document.getElementById("answer").innerHTML = "You found the word to guess in " + counter + " round(s).<br/>\
    Your score is of " + score + " points and your total score is now of " + newScore + " points.<br/> \
    Play again ?" ;

    document.getElementById("replay").style.visibility = "visible" ;

  }else if (20-counter > 0) {
    document.getElementById("answer").innerHTML = score + " round(s) left." ;
  }else{

    totalScore = localStorage.getItem('score') ; // get previous score
    localStorage.removeItem('score') ; // remove scores storage from cache

    document.getElementById("answer").innerHTML = "You have reached the 20 rounds. No more left, sorry, you loose. <br/>\
		The word to guess was " + wordTG + ".<br/>\
    Your score is of " + totalScore + " points. <br/>\
    Thank you for playing, hope you enjoyed. Bye !" ;

    setTimeout ( function() { window.location = "../../games.html" } , 7000 ) ;
  }
} // End of function catchDataIn()



const quitGame = () => {
  localStorage.removeItem('score') ;
  window.location = "../../games.html"
}







