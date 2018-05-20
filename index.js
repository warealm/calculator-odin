// variables
let userIsInTheMiddleOfTyping = false;
let operationToBePerformed = null;
let displayValueText = '';
let firstOperand = 0;

// calculator operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operator = (operation, a, b) => {
  switch (operation) {
    case 'add':
      return add(a, b);
    case 'subtract':
      return subtract(a, b);
    case 'multiply':
      return multiply(a, b);
    case 'divide':
      return divide(a, b);
    default:
      break;
  }
};

// Getting reference to the buttons
const numberButtons = [...document.querySelectorAll('.number')];
const operations = [...document.querySelectorAll('.operations')];
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

// Updating the display and getting infor from the display
const updateDisplay = () =>
  (document.querySelector('.display').querySelector('p').textContent = displayValueText);
const getDisplayValue = () =>
  (displayValueText = document.querySelector('.display').querySelector('p').textContent);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (userIsInTheMiddleOfTyping) {
      displayValueText += button.innerHTML;
    } else {
      displayValueText = button.innerHTML;
      userIsInTheMiddleOfTyping = true;
    }
    updateDisplay();
  });
});

operations.forEach(button => {
  button.addEventListener('click', () => {
    if (!operationToBePerformed) {
      operationToBePerformed = button.id;
      firstOperand = Number(displayValueText);
      console.log(firstOperand);
      userIsInTheMiddleOfTyping = false;
    }
  });
});

equalsButton.addEventListener('click', () => {
  console.log(operationToBePerformed);
  console.log(firstOperand);

  if (operationToBePerformed) {
    let result = 0;
    if (operationToBePerformed === 'divide' && Number(displayValueText) === 0) {
      result = "Don't do this pls";
    } else {
      result = operator(operationToBePerformed, firstOperand, Number(displayValueText));
    }
    displayValueText = result;
    updateDisplay();
    userIsInTheMiddleOfTyping = false;
    operationToBePerformed = null;
  }
});

clearButton.addEventListener('click', () => {
  userIsInTheMiddleOfTyping = false;
  operationToBePerformed = null;
  displayValueText = '0';
  firstOperand = 0;
  updateDisplay();
});
