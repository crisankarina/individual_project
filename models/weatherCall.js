function Weather(options){
    options = options || {}
    this.temp_f = options.temp_f;
    this.temp_c = options.temp_c;
}

Weather.prototype.getWeatherInfo = function (){
    var that = this;
    return $.get("https://api.wunderground.com/api/cfbfc5f603141e07/conditions/q/RO/Cluj_Napoca.json")
    .then(function(response){
        that.temp_f = response.current_observation.temp_f;
        that.temp_c = response.current_observation.temp_c;
    });
}