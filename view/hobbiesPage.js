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

    var getTvSeries = function(show) {
        $.ajax({
            url: "http://api.tvmaze.com/search/shows?q=" + show,
            success: displayTvSeries(show)
        })
    }

    function displayTvSeries(response) {
        var showList = '<ul>'
        for(i = 0; i < response.length; i++) {
            var showName = response[i].show.name;
            var url = response[i].show.url;
            showList += `<li>` + showName + ` ` + `<a href="` + url + `" target = "_blank"> ` + url + `</a>` + `</li>`

        }
        showList += '</ul>'
        return showList;
        var tvSeriesContainer = $("#tvSeriesContainerId");

        tvSeriesContainer.html(showList);
    }

    $('button[name="tvSeriesButton"]').on("click", function(){
        var shows = $("#seriesId").val();
        getTvSeries(shows);
    })



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