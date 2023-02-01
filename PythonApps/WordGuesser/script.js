let words = ['adieu', 'ouija', 'ergot', 'azure', 'aglet', 'wlonk', 'aegis', 'savvy', 'angst', 'aeros', 'cuing', 'cruor', 'pupal', 'pupil', 'tutor', 'hello', 'pinks',  'stinks', 'ranks', 'blank',
'words', 'fiver', 'elder', 'plant', 'moldy'];

document.addEventListener('DOMContentLoaded', () => {
    var theWord = words[Math.floor(Math.random() * words.length)];
    console.log(theWord);

    function setOnClick(id, funct) {
        let btn = document.getElementById(id);
        btn.addEventListener('click', funct);
    }

    function error(theGuess) {
        if(theGuess == '') {
            alert('Please guess a word.');
            return true;
        }
        else if(theGuess.length != 5) {
            alert('Please guess a 5 letter word.')
            return true;
        }
    }

    function compare(guess) {
        let ans = '';
        for(let i = 0; i < 5; i++) {
            if(theWord[i] === guess[i]) {
                ans += 'y';
            }
            else if(theWord.includes(guess[i])) {
                ans += 'm';
            }
            else {
                ans += 'n';
            }
        }

        return ans;
    }
    
    setOnClick('guess', (evt) => {
        let theGuess = document.getElementById('word').value.toLowerCase();
        if(error(theGuess)) { document.getElementById('word').value = ''; return; }
        let current = document.getElementById('results').innerHTML;

        let key = compare(theGuess);
        theGuess = theGuess.toUpperCase();
        let ans = '';
        let count = 0;
        for(let i = 0; i < 5; i++) {
            if(key[i] === 'y') {
                ans += '<span style="color:green">' + theGuess[i] + '</span>';
                count += 1;
            }
            else if(key[i] === 'm') {
                ans += '<span style="color:yellow">' + theGuess[i] + '</span>';
            }
            else {
                ans += theGuess[i];
            }
        }

        current = '<div> You guessed <strong>' + ans + '</strong></div>' + current;
        document.getElementById('results').innerHTML = current;
        document.getElementById('word').value = '';

        if(count === 5) { alert('You win!'); }
    })

    setOnClick('reset', (evt) => {
        theWord = words[Math.floor(Math.random() * words.length)];
        document.getElementById('results').innerHTML = ''
        document.getElementById('word').value = '';
    })
})