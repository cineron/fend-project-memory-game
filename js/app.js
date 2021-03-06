////@ts-check

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
    //clear openCards just in case only 1 card has been clicked.
    openCards = [];
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

// ----- From Rubric -----
// Congratulations Popup - "time to win, star rating, and play again?"
// Restart Button - resets board, timer, star rating
// Star rating
// Timer
// CSS playable across all browsers, animations for click, match, and incorrect.
// Code optimizations: keyboard shortcuts

//TODO: see how to sync VS Code settings across different computers

/* === === === START: Timer === === === */
// declare variable to hold time
let time = 0;


// declare variable for setInterval
let timer;

//declare variable to hold HTML for the timer 
let clock = document.getElementById("clock");

//declare variable to toggle clock start/stop
let clockRunning = false;

// starting and stopping timer. use setInterval and clearInterval
function setTimer() {
    //assign setInterval to a variable so that it can easily be called by clearInterval()
    // console.log("setTimer() called.");
    timer = setInterval(countSeconds, 1000);
}

function countSeconds() {
    time ++;
    //declare vars for min and sec
    let min = Math.floor(time/60);
    let sec = Math.floor(time%60);
    
    //add leading 0 on seconds.
    if (sec < 10){
        clock.innerHTML = `${min}:0${sec}`;
        // console.log(`${min}:0${sec}`);
    } else {
        clock.innerHTML = `${min}:${sec}`;
        // console.log(`${min}:${sec}`);
    }
    // clock.innerText = time;
    // console.log(`countSeconds() called. time = ${time}`); 
}
// console.log(`This is the timer: ${timer}`);
function stopTimer() {
    // console.log("stopTimer() called.");
    clearInterval(timer); //var of timer);
    // clock.innerHTML = "0:00";
    clockRunning = false;
    timer = 0;
    // console.log(`timer = ${timer}`);
    time = 0;
    // console.log("time= 0");
}

// timer starts when first card is clicked
//var initialClick = false; // set to true when first card clicke and start timer

/* === === === END: Timer === === === */

//store all the '.cards' in a variable
let allCards = document.querySelectorAll('.card'); 

//create an empty array to store "open" cards
let openCards = []; 

//empty array for matched cards
let matchedCards = [];

/* === === === START: Win Logic === === === */

let pluralStar = '';

function winLogic() {
    if (howManyStars === 1){
        pluralStar = "star";
    } else {
        pluralStar = "stars";
    }
    if (matchedCards.length === 16) {
        // window.alert(`You won in ${moves} moves! \n
        // You got ${howManyStars} ${pluralStar}! \n
        // And you did it in ${time} seconds!`);

        //modal window, which was *not* covered in content before this project.        
        modal.style.display = "block";
        modalBody.innerHTML= `<p>You won in <strong>${moves}</strong> moves!</p>
        <p>You got <strong>${howManyStars} ${pluralStar}</strong>!</p>
        <p>And you did it in <strong>${time}</strong> seconds!</p>`;
        // console.log("winLogic called");
        
        // Stop the timer
        stopTimer();
        // initGame();
    }
}

/*  Modal content 
    from https://www.w3schools.com/howto/howto_css_modals.asp 
    "Modals" were *not* covered in the content before this project.*/
// Get the modal
let modal = document.getElementById('myModal');

// Get the modal-body
let modalBody = modal.querySelector(".modal-body");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// Get the restart button
let btn = document.getElementById("myBtn");

