var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var axios = require('axios');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(3000, function(){
    console.log("  __setting local server on port 3000");
    console.log("  __now serving miniWeatherApp");
});

var weatherModule = (function(){
    
    'use strict';

    const queryUrl = "https://www.metaweather.com//api/location/search/?query=";
    const queryWoeiUrl = "https://www.metaweather.com/api/location/";
    let results = {
        woeid: null,
        date: null,
        location: null,
        min_temp: null,
        max_temp: null,
        error: true
    };
    let _callback;
    
    function query(input=null,callback=null){
        _callback=null;
        if(input!=null && callback!=null){
            _callback=callback;
            axios(
                {
                    method: 'get',
                    url: queryUrl+input,
                }
            )
            .then( (res) => {
                if(res.data.length>0){
                    results.woeid=res.data[0].woeid.toString();
                    results.location=res.data[0].title;
                    return _queryWoeid();
                }
                else{
                    throw new Error("  __No result matching query");
                }
            })
            .catch( (err)=>{
                console.error(err);
                results.error=true;
            });
        }
        else if(callback==null){
            console.error("  __Invalid callback function");
            results.error=true;    
        }
        else{
            console.error("  __Invalid search input");
            results.error=true;
        }
    }

    function _queryWoeid(){
        axios(
            {
                method: 'get',
                url: queryWoeiUrl+results.woeid+'/'
                //url: queryWoeiUrl+"123d23/"
            }
        )
        .then( (res) => {
            if(res.data !== null && res.data.hasOwnProperty('consolidated_weather')){
                results.date=res.data.consolidated_weather[0].applicable_date;
                results.min_temp=res.data.consolidated_weather[0].min_temp;
                results.max_temp=res.data.consolidated_weather[0].max_temp;
                results.error=false;
                _callback();
            }
            else{
                throw new Error("  __Invalid WOEID");
            }
        })
        .catch( (err)=>{
            console.error("  __Bad WOEID query");
            results.error=true;
        });
    }

    return{
        query: query,
        results: results
    };
}());

app.post("/addWeather",function(req,res){
    weatherModule.query(req.body.newLocation,()=>{return res.redirect("/");});
});

app.get("/",function(req,res){
    res.render("index",{results: weatherModule.results});
});