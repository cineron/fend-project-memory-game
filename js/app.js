//@ts-check


/*
 * Create a list that holds all of your cards
 */
let cards = [
    "fa-diamond", "fa-diamond",
    "fa-paper-plane-o", "fa-paper-plane-o",
    "fa-anchor", "fa-anchor",
    "fa-bomb", "fa-bomb",
    "fa-bolt", "fa-bolt",
    "fa-cube", "fa-cube",
    "fa-leaf", "fa-leaf",
    "fa-bicycle", "fa-bicycle",
];

function generateCard(card) {
    return `<li class="card"><i class="fa ${card}"></i></li>`;
}

const deck = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function generateDeck() {
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');
    return deck.innerHTML;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// ----- From Rubric -----
// Game logic - random shuffle
// Game login - Win: all cards match
// Congratulations Popup - "time to win, star rating, and play again?"
// Restart Button - resets board, timer, star rating
// Star rating
// Timer
// Move Counter
// CSS playable across all browsers, animations for click, match, and incorrect.
// Code optimizations: keyboard shortcuts

//TODO: see how to sync VS Code settings across different computers
//This is a test: adding this line from old MBP



//store all the '.cards' in a variable
let allCards = document.querySelectorAll('.card'); 

//create an empty array to store "open" cards
let openCards = []; 

//empty array for matched cards
let matchedCards = []; 

//add 1 eventListener to "deck" and target each card
deck.addEventListener("click", matchingLogic);

// allCards.forEach(function (card) { 
// });
    //add eventListener for cards
    //card.addEventListener('click', matchingLogic);

function hideCards () {
    console.log("clearCards has been called.")
    openCards.forEach(card => {
        card.classList.remove('open', 'show');
        });
    }

function matchingLogic() {

    const clickedCard = event.target; //found this idea from: https://matthewcranford.com/memory-game-walkthrough-part-2-toggling-cards/

    // only select cards that are *neither* open, show, nor match
    if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('open') && !clickedCard.classList.contains('show') && !clickedCard.classList.contains('match')) {

        
        //add "open" and "show" classes to card
        clickedCard.classList.add('open', 'show');
            
        // put the 'open' cards in an array
        openCards.push(clickedCard);
        console.log('openCards array length:', openCards.length);
        
        if (openCards.length == 2) {
            //add 1 move to the move counter (1 move equals selecting 2 cards)
            moveRating();

            
            /*===START: Compare the 2 Cards===*/
            //assign the first card in the array to a variable
            var firstCardType = openCards[0].querySelector('i').classList.item(1);
            
            //assign the second card in the array to a variable
            var secondCardType = openCards[1].querySelector('i').classList.item(1);
            
            //use a timer that lasts 1 second
            // check if cards match
            if (firstCardType === secondCardType){
                // console.log(firstCardType);
                // console.log(secondCardType);
                
                /*==> If the cards match, add ".match" class to html <==*/
                openCards.forEach(card => {
                    card.classList.add('match');
                    
                    //push matched cards into an array
                    matchedCards.push(card);
                });
                console.log(`2 cards match. matchedCards is ${matchedCards.length} long.`);
            } else {
                
                setTimeout(() => {
                    console.log("it's been a second.");
                    hideCards();
                    openCards = [];
                    console.log(`openCards is  ${openCards.length} long.`);
                }, 1000);


                    
            }/*===END: Compare the 2 Cards===*/

            //remove eventListener
            //deck.removeEventListener("click", matchingLogic);
            
            //empty the open card array
            // openCards = [];
            console.log("how many openCards now?", openCards.length);
        }
            
        }
    }

//flip cards back over     
//     //remove the classes to flip the card.
//     openCards.forEach(card => {
//     card.classList.remove('open', 'show'); //hide cards
//     });    

// clearTimeout();

let moveCounter = document.querySelector(".moves");
let numberOfMoves = 0;

function moveRating() {
    numberOfMoves++;
    moveCounter.innerText = numberOfMoves; //Q: why doesn't this have to include .toString() ?
}

// Restart Button
// TODO: the cards will not flip after restarting
let restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function(){
    initGame();
});

// initialize game
function initGame() {
    // generate and shuffle deck
    generateDeck();
    // reset timer
    // reset stars
    // reset moves counter
}

// call initGame
initGame();


// -----Udacity Tips Videos & Notes ----//
// tips from https://www.youtube.com/watch?v=oECVwum-7Zc - Ryan Waite
// and  Mike Wales https://www.youtube.com/watch?v=_rUH-sEs68Y
// ----------------------------//

/* =====
var count = 5;
function moveCounter(bool) {
    if (bool === true) {
        count++;
    }

    else if (bool === false) {
        count--;
    }
}

// var stars = document.querySelectorAll('ul.stars li');
// document.querySelector('ul.stars')
// document.querySelector('ul.stars').removeChild(stars[0])

function activeCards () {
    // addEvent Listner
    // element.addEventListener('click')
    document.queryCommandEnabled('li.card').forEach(function(card){
        card.addEventListener('click', function(){
            if (lastFlipped) {
                console.log(lastFlipped, card);
            }

            else {
                lastFlipped = card;
            }
        });
    });
}

function deactivateCards () {
    // remove event listners
}

var matchedCards = [];

if (matchedCards.length === 16) {
    // logic for game is won
}

// How to prevent same card from being clicked
var lastFlipped = null;

// How to shuffle and reset
// collect cards
var cards = document.querySelectorAll('ul.deck li')
// put them into a new array
shuffle(Array.from(cards)
// clear the ul and append it back to the shuffle above

// creating Timer
use setInterval and clearInterval

// starting and stopping timer
var time = 0;
var timer =  setInterval(function () {
    time++;
    console.log(time);
}, 1000);

function setTimer() {
    timer = setInterval(function () {
    time++;
    console.log(time);
}, 1000);
}

function clearTimer() {
    clearInterval(timer //var of timer);
}

// timer button
resetBtn.addEventListener('click', function() {
    clearTimer();
    function setTimer();
})

===== */

// timer starts when first card is clicked
//var initialClick = false; // set to true when first card clicke and start timer

// ORGANIZING
// put functions at top and functions towards bottom

