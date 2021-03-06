/* Functions for Trytoguess game :
   List of functions :
    - noAccent : Function that converts every french letters with accents to basic letters with no accents.
    - pickAword : Function that picks up the word to guess from a customed array containing words, then returns this word.
    - start : Function that prints message in the 1st display zone : indicates how many letters in word to guess + display of words entered by player.
    - chainDisplay : Function that receives a chain as parameter and returns a new chain of paths to corresponding animated gif letters files.
    - catchDataIn : Function that catches word entered by player then compares it to the word to the solution (then displays result + resets data entry field).
	  - quitGame : Function to clear local storage at quitting the game. 
*/

// --------  GLOBAL VARIABLES  --------- 
let wordTG = pickAword() ; // word to guess, generated by wordToGuess() function


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

const noAccent = (chain) => {
/* Function that converts every french letters with no accents and capitalized. 
   Ex. : "à" converted to "A" 

	 Passed parameters : chain. 
	 Return : chain of no accents and caps letters.
*/

  let regexpA = /[àâä]/gi ; 
  let regexpE = /[éèêë]/gi ; 
  let regexpI = /[îï]/gi ;
  let regexpO = /[ôö]/gi ;
  let regexpU = /[ùûü]/gi ;
  let regexpC = /[ç]/gi ;    

  chain = chain.replace(regexpA,"A") ; 
  chain = chain.replace(regexpE,"E") ; 
  chain = chain.replace(regexpI,"I") ; 
  chain = chain.replace(regexpO,"O") ; 
  chain = chain.replace(regexpU,"U") ; 
  chain = chain.replace(regexpC,"C") ; 

  return chain ; 
}


function pickAword() {
/* Function that picks up the word to guess from a customed
   array containing words, then returns this word.

	 Passed parameters : none. 
	 Return : word to guess. 
*/
  const myWords = [ 'AMITIÉ' , 'GENTILLESSE' , 'VÉRITÉ' , 'LIBERTÉ' , 'JUSTICE' , 'COMPASSION' , 'GENEROSITÉ' , 'SOUTIEN' , 'PATIENCE' , 'AMOUR' , 'BONHEUR' , 'JOIE' , 'MAGIE' , 'BEAUTÉ' , 'COEUR' , 'COURAGE' , 'PAIX' , 'SÉRÉNITÉ' , 'HARMONIE' , 'ESPOIR' ] ;

  let randNum = Math.floor (Math.random() * Math.floor(myWords.length));

  return myWords[randNum] ;
} // End of function pickAword()



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

  document.getElementById("message").innerHTML = "Bienvenue dans le jeu \"Try to guess\". <br/>Le mot caché contient " + wordTG.length + " lettres.<br/>Vous avez 20 essais pour le trouver. <br/>Bonne chance !" ;
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
//  let wordIn = noAccent(entry) ;    // conversion of data entered by player in capitals and no accents chain
  let wordIn = entry.toUpperCase() ;

  wordIn = noAccent(wordIn) ;

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

    document.getElementById("answer").innerHTML = "Vous avez trouvé le mot caché en " + counter + " essai(s).<br/>\
    Votre score est de " + score + " points et votre score total est de " + newScore + " points.<br/> \
    Une autre partie ?" ;

    document.getElementById("replay").style.visibility = "visible" ;

  }else if (20-counter > 0) {
    document.getElementById("answer").innerHTML = "Plus que " + score + " essai(s)." ;
  }else{

    totalScore = localStorage.getItem('score') ; // get previous score
    localStorage.removeItem('score') ; // remove scores storage from cache

    document.getElementById("answer").innerHTML = "Vous avez atteint les 20 essais. Il n'en reste plus, vous avez perdu. <br/>\
		Le mot à deviner était " + wordTG + ".<br/>\
    Votre score total est de " + totalScore + " points. <br/>\
    Merci d'avoir joué. Bye !" ;

    setTimeout ( function() { window.location = "../../games.html" } , 7000 ) ;
  }
} // End of function catchDataIn()



const quitGame = () => {
  localStorage.removeItem('score') ;
  window.location = "../../games.html"
}







