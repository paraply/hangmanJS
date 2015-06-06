var Hangman = (function() {

    var characterdiv = document.getElementById('characters');
    var hangwordsdiv = document.getElementById('hangwords');
    var trieddiv = document.getElementById('tried');

    var chrs_found = 0;
    var tries = 9;

    var wordarray = ["KNÄCKT", "SCHLAGER", "CAESAR", "PETRICHOR", "SALTKRÅKA" ]; //Word array which the hangman word will be randomly chosen from
    var current_word = wordarray[Math.floor((Math.random() * wordarray.length))]; //Get a random word

    var parts = new Array(9); //Body parts as an array
        parts[0] =     document.getElementById('hang_hill');
        parts[1] =   document.getElementById('hang_construction');
        parts[2] =     document.getElementById('hang_body');
        parts[3] = document.getElementById('hang_rightarm');
        parts[4] =  document.getElementById('hang_leftarm');
        parts[5] = document.getElementById('hang_rightleg');
        parts[6] =  document.getElementById('hang_leftleg');
        parts[7] =     document.getElementById('hang_rope');
        parts[8] =     document.getElementById('hang_head');


    function initHangman(){ //Initialises the game
        for (var j = 0; j < current_word.length; j++){
            var guess_char = document.createElement("SPAN");
            guess_char.setAttribute('id', j);
            guess_char.className = "guesschr";
            guess_char.innerHTML = " ";
            hangwordsdiv.appendChild(guess_char);
        }

        for (var i = 0; i < 29; i++){ //Loop from the alphabets US ascii codes
          var currentChar;
            if (i < 26){ //A -> Z
                currentChar = String.fromCharCode(65 + i);  
            }else if (i == 26){ // Swedish Å Ä Ö are not in line with us ascii codes
                 currentChar = "Å"; 
            }else if (i == 27){
                 currentChar = "Ä"; 
            }else{
                 currentChar = "Ö"; 
            }
            
            var btn = document.createElement("BUTTON"); //Create a button for every character
            btn.setAttribute('id', currentChar);
            btn.className = "unclicked";
            btn.innerHTML = currentChar;
            fixClick(btn);
         
            characterdiv.appendChild(btn);
        }
    }

    function fixClick(btn){ //To enable eventlistener for buttons
        btn.onclick = function(){
            char_click(this.id);
        };
    }


    function char_click(id){ // called when button has been clicked. Argument: character
        trieddiv.innerHTML += id; //Add character to tried character list
        var cur_chr = document.getElementById(id);
        
        cur_chr.disabled = 'true'; //Disable the button so it cannot be clicked again
        cur_chr.innerHTML = '_';
        var found_word = false;
            for (var x = 0; x < current_word.length; x++){ //Loop through every character from our chosen word
                if (current_word[x] == id){ // If current character matches
                    found_word = true;
                    chrs_found++;
                    console.log(id);
                    var found_chr = document.getElementById(x);
                    found_chr.innerHTML = current_word[x]  ;
                }
            }
            if (chrs_found == current_word.length){ //Has won
                alert("You have won the game!");
                location.reload();
            }else{ // Not won yet
                if (!found_word){
                    tries--;
                    console.log("Try " + tries);
                    show(8-tries);
                if (tries === 0){ //No tries left
                    alert("You have lost the game!\nThe word was " + current_word);
                    location.reload();
                }
            }
            }

        }

    function hide (part){
        (parts[part]).style.display = "none";
    }

    function show (part){
        (parts[part]).style.display = "inline";
    }

    //Prints all words in the wordarray
    function wordlist(){
        wordarray.forEach(function(entry){
            console.log(entry);
        });        
    }

    //Returns the current hangman word
    function peek(){ 
        console.log(current_word);
    }

    //Hide all hangman-parts from the image
    function hideAll(){
        for (var i = 0; i < 9; i++){
            hide(i);
        }
    }

return{ //Export functions and make them public
    hideAll : hideAll,
    wordlist : wordlist,
    init : initHangman,
    peek : peek

};

})();
// Hangman.peek();
Hangman.hideAll();
Hangman.init();