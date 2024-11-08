let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");

document.querySelectorAll(".digit").forEach(button => {
    button.addEventListener("click", () => appendNumber(button.dataset.digit));
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => setOperation(button.dataset.operator));
});

document.getElementById("equals").addEventListener("click", evaluate);
document.getElementById("clear").addEventListener("click", clearDisplay);
document.getElementById("decimal").addEventListener("click", appendDecimal);

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        updateDisplay(number);
        shouldResetDisplay = false;
    } else {
        updateDisplay(display.textContent + number);
    }
}

function setOperation(operator) {
    if (currentOperator !== null) evaluate();
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    secondNumber = display.textContent;
    const result = operate(currentOperator, firstNumber, secondNumber);
    updateDisplay(result);
    firstNumber = result;
    currentOperator = null;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return b === 0 ? "Cannot divide by 0!" : divide(a, b);
        default:
            return null;
    }
}

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
    return a / b;
}

function updateDisplay(value) {
    display.textContent = value;
}

function clearDisplay() {
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay(0);
}

function appendDecimal() {
    if (shouldResetDisplay) {
        updateDisplay("0.");
        shouldResetDisplay = false;
    } else if (!display.textContent.includes(".")) {
        updateDisplay(display.textContent + ".");
    }
}

document.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") appendDecimal();
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "Backspace") backspace();
    if (e.key === "Escape") clearDisplay();
    if (["+", "-", "*", "/"].includes(e.key)) setOperation(e.key);
}

function backspace() {
    if (display.textContent.length === 1) {
        updateDisplay("0");
    } else {
        updateDisplay(display.textContent.slice(0, -1));
    }
}
