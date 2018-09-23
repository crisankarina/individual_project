document.addEventListener("DOMContentLoaded", onHtmlLoaded);
function onHtmlLoaded(){
    
    //RockPaperScissors Game
    
    var RockPaperScissorsGame = function (){
        var inputText = document.querySelector('input[name="userChoice"]');
        // inputText.style.border = "1px solid red";
        var gameSection = document.getElementById("gameSectionId");
        
        var userWins = function() {
            gameSection.style.background = "#df9fbf";
            inputText.style.border = "1px solid white";
        }

        var computerWins = function() {
            gameSection.style.background = "#cccccc";
            inputText.style.border = "1px solid white";
        }

        var userChoice = inputText.value;
        var computerChoice =  Math.random();
        var containerEl = document.getElementById("gameResultId");

        while (containerEl.firstChild) {
            containerEl.removeChild(containerEl.firstChild);
        }

        var resultMessage = document.createElement("p");
        resultMessage.style.textAlign = "center";
        var whatComputerChoose = document.createElement("p");

        if(computerChoice <= 0.33) {
            computerChoice = "rock";
        } else if(computerChoice <= 0.66) {
            computerChoice = "paper";
        } else {
            computerChoice = "scissors";
        }

        userChoice = userChoice.toLowerCase();

        if(userChoice!== "rock" && userChoice !== "paper" && userChoice !== "scissors") {
            resultMessage.innerHTML = "Please pick from rock, paper or scissors.";
            inputText.style.border = "1px solid red";
            whatComputerChoose.style.display = "none";
        }
        if(userChoice === computerChoice) {
            resultMessage.innerHTML = "It is a tie!";
            gameSection.style.background = "#ffb3ff";
        } 
        if (userChoice === "rock"){
            if(computerChoice === "scissors") {
                resultMessage.innerHTML = "WIN WIN WIN!";
                userWins();
            } else if(computerChoice === "paper"){
                resultMessage.innerHTML = "Computer beats you :(";
                computerWins();
            }
        }
        if(userChoice === "paper") {
            if(computerChoice === "rock") {
                resultMessage.innerHTML = "WIN WIN WIN!";
                userWins();
            } else if(computerChoice === "scissors"){
                resultMessage.innerHTML = "Computer beats you :(";
                computerWins();
           }
        }
        if(userChoice === "scissors") {
            if(computerChoice === "paper") {
                resultMessage.innerHTML = "WIN WIN WIN!";
                userWins();
            } else if(computerChoice === "rock"){
                resultMessage.innerHTML = "Computer beats you :(";
                computerWins();
            }
        }
        whatComputerChoose.innerHTML = "Computers choice is: " + computerChoice;
    
        containerEl.appendChild(whatComputerChoose);
        containerEl.appendChild(resultMessage);

    }    
    playButton = document.querySelector('button[name="playButton"]');
    playButton.addEventListener("click", RockPaperScissorsGame);
  

    // Dogs are man's best friend

    var getPhoto = function() {
        return $.get("https://dog.ceo/api/breeds/image/random")
        .then(function(response){
            var photo = document.createElement("IMG");
            photo.setAttribute("src", response.message);
            photo.setAttribute("alt", "photo");
            photo.setAttribute("id", "dogPhotoId");
            var imgContainer = document.getElementById("randomPhotoId");

            while(imgContainer.firstChild) {
                imgContainer.removeChild(imgContainer.firstChild);
            }

            imgContainer.appendChild(photo);
        })
        
    }
    var imgButton = document.querySelector('button[name="dogPicture"]');
    imgButton.addEventListener("click", getPhoto);

    // Forgot the lyrics?

    var getLyrics = function(artist, song) {
        return $.get("https://api.lyrics.ovh/v1/" + artist + "/" + song)
        .then(function(response) {
            var lyrics = document.createElement("p");
            var lyricsContainer = document.getElementById("lyricsContainerId");

            console.log(response);

            if(response.status != 404) {
                lyrics.innerHTML = response.lyrics;            
            } else {
                lyrics.innerHTML = "Lyrics not found";
            }
            lyricsContainer.appendChild(lyrics);
        })
    }

    var lyricsButton = document.querySelector('button[name="findLyrics"]');
    lyricsButton.addEventListener("click", function(){
        var artist = document.querySelector('input[name="artist"]').value;
        var song = document.querySelector('input[name="song"]').value;
        getLyrics(artist, song);
    });

    //Weather 

    var containerEl = document.getElementById("weatherDetails");
    var weather = new Weather();

    weather.getWeatherInfo().then(function(){
        pageInfoLocalStorage(weather);
    });

    function displayTemp(weather, weatherProp){
        if(weather !== undefined){
            if(weather[weatherProp] !== undefined){
                var weatherPropContainer = document.createElement("p");

                while(containerEl.firstChild) {
                    containerEl.removeChild(containerEl.firstChild);
                }
                weatherPropContainer.innerHTML = weather[weatherProp]; 
                containerEl.appendChild(weatherPropContainer);
            }
        }
    }

    var buttonCelsius = document.querySelector('button[name="celsiusButton"]');
    buttonCelsius.addEventListener("click", function(){      
        displayTemp(weather, "temp_c"); 
        saveLocalStorage("weatherType", "temp_c");
    });

    var buttonFarenheit = document.querySelector('button[name="fahrenheitButton"]');
    buttonFarenheit.addEventListener("click", function(){
        displayTemp(weather, "temp_f"); 
        saveLocalStorage("weatherType", "temp_f");
    });

    //LOCAL STORAGE
    function pageInfoLocalStorage(weather){
        var weatherType = getLocalStorage("weatherType");
        if(weatherType != null) {
            displayTemp(weather, weatherType);
        } 
    }


}