const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear-button]');
const previosOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-oprand]');


class Calculator { 
    constructor(previosOperandTextElement, currentOperandTextElement){
        this.previosOperandTextElement = previosOperandTextElement 
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }

    formateDisplayNumber(number){ // formata para colocar as (,)
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split('.'[0]))
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay = "";
        }
        else{
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay;
        }
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    calculate(){
        let result;

        const previosOperandFloat = parseFloat(this.previosOperand)
        const currentOperandFloat = parseFloat(this.currentOperand)

        if(isNaN(previosOperandFloat) || isNaN(currentOperandFloat)) return;

        switch (this.operation){
            case '+':
                result = previosOperandFloat + currentOperandFloat
                break;
            case '-':
                result = previosOperandFloat + currentOperandFloat
                break;
            case '÷':
                result = previosOperandFloat + currentOperandFloat
                break;
            case '*':
                result = previosOperandFloat + currentOperandFloat
                break;
               
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previosOperand = "";
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previosOperand !== ''){ // Se meu previosOperand for diferente de vazio então calcula pra mim.
            this.calculate();
        }
        this.operation = operation;

        this.previosOperand = this.currentOperand; // Estou vindo da função updatedisplay
        this.currentOperand = '';   // Estou vindo da função updatedisplay
    }


    appendNumber(number){
        if(this.currentOperand.includes('.') && number === ('.')) return;//retornando o botao (.) para não poder adicionar mais nenhum
        this.currentOperand = `${this.currentOperand}${`${number.toString()}`}` //Adiciona meu numero no display
    }

    clear() {
        this.currentOperand = '';  // Esse this vou jogar ele lá em baixo na minha função updateDisplay
        this.previosOperand = '';  // Esse this vou jogar ele lá em baixo na minha função updateDisplay
        this.operation = undefined;
    }

    updatedisplay(){ 
        this.previosOperandTextElement.innerText = `${this.formateDisplayNumber(this.previosOperand)}${this.operation || ''}`
        this.currentOperandTextElement.innerText = this.formateDisplayNumber(this.currentOperand);  
    }
}

const calculator = new Calculator(
    previosOperandTextElement,
    currentOperandTextElement
);

for(const numberButton of numberButtons){
        numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText); //Qunado eu clicar minha função receber o valor numberbutton.innerText
        calculator.updatedisplay();//Para eu poder meus atributos dentro da miha function chooseOperation(), eu preciso colocar essa função updatedisplay() que formata meus previos e current para poder pegar dela as previos e current.
    })
}

for(const operationButton of operationButtons){ //minha cosnt operationButton recebe os valores do operationButtons
    operationButton.addEventListener('click', () => { //quando clicar nos meus operadores o numero subir para cima
        calculator.chooseOperation(operationButton.innerText) // recebendo minha função que joga o Operand no current
        calculator.updatedisplay(); //Para eu poder meus atributos dentro da miha function chooseOperation(), eu preciso colocar essa função updatedisplay() que formata meus previos e current para poder pegar dela as previos e current.
    })
}

allClearButton.addEventListener('click', () => {  //quando eu clicar no meu button AC limpa tudo 
    calculator.clear(); //chamando a função clear, que limpa tudo.
    calculator.updatedisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updatedisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updatedisplay()
})
