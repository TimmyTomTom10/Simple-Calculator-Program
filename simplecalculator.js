const clearBtn = document.getElementById("clearBtn");
const modBtn = document.getElementById("modBtn");
const delBtn = document.getElementById("delBtn");

const plusBtn = document.getElementById("plusBtn");
const sevenBtn = document.getElementById("7Btn");
const eightBtn = document.getElementById("8Btn");
const nineBtn = document.getElementById("9Btn");

const minusBtn = document.getElementById("minusBtn");
const fourBtn = document.getElementById("4Btn");
const fiveBtn = document.getElementById("5Btn");
const sixBtn = document.getElementById("6Btn");

const leftParBtn = document.getElementById("leftParBtn");
const multBtn = document.getElementById("multBtn");
const oneBtn = document.getElementById("1Btn");
const twoBtn = document.getElementById("2Btn");
const threeBtn = document.getElementById("3Btn");

const rightParBtn = document.getElementById("rightParBtn");
const divBtn = document.getElementById("divBtn");
const zeroBtn = document.getElementById("0Btn");
const equalBtn = document.getElementById("equalBtn");

const calculatorHead = document.getElementById("calculator-head");

let calcDisplay = "1234456789";
let allowedRightParenthesis = 0;
let numRightParenthesis = 0;
let numLeftParenthesis = 0;


//Display
displayEquation();
function displayEquation(){
    calculatorHead.textContent = calcDisplay;
}

//Clear
clearBtn.onclick = function(){
    calcDisplay = "";
    displayEquation();
    postFixOrder.length = 0;
    tokens.length = 0;
    allowedRightParenthesis = 0;
    numRightParenthesis = 0;
    numLeftParenthesis = 0;
}

//Del
delBtn.onclick = function(){
    if(calcDisplay.length > 0){
        if(calcDisplay[calcDisplay.length] == '('){
            allowedRightParenthesis--;
            numLeftParenthesis--;
        }
        if(calcDisplay[calcDisplay.length] == ')'){
            numRightParenthesis--;
        }
        calcDisplay = calcDisplay.slice(0, calcDisplay.length - 1);
        displayEquation();
    }
}

//1
oneBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay[calcDisplay.length-1] != ')'){
        calcDisplay += "1";
        displayEquation();
    }
}
//2
twoBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay[calcDisplay.length-1] != ')'){
        calcDisplay += "2";
        displayEquation();
    }
}
//3
threeBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay[calcDisplay.length-1] != ')'){
        calcDisplay += "3";
        displayEquation();
    }
}
//4
fourBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay[calcDisplay.length-1] != ')'){
        calcDisplay += "4";
        displayEquation();
    }
}
//5
fiveBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay[calcDisplay.length-1] != ')'){
        calcDisplay += "5";
        displayEquation();
    }
}
//6
sixBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay[calcDisplay.length-1] != ')'){
        calcDisplay += "6";
        displayEquation();
    }
}
//7
sevenBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay[calcDisplay.length-1] != ')'){
        calcDisplay += "7";
        displayEquation();
    }
}
//8
eightBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay[calcDisplay.length-1] != ')'){
        calcDisplay += "8";
        displayEquation();
    }
}
//9
nineBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay[calcDisplay.length-1] != ')'){
        calcDisplay += "9";
        displayEquation();
    }
}
//0
zeroBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay[calcDisplay.length-1] != ')' ){
        calcDisplay += "0";
        displayEquation();
    }
}



const invalidSelections = ['+', '-', '*', '/','%','('];
const nums = ['1','2','3','4','5','6','7','8','9','0',')'];
let tokens = [];
let postFixOrder = [];



//Equals
equalBtn.onclick = function(){
    if(numLeftParenthesis == numRightParenthesis){
        try {
            makeArrayFromString(calcDisplay);
            postFixOrder = toPostfix(tokens);

            calcDisplay = evaluatePostfix(postFixOrder).toString();
            displayEquation();

        } catch (error) {
            calcDisplay = "Error";
            displayEquation();
        }

        postFixOrder.length = 0;
        tokens.length = 0;
        allowedRightParenthesis = 0;
        numRightParenthesis = 0;
        numLeftParenthesis = 0;
    }
    else{
        window.alert("Uneven Parenthesis Distribution");
    }
}

//Make Array From String
function makeArrayFromString(calcDisplay){
    tokens = calcDisplay.split(/([+*%-/()])/).filter(Boolean);
    
}

//Make PostFix Array
function toPostfix(tokens) {
  const output = [];
  const operators = [];

  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2
  };

  const isOperator = (token) => token in precedence;

  for (let token of tokens) {

    // If number → add to output
    if (!isNaN(token)) {
      output.push(token);
    }

    // If operator
    else if (isOperator(token)) {
      while (
        operators.length &&
        isOperator(operators[operators.length - 1]) &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    }

    // If left parenthesis
    else if (token === "(") {
      operators.push(token);
    }

    // If right parenthesis
    else if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }
      operators.pop(); // remove "("
    }
  }

  // Pop remaining operators
  while (operators.length) {
    output.push(operators.pop());
  }

  return output;
}

//Do The Calculations
function evaluatePostfix(tokens) {
  const stack = [];

  for (let token of tokens) {

    // If number → push to stack
    if (!isNaN(token)) {
      stack.push(Number(token));
    }

    // If operator → pop two numbers
    else {
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
            if (b === 0) {
                window.alert("Cannot divide by zero");
                throw new Error("Cannot divide by zero");
                
            }
            stack.push(a / b);
            break;
        case "%":
          stack.push(a % b);
          break;
        default:
          throw new Error("Unknown operator: " + token);
      }
    }
  }

  return stack.pop();
}





//Operators
// +
plusBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay.length != 0){
        if(!invalidSelections.includes(calcDisplay[calcDisplay.length-1])){
            calcDisplay += "+";
            displayEquation();
        }
    }
}
// -
minusBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay.length != 0){
        if(!invalidSelections.includes(calcDisplay[calcDisplay.length-1])){
            calcDisplay += "-";
            displayEquation();
        }
    }
}
// *
multBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay.length != 0){
        if(!invalidSelections.includes(calcDisplay[calcDisplay.length-1])){
            calcDisplay += "*";
            displayEquation();
        }
    }
}
// /
divBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay.length != 0){
        if(!invalidSelections.includes(calcDisplay[calcDisplay.length-1])){
            calcDisplay += "/";
            displayEquation();
        }
    }
}
// %
modBtn.onclick = function(){
    if(calcDisplay.length < 10 && calcDisplay.length != 0){
        if(!invalidSelections.includes(calcDisplay[calcDisplay.length-1])){
            calcDisplay += "%";
            displayEquation();
        }
    }
}



// (
leftParBtn.onclick = function(){
    if(calcDisplay.length < 10 && !nums.includes(calcDisplay[calcDisplay.length-1])){
        calcDisplay += "(";
        displayEquation();
        allowedRightParenthesis++;
        numLeftParenthesis++;
    }
}
// )
rightParBtn.onclick = function(){
    if(allowedRightParenthesis > numRightParenthesis){
        if(calcDisplay.length < 10 && calcDisplay.length != 0){
                calcDisplay += ")";
                numRightParenthesis++;
                displayEquation();
        }
    }

}


