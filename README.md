# try_to_guess
Online game "Try to guess" : javascript only. 

Classic game consisting in guessing what is the hidden word. 
20 rounds / chances. 

Current work : 
Working on updateScore(newScore) function : problems dealing with local storage to add previous score to new one (under Firefox). 
The score doesn't update after a few rounds, sometimes 4, sometimes 6 -> back to 0. 
This happened when same word picked up (to be confirmed with more tests at the moment). 
Other possibility : due to 5Mb max memory capacity in Local storage ? 
... Pending ... 
