const display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = undefined;
let resetDisplay = false;

function updateDisplay() {
  display.value = currentOperand === '' ? '0' : currentOperand;
}

function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = undefined;
  resetDisplay = false;
  updateDisplay();
}

function deleteLast() {
  currentOperand = currentOperand.slice(0, -1);
  updateDisplay();
}

function clearEntry() {
  currentOperand = '';
  updateDisplay();
}

function appendNumber(number) {
  if (resetDisplay) {
    currentOperand = number;
    resetDisplay = false;
  } else if (currentOperand === '0') {
    if (number === '0') {
      return;
    } else {
      currentOperand = number;
    }
  } else {
    currentOperand += number;
  }
  updateDisplay();
}

function addDecimal() {
  if (resetDisplay) {
    currentOperand = '0.';
    resetDisplay = false;
    updateDisplay();
    return;
  }
  if (currentOperand.includes('.')) return;
  if (currentOperand === '') {
    currentOperand = '0.';
  } else {
    currentOperand += '.';
  }
  updateDisplay();
}

function chooseOperation(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  previousOperand = currentOperand;
  currentOperand = '';
  operation = op;
  updateDisplay();
}

function compute() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  let result;
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '÷':
      if (current === 0) {
        result = 'Error';
      } else {
        result = prev / current;
      }
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  previousOperand = '';
}

function equals() {
  if (!operation || currentOperand === '') return;
  compute();
  resetDisplay = true;
  updateDisplay();
}

function percent() {
  if (currentOperand === '') return;
  const value = parseFloat(currentOperand) / 100;
  currentOperand = value.toString();
  updateDisplay();
}

document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value)) {
      appendNumber(value);
    } else if (['+', '-', '*', '÷'].includes(value)) {
      chooseOperation(value);
    } else if (value === '=') {
      equals();
    } else if (value === '.') {
      addDecimal();
    } else if (value === '%') {
      percent();
    } else if (value === 'C') {
      clear();
    } else if (value === 'X') {
      clearEntry();
    } else if (value === '←') {
      deleteLast();
    }
  });
});

clear();