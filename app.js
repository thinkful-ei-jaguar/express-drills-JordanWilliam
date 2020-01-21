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

console.log('app.js working! ');

//DRILL #1 
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

//DRILL #2
app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;

  const numShift = +shift;
  const aCode = 'A'.charCodeAt(0);
  console.log('aCode:', aCode);

  const decipher = text.toUpperCase().split('').map(char => {
    const charCode = char.charCodeAt(0); //returns the numerical code for the character its mapping over ('A' = 65)
    console.log('char:', char); 
    console.log('charCode:', charCode); 

    //return the character is it is not of the 26 letters in the alphabet 
    if (charCode < aCode || charCode > (aCode + 26)){
      return char;
    }
    //if it is one of the letters from the alphabet, convert it 
    const shiftedChar = String.fromCharCode(charCode + numShift);
    return shiftedChar;
  }).join('');

  res.send(decipher);
});

//DRILL #3
