
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



































/*

$(document).ready ( function() {
    // setup event handler
    $('a').click(init_game);

    $('button').click( function() {
        // the button clicked has an input box as its sibling - so selecting that will allow us to pull
        // the input value from the correct text box.
        var input_value = $(this).siblings('input').val();
        console.log('guess = ' + input_value);
        if ( input_value == secret ) {
            showSuccess();
            return;
        }
        
        // creating stuff is easier...  especially with the chaining syntax of jquery operations.
        if ( input_value < secret ) {
           $('<li/>').addClass('lowGuess').text(input_value + ' is too low').appendTo('ul');
        }
        else {
            $('<li/>').addClass('highGuess').text(input_value + ' is too high').appendTo('ul');
        }
        showCheck();
    })

  
    init_game();
});


function init_game() {
    // come up with a random number
    secret = Math.floor(Math.random() *10) + 1;
    console.log('Secret number = ' + secret);
    showStart();
    clearGuesses();
}

function clearGuesses() {
    // probably no need to make this an actual function :)
    $('li').remove();

    
    
}


function showStart() {
    console.log("Showing start page");
    mask(true, false, false);
    $('input').val('');
}

function showCheck() {
    console.log("Showing check page.");
    mask(false, true, false);
    $('input').val('');
}

function showSuccess() {
    console.log("Showing success page");
    mask(false, false, true);
}


function mask(start, check, success) {
    start ? $('#start_page').show() : $('#start_page').hide();
    check ? $('#check_page').show() : $('#check_page').hide();
    success ? $('#success_page').show() : $('#success_page').hide();
}

*/