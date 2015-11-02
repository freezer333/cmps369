
var secret;


$(document).ready(function() {

    init_game();

    $('button').click(function() {
        var guess = $(this).siblings('input').val()
        console.log("Guess is " + guess );

        if ( guess == secret ) {
            showSuccess();
            return;
        }
        else if ( guess < secret ) {
            // show check, also add li element
            $('<li/>')
                    .addClass('lowGuess')
                    .text(guess + ' was too low')
                    .appendTo('ul');
        }
        else {
            $('<li/>')
                    .addClass('highGuess')
                    .text(guess + ' was too high')
                    .appendTo('ul');
        }
        showCheck();
    });

    $('a').click( function() {
        init_game();

    });

});

function init_game() {
    $('input').val('');
    secret = Math.floor(Math.random() * 10) + 1;
    console.log(secret);
    showStart();
    $('li').remove();
}


function showStart() {
    mask(true, false, false);
    console.log("Showing start page");
}

function showSuccess() {
    mask(false, false, true);
    console.log("Showing success");
}

function showCheck() {
    $('input').val('');
    mask(false, true, false);
    console.log("Showing check");
}


function mask(start, check, success) {
    start ? $("#start_page").show() : $("#start_page").hide();
    check ? $("#check_page").show() : $("#check_page").hide();
    success ? $("#success_page").show() : $("#success_page").hide();
    
}