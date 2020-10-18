class Calculator {
   constructor(previousDataText, currentDataText) {
      this.previousDataText = previousDataText;
      this.currentDataText = currentDataText;
      this.clear();
   }

   clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
   }

   delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
   }

   appendNumber(number) {
      if (this.isComputed) {
         this.clear();
         this.isComputed = false;
      }
      if (number === '.' && this.currentOperand.includes('.')) return;
      if (number === '-' && this.currentOperand.includes('-')) return;
      this.currentOperand += number.toString();
   }

   chooseOperation(operation) {
      if (operation === '√') {
         this.clear()
         this.updateDisplay();
      }

      if (this.currentOperand === '' && operation != '√') return;
      if (this.previousOperand !== '') {
         this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
   }

   compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const curr = parseFloat(this.currentOperand);
      if (isNaN(curr)) return;
      switch (this.operation) {
         case '+':
            computation = parseFloat((prev + curr).toFixed(10));
            break;
         case '-':
            computation = parseFloat((prev - curr).toFixed(10));
            break;
         case '/':
            computation = parseFloat((prev / curr).toFixed(10));
            break;
         case '*':
            computation = parseFloat((prev * curr).toFixed(10));
            break;
         case '**':
            computation = parseFloat((prev ** curr).toFixed(10));
            break;
         case '√':
            computation = parseFloat(Math.sqrt(curr).toFixed(10)).toString();
            break;
         default:
            return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
      this.isComputed = true;
   }

   getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigit = parseFloat(stringNumber.split('.')[0]);
      const decimalDigit = stringNumber.split('.')[1];
      let integerDisplay;

      if (number === 'NaN') return integerDisplay = `Error`;
      if (number === '-') return integerDisplay = `-`;

      if (isNaN(integerDigit)) integerDisplay = '';
      else integerDisplay = integerDigit.toLocaleString('en', { maximumFractionDigits: 0 })

      if (decimalDigit != null) return `${integerDisplay}.${decimalDigit} `;
      else return integerDisplay;

   }

   updateDisplay() {
      this.currentDataText.innerText = this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
         this.previousDataText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;

      } else {
         this.previousDataText.innerText = '';
      }
   }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const previousDataText = document.querySelector('[data-previous-operand]');
const currentDataText = document.querySelector('[data-current-operand]');
const allClearButton = document.querySelector('[data-all-clear]');

const calculator = new Calculator(previousDataText, currentDataText);

numberButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
   });
});

operationButtons.forEach(button => {
   button.addEventListener('click', () => {
      if (button.innerText === calculator.currentOperand) {
         return;
      } else {
         calculator.chooseOperation(button.innerText);
         calculator.updateDisplay();
      }
   });
});

equalsButton.addEventListener('click', button => {
   calculator.compute();
   calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
   calculator.clear();
   calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
   calculator.delete();
   calculator.updateDisplay();
});