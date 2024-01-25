let randomNumber = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector('#guessField');
const submit = document.querySelector('#subt');
const prevGuess = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const result = document.querySelector('.resultParas');

let playGame = true;
let numGuess = 1;
let total_prevGuess = [];

const p = document.createElement('p');

if(playGame){
    submit.addEventListener('click', (e)=>{
        e.preventDefault();
        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGame(guess);

    })
}

function validateGame(guess) {
    if(guess === '' || guess < 0 || guess > 100 || isNaN(guess)){
        // console.log(`Please enter a valid number`);
        result.innerHTML = `Please enter a valid number`
    }else{
        total_prevGuess.push(guess);
        if(numGuess === 10){
            displayGuess(guess);
            displayMessage(`Game is Over, Correct answer is ${randomNumber}`);
            endGame(guess);
        }else{
            displayGuess(guess);
            startGame(guess);
        }
    }
}

function startGame(guess) {
    if(guess === randomNumber){
        displayMessage(`You guessed it right`);
        endGame(guess);
    }else if(guess > randomNumber || guess < randomNumber){
        displayMessage(`Incorrect answer`);
    }
}

function displayGuess(guess) {
    userInput.value = '';           //cleaning the previous input
    prevGuess.innerHTML += `${guess}, `;    //valuse shown on previous guess option
    remaining.innerHTML = `${10 - numGuess}`
    numGuess++;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame(guess) {
    userInput.value = '';
    userInput.setAttribute('disabled','');
    p.classList.add('button');
    p.innerHTML = `<h2 id="button">Start again</h2>`;
    result.appendChild(p);
    playGame = false;
    startOver()
}

function startOver(guess) {
    const startBtn = document.querySelector('#button');
    startBtn.addEventListener('click', (e)=>{
        total_prevGuess = [];
        randomNumber = parseInt(Math.random() * 100 + 1);
        numGuess = 1;
        prevGuess.innerHTML = '';
        remaining.innerHTML = `${10 - numGuess}`
        userInput.removeAttribute('disabled');
        result.removeChild(p)

        playGame = true;
    })
}
