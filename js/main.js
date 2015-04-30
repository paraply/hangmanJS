(function(){
    'use strict';

    var characterdiv = document.getElementById('characters');
    var hangwordsdiv = document.getElementById('hangwords');
    var trieddiv = document.getElementById('tried');
    var wordarray = ["KNÄCKT", "SCHLAGER", "CAESAR", "PETRICHOR" ]
    var current_word = wordarray[Math.floor((Math.random() * wordarray.length))];
    var chrs_found = 0;
    var tries = 9;

    for (var j = 0; j < current_word.length; j++){
        var guess_char = document.createElement("SPAN");
        guess_char.setAttribute('id', j);
        guess_char.className = "guesschr";
        guess_char.innerHTML = " ";
        hangwordsdiv.appendChild(guess_char);
    }

    for (var i = 0; i < 29; i++){
      var currentChar;
        if (i < 26){ //A -> Z
            currentChar = String.fromCharCode(65 + i);  
        }else if (i == 26){ // Å Ä Ö
             currentChar = "Å"; 
        }else if (i == 27){
             currentChar = "Ä"; 
        }else{
             currentChar = "Ö"; 
        }
        
        var btn = document.createElement("BUTTON");
        btn.setAttribute('id', currentChar);
        btn.className = "unclicked";
        btn.innerHTML = currentChar;
        btn.onclick = function(){
            char_click(this.id);
        };
        characterdiv.appendChild(btn);
    }


    function char_click(id){
        trieddiv.innerHTML += id;
        var cur_chr = document.getElementById(id);
        
        cur_chr.disabled = 'true';
        cur_chr.innerHTML = '_';
        var found_word = false;
            for (var x = 0; x < current_word.length; x++){
                if (current_word[x] == id){
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
                if (tries == 0){
                    alert("You have lost the game!\nThe word was " + current_word);
                    location.reload();
                }
            }
            }

        }


})();
