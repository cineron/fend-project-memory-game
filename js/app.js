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
    return `<li class="card"><i class="fa ${card}"></i></li>`
}

function generateDeck() {
    let deck = document.querySelector('.deck');
    let cardHTML = cards.map(function(card) {
        return generateCard(card);
    })
    deck.innerHTML = cardHTML.join('');
    return deck.innerHTML
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

// -----Udacity Tips Videos ----// 
// tips from https://www.youtube.com/watch?v=oECVwum-7Zc - Ryan Waite
// and  Mike Wales https://www.youtube.com/watch?v=_rUH-sEs68Y
// ----------------------------//

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



/*----- select all the cards -----*/
let allCards = document.querySelectorAll('.card'); //store all the '.cards' in a variable
let openCards = []; //create an array to store "open" cards
//let closeCards = 
let matchedCards = []; //array for matched cards

allCards.forEach(function (card) { /* loop through stored cards */
    card.addEventListener('click', function (e) { 

        //add open show to classes to card
        card.classList.add('open', 'show'); 
        
        // put the 'open' cards in an array
        openCards.push(card);

        

        if (openCards.length == 2) {
            //assign the first card in the array to a variable
            var firstCardType = openCards[0].querySelector('i').classList.item(1);

            //assign the second card in the array to a variable
            var secondCardType = openCards[1].querySelector('i').classList.item(1);
            setTimeout(() => {
                openCards.forEach(card => {
                    card.classList.remove('open', 'show'); //hide cards 
                });
                openCards = [];
            }, 1000);

            // check if cards match
            if (firstCardType === secondCardType){
                console.log(firstCardType);
                console.log(secondCardType);
                openCards.forEach(card => {
                    card.classList.add('match');
                    //push matched cards into an array
                    matchedCards.push(card);
                });
            }
        }

        if (matchedCards.length === 16){
            console.log("You win!")
        }


        
        
        // if cards Don't match - clear
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            
            
            //console.log('Open Cards:', openCards.length)
        


        }
    });
});




/*

function createCard(className) {
    var element = document.createElement(tagName[, options]);

}

function generateGameboard(params) {
    
}

function compareCards(cardA, cardB) {
    
}

function gameOver(params) {
    
}

*/
/* =====
var count = 5;
function moveCounter(bool) {
    if (bool === true) {
        count++;
    }
    
    else if (bool === false) {
        count--
    }
}
//for console
//
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

