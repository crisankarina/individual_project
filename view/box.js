$(onHtmlLoaded);

function onHtmlLoaded(){
    console.log("DOM loaded");

    //display technical information
    var displayTechnical = function(){
        var info = $(".technicalClass");
        info.css("visibility", "visible");
    }
    var jsBox = $("#js-box");
    jsBox.on("click", displayTechnical);

    //display hobbies
    var displayHobbies = function(){
        var hobbies = $(".hobbiesClass");
        hobbies.css("visibility", "visible");
    }

    var hobbiesBox = $("#hobbies-box");
    hobbiesBox.on("click", displayHobbies);

  
    
    
}