// When the user clicks on the button, restart game 
btn.onclick = function() {
    modal.style.display = "none";
    initGame();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
/* === === === END: Win Logic === === === */


//add 1 eventListener to "deck" and target each card. Less CPU intensive than a listener per card.
deck.addEventListener("click", matchingLogic);

/* logic to control which cards are clicked. Placed in a function to keep the code neat. 
Idea from: https://matthewcranford.com/memory-game-walkthrough-part-2-toggling-cards/ */
function clickLogic(clickedCard) {
    return ((openCards.length < 2) && 
    clickedCard.classList.contains('card') && 
    !clickedCard.classList.contains('open') && 
    !clickedCard.classList.contains('show') && 
    !clickedCard.classList.contains('match'));
}

function hideCards () {
    // console.log("clearCards has been called.");
    openCards.forEach(card => {
        card.classList.remove('open', 'show');
        });
    }

let moveCounter = document.querySelector(".moves");
let moves;

function numberOfMoves(n) {
    // console.log("numberOfMoves called");
    moves += n;
    moveCounter.innerText = moves; //Q: why doesn't this have to include .toString() ?
}

/* === === === BEGIN:  Star Creation === === === */
//assign HTML star class to variable
let stars = "fa-star";

//generate star HTML n times. // <- No. Having parameter in this function
//doesn't have any effect ON THE NUMBER OF TIMES IT'S EXECUTED
// b/c it isn't used in the function.
function generateStarHTML(icon)  { 
    return `<li><i class="fa ${icon}"></i></li>`;
}

//hard code ".fa-star" for testing
let starsHardCode = '<li><i class="fa fa-star"></i></li>';

//select the stars by class in HTML
const numberOfStars = document.querySelector(".stars");

function generateStarCounter() {
    // console.log('generateStarCounter called');
    
    // 'clear' the stars
    // numberOfStars.innerHTML = '';
    // console.log(`numberOfStars (after = '') = ${numberOfStars.getElementsByTagName("li").length}`);
    // NO - clearing stars here, will AWLWAYS clear stars, meanging
    // there "can be only one."

    // add to the variable
    // numberOfStars.innerHTML += starsHardCode;
    numberOfStars.innerHTML += generateStarHTML(stars);
    // console.log(`numberOfStars (after +=) = ${numberOfStars.getElementsByTagName("li").length}`);
    
    return numberOfStars.innerHTML;  
}

//¿ How do I clear the <li>'s in the .stars <ul>?
//set the innerHTML = '' //empty string
//numberOfStars.innerHTML = '';
//Where do I put it ^ ? // early in generateStarsCounter?

let howManyStars = 0;

function createStars(nTimes) {
    //clear the stars
    numberOfStars.innerHTML = '';

    howManyStars = nTimes;

    //place starsHardCore n times
    for (let i = 1; i <= nTimes; i++){
    // generateStarHTML(i); //NO b/c function has not parameters
    generateStarCounter();
    }
}
/* === === === END:  Star Creation === === === */

/* === === === BEGIN: Star Rating === === === */

function starRating() {
    
    // 5 stars -- added later
    if (moves <= 11) {
        createStars(5);
    }
    // 4 stars -- added later
    else if (moves >= 12 && moves <= 15) {
        createStars(4);
    }
    
    // If moves <= 16 = 3 stars
    else if (moves <= 16) {
        createStars(3);
    }
    
    // If moves > 16 < 25 = 2 stars
    else if (moves > 16 && moves < 25) {
        createStars(2);
    
    // If moves >= 25 = 1 star
    } else {
        createStars(1);
    }
}
/* === === === END: Star Rating === === === */



function matchingLogic() {

    //start timer
    if (!clockRunning){
        setTimer();
        clockRunning = true;
    }

    const clickedCard = event.target; //found this idea from: https://matthewcranford.com/memory-game-walkthrough-part-2-toggling-cards/

    // only select cards that are *neither* open, show, nor match
    if (clickLogic(clickedCard)) {
        //add "open" and "show" classes to card
        clickedCard.classList.add('open', 'show');
        
        // put the 'open' cards in an array
        openCards.push(clickedCard);
        // console.log('openCards array length:', openCards.length);
        
        if (openCards.length === 2) {
            //add 1 move to the move counter (1 move equals selecting 2 cards)
            numberOfMoves(1);

            // add a star rating
            starRating();
            
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
                // console.log(`2 cards match. matchedCards is ${matchedCards.length} long.`);
            }
            
            
            setTimeout(() => {
                // console.log("it's been a second.");
                hideCards();
                openCards = [];
                // console.log(`openCards is  ${openCards.length} long.`);
                winLogic();
            }, 600);
            
            /*===END: Compare the 2 Cards===*/
            
            //remove eventListener
            //deck.removeEventListener("click", matchingLogic);
            
            //empty the open card array
            // openCards = [];
            // console.log("how many openCards now?", openCards.length);
        }
    }
}

// Restart Button
let restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function(){
    initGame();
});

// initialize game
function initGame() {
    //clear matched cards
    matchedCards = [];
    // generate and shuffle deck
    generateDeck();
    // reset timer
    stopTimer();
    clock.innerHTML = "0:00";
    // reset stars
    createStars();
    // console.log("createStars() called from initGame()");
    // reset moves counter
    moves = 0;
    numberOfMoves(0);
}

// call initGame
initGame();


// -----Udacity Tips Videos & Notes ----//
// tips from https://www.youtube.com/watch?v=oECVwum-7Zc - Ryan Waite
// and  Mike Wales https://www.youtube.com/watch?v=_rUH-sEs68Y
// ----------------------------//
