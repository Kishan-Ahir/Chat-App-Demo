let http = require("http");

let route = require('./routes.js'); //because it is not global module this is special or local module that we have created.

console.log(route.someetext);


let chatdemo =  http.createServer(route.handler);// here we are saying node to execute function that is stored into route.

chatdemo.listen(30);

