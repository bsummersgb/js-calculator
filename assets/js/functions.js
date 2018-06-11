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
            if (displayedNumber === '0' || previousKeyType === 'operator') {
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
                previousKeyType !== 'operator'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue; console.log('calcValue before updating firstValue', calcValue);

              
                // Update calculated value as firstValue
                calculator.dataset.firstValue = calcValue; console.log('calcValue after updating firstValue', calcValue);
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
            if (previousKeyType === 'operator') {
                display.textContent = '0.';
            } else {
                return;
            }
            calculator.dataset.previousKeyType = 'decimal';            
            
        }
        if (action === 'calculate') { 
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNumber;
            calculator.dataset.previousKeyType = 'equals';         

            display.textContent = calculate(firstValue, operator, secondValue);

        }
        if (action === 'clear') { 
            calculator.dataset.previousKeyType = 'clear';       
            
        }
    }
});

