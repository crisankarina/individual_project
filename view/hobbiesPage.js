$(onHtmlLoaded); 

function onHtmlLoaded(){
console.log("hello");
    // Reading
    var quoteContainer = $("#quoteContainerId");

    var getQuote = function(myValue) {
        $.ajax({
            url: "https://got-quotes.herokuapp.com/quotes?char=" + myValue,
            success: displayQuote
        });
    }

    var allRadioButtons = $('input[name="character"]');
    for(var i = 0; i < allRadioButtons.length; i++){
        allRadioButtons[i].addEventListener("click", getValue);
    }

    var getValue = function(myValue){
        var myValue = $('input[name="character"]:checked').val();
        console.log(myValue);
        getQuote(myValue)
    }

    var displayQuote = function(response) {
        var quote = response.character + ": " + response.quote;
        console.log(response);
        quoteContainer.html(quote);
    }

    //Joke
    var jokeContainer = $("#jokeContainerId");

    var randomJoke = function(){
        $.ajax({
            url: "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke",
            success: displayJoke
        })
    }

    function displayJoke(response) {
        var setUp = "<p>" + response.setup + "</p>" + "<br>"; 
        jokeContainer.append(setUp);

        setTimeout(function(){
            var punchLine = "<p>" + response.punchline + "</p>";
            jokeContainer.append(punchLine);
        }, 1000) 
    }

    $('button[name="jokeButton"]').on("click", randomJoke);




}