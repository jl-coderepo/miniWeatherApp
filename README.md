# Mini Weather App

A miniature node.js weather app. A simple location search will get you weather 
information.
================================================================================

## Getting Started

#### Prerequisites

You need to have node.js inorder to run this web app.

Install Node.js on Ubuntu
```bash
sudo apt-get install nodejs
```
Install Node.js on Arch Linux
```bash
pacman -S nodejs npm
```
Other
[Link to node.js installer downloads](https://nodejs.org/en/download/)

#### Installing

You need to first clone the repository
```bash
git clone https://github.com/jl-coderepo/miniWeatherApp.git
```
Go into the directory
```bash
cd miniWeatherApp
```
Then proceed to install all it's dependencies
```bash
npm install
```

## Running the app

#### Quick Start

To get the server running need to run the command
```bash
nope app.js
```
Default the app will host it locally on port 3000 which can be accessed via browser by http://localhost:3000

Basically search for a location, and first closest match will be retrieved and basic weather info will be shown.

#### Deeper Look

You can change the parameters for host and port at line 11
```javascript
app.listen(3000, function(){
    console.log("  __setting local server on port 3000");
    console.log("  __now serving miniWeatherApp");
});
```
For more information please read [Express documentation on listen](https://expressjs.com/en/api.html#app.listen)

The `weatherModule` is where the actual api calls are made. It is an object with two properties which are `results` and `query`. The `results` property is an object whereas `query` is a method. The `query` method requires two parameters, the initial string to search and a callback function to call once all the api calls have been made. 

#### Built With

* [Express](https://expressjs.com/) - a web framework for node.js
* [Axios](https://github.com/axios/axios) - promised based HTTP client for the browser and node.js
* [body-parser](https://www.npmjs.com/package/body-parser) - node.js body parsing middleware.
* [EJS](https://www.npmjs.com/package/ejs) - embedded JavaScript templating
* [MetaWeather](https://www.metaweather.com/api/) - web api which provides aggregated weather information.

#### Aside
The styling and in general the front-end portion is bare minimum. Would definitely like to have live demo of this
made available on my profile site, but I still have to look into hosting services. The primary motivation is to do 
some light back-end practice and make design choices where I can integrate it to my personal website to generate pages dynamically and not static. Would like to use the github api to dynamically create my projects page for my site.