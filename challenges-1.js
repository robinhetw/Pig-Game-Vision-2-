


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer,gamePlaying,lastDice;
var oneDiceDOM = document.querySelector('.one-dice-panel');
var twoDiceDOM = document.querySelector('.two-dice-panel');
var dice0DOM = document.getElementById('dice-0');
var dice1DOM = document.getElementById('dice-1');
var lastDice = [0,0];
var playerNames = ['Player 1','Player 2'];
var winScore = 100;
var diceChoice = '1';
//event listeners for settings modal
var settingsDOM = document.getElementById('modal-settings');
//event for help modal
var helpDOM = document.getElementById('modal-help');
var countSix;

newGame();
displayNames();


document.querySelector('.btn-roll').addEventListener('click', function() {
     if(gamePlaying){
        
         var diceRoll = [];
         
         if( diceChoice === '1'){
            oneDiceDOM.style.display = 'block';
            diceRoll[0] = rollDice();
            oneDiceDOM.src = 'dice-' + diceRoll[0] + '.png';
           
               
             if (diceRoll[0] === 6 && lastDice[0] === 6){
                 // reset global score to 0 and next player
                 scores[activePlayer] = 0;
                 document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                 nextPlayer();
             } else if (diceRoll[0] !== 1){
                 //save previous dice roll; increase and display round score
                 lastDice[0] = diceRoll[0];
                 roundScore += diceRoll[0];
                 document.querySelector('#current-' + activePlayer).textContent = roundScore;
             } else {
                 // otherwise nextplayere
                 nextPlayer();
             }
        }else{
            // 2 dice
            twoDiceDOM.style.display = 'block';
            
            diceRoll[0] = rollDice();
            diceRoll[1] = rollDice();
            dice1DOM.src = 'dice-' + diceRoll[1] + '.png';
            dice0DOM.src = 'dice-' + diceRoll[0] + '.png';
    
               
             if ((lastDice[0] === 6 && lastDice[1] === 6) && (diceRoll[0] === 6 || diceRoll[1] === 6)){
                 //previous roll was two sixes, and current roll has at least one six
                //reset global score to zero and toggle player
                 scores[activePlayer] = 0;
                 document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                 nextPlayer();
             } else if (diceRoll[0] === 1 || diceRoll[1] === 1 ){
                 //one of the dice was 1, so nextplayer
                 nextPlayer();
             } else {
                  //save previous dice rolls, increment and display round score
                 lastDice[0] = diceRoll[0];
                 lastDice[1] = diceRoll[1];
                 roundScore += diceRoll[0] + diceRoll[1];
                 document.querySelector('#current-' + activePlayer).textContent = roundScore;
             }

        }   
        }
   
} ) ;

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= winScore) {
            // game won!
            gamePlaying = false;
            document.getElementById('name-' + activePlayer).textContent += ' wins!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            oneDiceDOM.style.display = 'none';
            twoDiceDOM.style.display = 'none';
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click',newGame);
    
    //setting modal
    
document.querySelector('.btn-settings').addEventListener('click',function(){
        //active only at the end of a turn or the end of the game
    if(roundScore === 0 || !gamePlaying){
    //show current player names, winning score and dice choice in input fields
    document.getElementById('input-name-0').value = playerNames[0];
    document.getElementById('input-name-1').value = playerNames[1];
    document.getElementById('input-score').value = winScore;
    document.getElementById('dice-choice').value = diceChoice;
          //display the settings modal
    settingsDOM.style.display = 'block';
   }
    
});
 
document.getElementById('modal-settings-close').addEventListener('click',function(){
   // hide the modal when the close btn is clicked
    settingsDOM.style.display = 'none';
});

document.querySelector('.btn-cancel').addEventListener('click',function(){
   // hide the modal when the close btn is clicked
    settingsDOM.style.display = 'none';
});
   
document.querySelector('.btn-save').addEventListener('click',function(){
   //save settings, display new player names and dice planel, then hide modal
  playerNames[0] = document.getElementById('input-name-0').value;
  playerNames[1] = document.getElementById('input-name-1').value;
  var inputScore = document.getElementById('input-score').value;
    if( inputScore && inputScore >0){
       winScore = document.getElementById('input-score').value;
       }
    diceChoice = document.getElementById('dice-choice').value;
    displayNames();
    if (diceChoice === '1'){
        twoDiceDOM.style.display = 'none';
    } else {
        oneDiceDOM.style.display = 'none';
    }
    settingsDOM.style.display = 'none';
    
    });





//click help
document.querySelector('.btn-help').addEventListener('click',function(){
   //display help modal 
    helpDOM.style.display = 'block';
});

document.getElementById('modal-help-close').addEventListener('click',function(){
    // hide the modal when the close btn is clicked
    helpDOM.style.display = 'none';
});

document.querySelector('.btn-close').addEventListener('click',function(){
    // hide the modal when the close btn is clicked
    helpDOM.style.display = 'none';
});


// start game
function newGame(){
        //reset game variables and initialise display
            scores = [0,0];
            roundScore =0;
            activePlayer=0;
            gamePlaying = true;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    oneDiceDOM.style.display = 'none';
    twoDiceDOM.style.display = 'none';
    displayNames();
}


function displayNames(){
     document.getElementById('name-1').textContent = playerNames[1];
     document.getElementById('name-0').textContent = playerNames[0];  
}


// next player turn
function nextPlayer(){      
    roundScore = 0;
    lastDice = [0,0]
    document.getElementById('current-'+activePlayer).textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer =1:activePlayer= 0 ;
          // document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function rollDice(){
    // returns a random number between 1 to 6
         return Math.floor(Math.random()*6)+1;
}



