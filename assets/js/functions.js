const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    
    if (operator === 'add') return firstNum + secondNum
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
}

const getKeyType = (key) => {
    const { action } = key.dataset;
    if (!action) return 'number';
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) return 'operator'
    // for everything else, return the action
    return action;
}

const createResultString = (key, displayedNumber, state) => {
    const keyContent = key.textContent;
    const keyType = getKeyType(key);
    const {
        firstValue, 
        modifierValue, 
        operator, 
        previousKeyType
    } = state;

    if (keyType === 'number') {
        return displayedNumber === '0' || 
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
            ? keyContent
            : displayedNumber + keyContent;
    }

    if (keyType === 'decimal') {
        if (!displayedNumber.includes('.')) return displayedNumber + '.';
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
        return displayedNumber;
    }

    if (keyType === 'operator') {    
        return firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
          ? calculate(firstValue, operator, displayedNumber)
          : displayedNumber
      }

    if (keyType === 'clear') return 0;

    if (keyType === 'calculate') { 
        return firstValue
            ? previousKeyType === 'calculate'
                ? calculate(displayedNumber, operator, modifierValue)
                : calculate(firstValue, operator, displayedNumber)
            : displayedNumber;
    }
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNumber) => {
    const keyType = getKeyType(key);
    const {
        firstValue,
        operator,
        modifierValue,
        previousKeyType
      } = calculator.dataset

    calculator.dataset.previousKeyType = keyType

    if (keyType === 'operator') { 
        calculator.dataset.operator = key.dataset.action
        calculator.dataset.firstValue = firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
            ? calculatedValue
            : displayedNumber
    }

    if (keyType === 'calculate') { 
        calculator.dataset.modifierValue = firstValue && previousKeyType === 'calculate'
        ? modifierValue
        : displayedNumber
    }

    if (keyType === 'clear' && key.textContent === 'AC') { 
        calculator.dataset.firstValue = ''
        calculator.dataset.modifierValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
    }
}

const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key)
    Array.from(key.parentNode.children).forEach(key => key.classList.remove('is-depressed'));
  
    if (keyType === 'operator') key.classList.add('is-depressed');
    if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC';
    if (keyType !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = 'CE';
    }
  }

const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator__screen');
const keys = document.querySelector('.calculator__keys');

keys.addEventListener('click', event => {
    if (!event.target.matches('button')) return;

    const key = event.target;
    const displayedNumber = display.textContent;
    const resultString = createResultString(key, displayedNumber, calculator.dataset);
  
    display.textContent = resultString;
    updateCalculatorState(key, calculator, resultString, displayedNumber);
    updateVisualState(key, calculator);
});
