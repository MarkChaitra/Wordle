let word;
let wordBank;
let row = 1;
let guess = '';
let status = 'play';
let popUp = document.getElementsByClassName('endScreen')[0];

getWord();

function newWord(){
    word = wordBank[Math.floor(Math.random() * wordBank.length)];
}

function getWord(){
    fetch('words.csv')
    .then(response => response.text())
    .then(data => {
        wordBank = data.split(',').map(w => w.trim()).filter(Boolean);
        word = wordBank[Math.floor(Math.random() * wordBank.length)];

    })
    .catch(err => console.error('Error loading CSV:', err));
}

document.addEventListener('keydown', function(e) {
    let box = document.querySelectorAll(`.guess-${row}`);

    if(e.key == 'Enter' && guess.length == 5){
        wordCheck(box);
    }
    else if(e.key.length === 1 && e.key.toLowerCase() !== e.key.toUpperCase() && guess.length <5 && status == 'play'){
        guess = guess + e.key.toUpperCase();

        box.forEach((element, index) => {
            element.innerHTML = guess[index] ?? '';
        });
    }
    else if(e.key == 'Backspace'){
        if(guess !== ''){
            guess = guess.substring(0,guess.length-1);

            box.forEach((element, index) => {
                element.innerHTML = guess[index] ?? '';
            });
        }
    }

});

function wordCheck(box){

    let repeats = '';
    guess = guess.toUpperCase();
    word = word.toUpperCase();

    if(!wordBank.includes(guess) && word !== guess){

        box.forEach((element) => {
            element.classList.remove('shrink', 'bounce', 'shake');
            void element.offsetWidth;
            element.classList.add('shake');
        });

        popUp.style.visibility = "visible";
        popUp.innerHTML = "Word not found";

        setTimeout(() => {
            popUp.style.visibility = "hidden";
            popUp.innerHTML = "";
        }, 2000);

    }

    else{
    // Goes through each letter in the row (5 letters)
        box.forEach((element, index) => {

            // Shrink animation for background colours to change
            setTimeout(() => {
                element.classList.remove('shrink', 'bounce', 'shake');
                void element.offsetWidth;
                element.classList.add('shrink');
            }, index * 200); 

            // Letters match at the indices background green
            if(guess[index] == word[index]){
                repeats = repeats + guess[index];
                setTimeout(() => {
                    element.style.backgroundColor = 'green';
                    element.style.border = '2px solid green';
                }, (index * 200) + 250);
            } 

            // Check if word includes letter, letter is not in repeats list more than in the actual word, and letter in guessed word appears less then in actual word
            else if(word.includes(guess[index]) && guess.substring(index, guess.length).split(guess[index]).length-1 <= word.split(guess[index]).length-1 && repeats.split(guess[index]).length-1 < word.split(guess[index]).length-1){
                repeats = repeats + guess[index];
                setTimeout(() => {
                    element.style.backgroundColor = 'orange';
                    element.style.border = '2px solid orange';
                }, (index * 200) + 250);
            }
            else{
                setTimeout(() => {
                    element.style.backgroundColor = 'grey';
                    element.style.border = '2px solid grey';
                }, (index * 200) + 250);
            }

        });

        if(guess == word){
            box.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.remove('bounce', 'shrink');
                    void element.offsetWidth;
                    element.classList.add('bounce');
                }, (index * 200) + 1250); 
            });

            popUp.style.visibility = "visible";
            popUp.innerHTML = word;

            status = 'end';

        }
        else if(row < 6){
            row++;
        }
        else{
            console.log("u trash");
            popUp.style.visibility = "visible";
            popUp.innerHTML = "Word was " + word;
            status = 'end';
        }
        guess = '';
    }
}

function reset(){
    let allTiles = document.querySelectorAll('.guess-1, .guess-2, .guess-3, .guess-4, .guess-5, .guess-6');

    allTiles.forEach(element => {
        element.style.border = '3px solid rgb(68, 68, 68)';
        element.style.backgroundColor = '';
        element.innerHTML = '';
    });
    popUp.style.visibility = "hidden";
    popUp.innerHTML = "";
    row = 1;
    newWord();
    status = 'play'
}
