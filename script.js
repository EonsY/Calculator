// Variables
const displayBottom = document.getElementById('display-current');
let calculationStr = '';
let ans = '';
let numberCollection = ['00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let operationCollection = ['+', '-', 'x', '÷', '%'];

// Calculation
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

function percent(x) {
    return x / 100;
}

function operate() {
    let tempStr = '';
    let tempArr = [];

    // Putting calculation into array
    for (let i = 0; i < calculationStr.length; i++) {
        if (operationCollection.includes(calculationStr[i])) {
            tempArr.push(tempStr);
            tempArr.push(calculationStr[i]);
            tempStr = '';
        } else if (numberCollection.includes(calculationStr[i])) {
            tempStr += calculationStr[i];
        }
    }
    
    tempArr.push(tempStr);

    // Converting string value numbers into float and int value numbers
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] === '') {
            tempArr.splice(i, 1);
        } else if (!operationCollection.includes(tempArr[i])) {
            tempArr[i] = parseFloat(tempArr[i]);
        }
    }

    // Putting calculation array through calcuation processes
    for (let i = 0; i < tempArr.length; i++) {
        if (!operationCollection.includes(tempArr[0]) && !operationCollection.includes(tempArr[tempArr.length - 1])) {
            if (tempArr[i] === '+') {
                let result = add(tempArr[i - 1], tempArr[i + 1]);
                tempArr.splice(i - 1, 3);
                tempArr.unshift(result);
                i = 0;
            } else if (tempArr[i] === '-') {
                let result = subtract(tempArr[i - 1], tempArr[i + 1]);
                tempArr.splice(i - 1, 3);
                tempArr.unshift(result);
                i = 0;
            } else if (tempArr[i] === 'x') {
                let result = multiply(tempArr[i - 1], tempArr[i + 1]);
                tempArr.splice(i - 1, 3);
                tempArr.unshift(result);
                i = 0;
            } else if (tempArr[i] === '÷') {
                let result = divide(tempArr[i - 1], tempArr[i + 1]);
                tempArr.splice(i - 1, 3);
                tempArr.unshift(result);
                i = 0;
            } else if (tempArr[i] === '%') {
                let result = percent(tempArr[i - 1]);
                tempArr.splice(i - 1, 2);
                tempArr.unshift(result);
                i = 0;
            }
        } else {
            ans = 'Error';
        }
    }

    if (!operationCollection.includes(tempArr[0])) {
        ans = tempArr[0];
    } else {
        ans = 'Error';
    }
}

// Special operation functions
function clearAll() {
    displayBottom.innerHTML = '';
    calculationStr = '';
}

document.getElementById('C').onclick = clearAll();

document.getElementById('DEL').onclick = function() {
    let string = displayBottom.innerHTML.toString();
    displayBottom.innerHTML = string.substring(0, string.length - 1);
    calculationStr = calculationStr.substring(0, calculationStr.length - 1);
}

document.getElementById('=').onclick = function() {
    operate();

    if (ans === 'Infinity') {
        ans = 'Error';
    } else if (ans === undefined) {
        ans = 'Error';
    }

    displayBottom.innerHTML = ans;

    function equalClearAll() {
        clearAll();
        buttons.forEach(button => button.removeEventListener('click', equalClearAll));
    }

    buttons.forEach(button => button.addEventListener('click', equalClearAll));
}

// Input functions
function  displayInput() {
    if (this.classList[0] !== 'spec-ops' && calculationStr.length !== 11) {
    displayBottom.innerHTML += this.innerHTML;
        if (this.innerHTML === "×") {
            calculationStr += 'x';
        } else {
            calculationStr += this.innerHTML;
        }
    }
}

// Eventlisteners
const grid = document.getElementById('calculator-grid');
const buttons = Array.from(document.querySelectorAll('.button'));

buttons.forEach(button => button.addEventListener('click', displayInput));