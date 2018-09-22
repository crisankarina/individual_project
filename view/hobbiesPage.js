$(onHtmlLoaded); 

function onHtmlLoaded(){
console.log("hello");
    // Reading
    var quoteContainer = $("#quoteContainerId");

    function displayQuote (response) {
        var quote = response.character + ": " + response.quote;
        console.log(response);
        quoteContainer.html(quote);
    }

    function getValue(myValue){
        var myValue = $('input[name="character"]:checked').val();
        console.log(myValue);
        getQuote(myValue)
    }

    var getQuote = function(myValue) {
        $.ajax({
            url: "https://got-quotes.herokuapp.com/quotes?char=" + myValue,
            success: displayQuote
        });
        console.log(myValue);

    }

    var allRadioButtons = $('input[name="character"]');
    for(var i = 0; i < allRadioButtons.length; i++){
        allRadioButtons[i].addEventListener("click", getValue);
        console.log(getValue);
    }

    //TvSeries
    var getTvSeries = function(showValue) {
        $.ajax({
            url: `http://api.tvmaze.com/search/shows?q=` + showValue,
            success: displayTvSeries
        })
    }

    $('button[name="tvSeriesButton"]').on("click", function(){
        var inputText = $('input[name="tvSeries"]').val();
        getTvSeries(inputText);
    })

    function displayTvSeries(show) {
        $("#tvSeriesContainerId").html(arrangeInformation(show));
    }

    function arrangeInformation(response) {
        var showList = `<ul>`
        for(var i = 0; i < response.length; i++) {
            var showName = response[i].show.name;
            var url = response[i].show.url;
            showList += `<li>` + showName + `<br>` + `<p>Link where you can find the TV series</p>` + `<a href="` + url + `" target="_blank">` + url + `</a>` + `</li>`;
        }
        showList += `</ul>`;
        return showList;
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
            var punchLine = "<p id=`setUpId`>" + response.punchline + "</p>";
            jokeContainer.append(punchLine);
        }, 1000) 
    }

    $('button[name="jokeButton"]').on("click", randomJoke);





}