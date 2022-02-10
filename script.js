class Calculator {
    // Tells computer where to display prev/current Ops
    constructor(prevOpAndText, currentOpAndText) {
        this.prevOpAndText = prevOpAndText;
        this.currentOpAndText = currentOpAndText;
        //automatically clear data to create a new operation
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    //Each num is added onto display that the user clicks on
    appendNum(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }


    chooseOp(operation) {
        if (this.currentOperand === '') return
        //computes current equation before adding another operand to the equation
        if (this.prevOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }
    
    getDisplayNum(number) {
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits:0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
}
    updateDisplay() {
        this.currentOpAndText.innerText = this.getDisplayNum(this.currentOperand);
        if (this.operation != null) {
            this.prevOpAndText.innerText = `${this.prevOperand} ${this.operation}`;
        } else {
            this.prevOpAndText.innerText = ''
        }
 }


}

const prevOpAndText = document.querySelector('[data-prevOp]');
const currentOpAndText = document.querySelector('[data-currentOp]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const operationBtns = document.querySelectorAll('[data-operation]');
const numberBtns = document.querySelectorAll('[data-number]');
const equalsBtn = document.querySelector('[data-equals]');


const calculator = new Calculator(prevOpAndText, currentOpAndText);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})
operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText);
        calculator.updateDisplay();
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

