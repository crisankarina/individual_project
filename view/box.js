$(onHtmlLoaded);

function onHtmlLoaded(){
    console.log("DOM loaded");

    //display technical information and display hobbies
    var displayTechnical = function(){
        var info = $(".technicalClass");
        info.css("visibility", "visible");
    }
    var jsBox = $("#js-box");
    jsBox.on("click", displayTechnical);

    var hobbiesBox = $("#hobbies-box");
    hobbiesBox.on("click", displayTechnical);

  
    
    
}