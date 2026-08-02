let word ="bible";
let row = 1;
let guess = '';
let status = 'play';

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

    // Goes through each letter in the row (5 letters)
    box.forEach((element, index) => {

        // Shrink animation for background colours to change
        setTimeout(() => {
            element.classList.remove('shrink', 'bounce');
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

        status = 'end';

    }
    else if(row < 6){
        row++;
    }
    else{
        console.log("u trash");
        status = 'end';
    }
    guess = '';
}

