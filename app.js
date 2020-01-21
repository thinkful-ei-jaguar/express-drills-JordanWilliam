const express = require('express');
const morgan = require('morgan');

const app = express();

// This is middleware that requests pass through on their way to the handlers
app.use(morgan('dev'));

//This is the first request handler
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

//Drill #1 
app.get('/sum', (req, res) => {
  const {a , b} = req.query;
  //validation that query request is provided
  if(!a){
    return res.status(400).send('a is required');
  }
  if(!b){
    return res.status(400).send('b is required');
  }
  
  //make sure a and b are existing, and are numbers
  const numA = +a;
  const numB = +b;

  //validate if query are numbers 
  if(typeof numA !== 'number'){
    return res.status(400).send('a must be a number');
  }
  if(typeof numB !== 'number'){
    return res.status(400).send('b must be a number');
  }

  //define c and a and b together
  const numC = numA + numB;
  //format the response string to return to user correctly 
  const responseStr = `The sum of ${numA} and ${numB} is ${numC}`;
  //send the response string 
  res.send(responseStr);
});

console.log('app.js working! ');