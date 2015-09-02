
var secret;

function init_game() {
    // come up with a random number
    secret = Math.floor(Math.random() *10) + 1;
    console.log('Secret number = ' + secret);
    showStart();
    clearGuesses();
}

function clearGuesses() {
    var ps = document.getElementsByTagName('li');
    for ( var i = ps.length-1; i >= 0; i-- ) {
        var p = ps[i];
        p.parentNode.removeChild(p);
    }
}

function on_guess(input_id) {
    var input = document.getElementById(input_id);
    if ( input.value == secret ) {
        showSuccess();
        return;
    }
    
    // there is only one ul element... so ok.
    var list = document.getElementsByTagName('ul')[0];
    var li = document.createElement('li');
    var text;
    if ( input.value < secret ) {
       text = document.createTextNode(input.value + ' is too low');
       li.className = 'lowGuess';
    }
    else {
        text = document.createTextNode(input.value + ' is too high');
        li.className = 'highGuess';
    }
    li.appendChild(text);
    list.appendChild(li);
    showCheck();
}



function showStart() {
    console.log("Showing start page");
    mask('block', 'none', 'none');
    document.getElementById('start_guess').value = '';
}

function showCheck() {
    console.log("Showing check page.");
    mask('none', 'block', 'none');
    document.getElementById('check_guess').value = '';
}

function showSuccess() {
    console.log("Showing success page");
    mask('none', 'none', 'block');
}


function mask(start, check, success) {
    var page = document.getElementById('start_page');
    page.style.display = start;

    var page = document.getElementById('check_page');
    page.style.display = check;

    var page = document.getElementById('success_page');
    page.style.display = success;
}