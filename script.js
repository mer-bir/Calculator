function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'wut?';
    } else {
        return a / b;
    }
}

function operate(a, b, op) {
    if (op === '+') return add(a, b);
    if (op === '-') return subtract(a, b);
    if (op === '×') return multiply(a, b);
    if (op === '/') return divide(a, b);
}

const buttons = document.querySelectorAll('.butts');
const display = document.querySelector('#display');
const operations = document.querySelectorAll('.operation');

let operators = ['+', '-', '/', '×'];
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let displayValue = '0';
let a = null;
let b = null;
let operator1 = null;
let operator2 = null;
let result = null;

function updateDisplay() {
    display.textContent = displayValue;
    if (displayValue.length > 9) {
        display.textContent = displayValue.substring(0, 9);
    }
}

updateDisplay();

function clearButton() {
    displayValue = '0';
    a = null;
    b = null;
    operator1 = null;
    operator2 = null;
    result = null;
}

function signChange(num) {
    if (num < 0) {
        return Math.abs(num);
    } else if (num > 0) {
        return -Math.abs(num);
    }
}

function percentage(num) {
    return num / 100;
}

function roundResult(num, place) {
    return parseFloat(Math.round(num + 'e' + place) + 'e-' + place);
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.textContent == 'AC') {
            clearButton();
            updateDisplay();
        }

        if (button.textContent == '+/-') {
            displayValue = signChange(Number(displayValue));
            updateDisplay();
        }

        if (button.textContent == '%') {
            displayValue = percentage(Number(displayValue));
            updateDisplay();
        }

        for (let number of numbers) {
            if (button.textContent == number) {
                displayValue = displayValue + number.toString();
                if (displayValue.startsWith('0') && displayValue.length > 1) {
                    displayValue = displayValue.slice(1);
                }
                if (operator2) {
                    displayValue = '' + number.toString();
                    operator2 = null;
                }
            }
            updateDisplay();
        }

        for (let op of operators) {
            if (button.textContent == op) {
                button.classList.add('highlight');
                if (operator1 === null) {
                    a = Number(displayValue);
                    operator1 = op;
                    displayValue = '';
                } else if (operator1 && a && b === null && operator2 === null) {
                    if (displayValue == '') {
                        operator1 = op;
                    } else {
                        operator2 = op;
                        b = Number(displayValue);
                        result = operate(a, b, operator1);
                        displayValue = roundResult(result, 15).toString();
                        operator1 = operator2;
                        a = result;
                        b = null;
                        result = null;
                    }
                } else if (a && operator1 && operator2) {
                    operator1 = op;
                }
            }
            updateDisplay();
        }

        if (button.textContent == '=') {
            if (a && operator1) {
                if (displayValue !== '') {
                    b = Number(displayValue);
                    result = operate(a, b, operator1)
                    displayValue = roundResult(result, 15).toString();
                    a = result;
                    operator1 = null;
                    b = null;
                    result = null;
                }
            }
            updateDisplay();
        }

        if (button.textContent == '.') {
            if (!(displayValue.includes('.'))) {
                displayValue += '.';
            }
            updateDisplay();
        }


    });
})

