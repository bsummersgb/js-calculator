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
}


keys.addEventListener('click', event => {
    const key = event.target;
    const action = key.dataset.action
    const displayedNumber = display.textContent;
    const keyContent = key.textContent;

    Array.from(key.parentNode.children)
        .forEach(key => key.classList.remove('is-depressed'));

    if (event.target.matches('button')) {
        const previousKeyType = calculator.dataset.previousKeyType;
        if (!action) {
            if (displayedNumber === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
            } else {
                display.textContent += keyContent;
            }
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) { 
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNumber;
            calculator.dataset.operator = action;
        }
        if (action === 'decimal') {
            if (display.textContent[display.textContent.length - 1] !== '.' && display.textContent.indexOf('.') == -1) {
                display.textContent += '.';
            } else {
                return;
            }
        }
        if (action === 'calculate') { 
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNumber;

            display.textContent = calculate(firstValue, operator, secondValue);

        }
        if (action === 'clear') { console.log(`You hit the ${action} button mofo`) }
    }
});

