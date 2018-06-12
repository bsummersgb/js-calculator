const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');

const display = document.querySelector('.calculator__screen');

const calculate = (n1, operator, n2) => {
    switch (operator) {
        case 'add':
            return parseFloat(n1) + parseFloat(n2);
            break;
        case 'subtract':
            return parseFloat(n1) - parseFloat(n2);
            break;
        case 'multiply':
            return parseFloat(n1) * parseFloat(n2);
            break;
        case 'divide':
            return parseFloat(n1) / parseFloat(n2);
            break;
    }
    calculator.dataset.firstValue = n2;
}


keys.addEventListener('click', event => {
    const key = event.target;
    const action = key.dataset.action;
    const displayedNumber = display.textContent;
    const keyContent = key.textContent;

    Array.from(key.parentNode.children)
        .forEach(key => key.classList.remove('is-depressed'));

    if (key.matches('button')) {
        const previousKeyType = calculator.dataset.previousKeyType;
        if (!action) {
            if (
                displayedNumber === '0' || 
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = keyContent;
            } else {
                display.textContent += keyContent;
            }
            calculator.dataset.previousKeyType = 'number';                        
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) { 
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNumber;

            if (
                firstValue && 
                operator && 
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;

              
                // Update calculated value as firstValue
                calculator.dataset.firstValue = calcValue;
              } else {
                // If there are no calculations, set displayedNum as the firstValue
                calculator.dataset.firstValue = displayedNumber;
              }


            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';                        
            calculator.dataset.operator = action;
        }
        if (action === 'decimal') {
            if (display.textContent.indexOf('.') == -1) {
                display.textContent += '.';
            } 
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.';
            } else {
                return;
            }
            calculator.dataset.previousKeyType = 'decimal';            
            
        }
        if (action === 'calculate') { 
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNumber;
            calculator.dataset.previousKeyType = 'equals';         
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNumber;
                    secondValue = calculator.dataset.modifierValue;
                }
                display.textContent = calculate(firstValue, operator, secondValue);
                calculator.dataset.modifierValue = secondValue;
                calculator.dataset.previousKeyType = 'calculate'
            }

        }
        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC';            
            }
            display.textContent = "0";
            calculator.dataset.previousKeyType = 'clear';             
        }
        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE'
        }
    }
});

