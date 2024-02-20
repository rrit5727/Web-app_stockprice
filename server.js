
const express = require('express');

//can also call this 'app'
const server = express();
const yahooFinance = require('yahoo-finance2').default; 

//configure our server - will always need this
server.set('view engine', 'ejs');



// tell server about our routes and the functions 
//that should run when the browser requests those routes
//request = input, response = output
server.get('/', function(request, response) {
    response.render('Home'); // '/views' folder path is assumed
});


server.get('/info', function(request, response) {
       
    yahooFinance.quote( request.query.code ).then((results) => {
        console.log(results.regularMarketPrice);
        response.render('info', {
            price: results.regularMarketPrice,
            company: results.longName
        });
    })    
});

//attach the server to a port - will always need this
server.listen(3456, function() {
    console.log('server started at hhtp://localhost:3456/')
});

