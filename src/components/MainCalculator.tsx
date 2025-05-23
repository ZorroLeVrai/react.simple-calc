import { useState, useRef, useEffect } from 'react'
import CalcElement from './CalcElement';
import KeyPanel from './KeyPanel';

interface CalcItem {
  command: string | number;
  value: number;
}

function MainCalculator() {
  // current input value
  const [input, setInput] = useState<string>("");
  // list of operands
  const [operands, setOperands] = useState<CalcItem[]>([]);
  // reference to the calculator stacks
  const calculatorStacksRef = useRef<HTMLDivElement>(null);
  // used to clear all the stack in case of a double clear command
  const isClearMode = useRef<boolean>(false);

  // scroll to the bottom of the calculator stacks when a new operand is added
  useEffect(() => {
    if (calculatorStacksRef.current) {
      calculatorStacksRef.current.scrollTop = calculatorStacksRef.current.scrollHeight;
    }
  }, [operands]);

  const nbOperands = operands.length;

  const commandToStr = (command: string | number) => {
    if (typeof command === "number") {
      return command.toString();
    }
    return `(${command})`;
  }

  const binaryCompute = (operand1: CalcItem, operand2: CalcItem, operator: string, operation: (a: number, b: number) => number): CalcItem => {
    const { command: firstCommand, value: firstValue } = operand1;
    const { command: secondCommand, value: secondValue } = operand2;

    return {
      command: `${commandToStr(firstCommand)}${operator}${commandToStr(secondCommand)}`,
      value: operation(firstValue, secondValue)
    }
  }

  const handleBinaryOperation = (operator: string, operation: (a: number, b: number) => number) => {
    if (nbOperands < 2) {
      return;
    }
    const secondItem = operands.pop();
    const firstItem = operands.pop();
    if (firstItem && secondItem) {
      const result = binaryCompute(firstItem, secondItem, operator, operation);
      setOperands([...operands, result]);
    }
    setInput("");
  }

  const handleInverse = () => {
    if (nbOperands < 1) {
      return;
    }

    const firstItem = operands.pop();
    if (firstItem) {
      const computationResult = { command: `1/${commandToStr(firstItem.command)}`, value: 1 / firstItem.value };
      setOperands([...operands, computationResult]);
    }
    setInput("");
  }

  const handlePlus = () => {
    handleBinaryOperation('+', (a, b) => a + b);
  }

  const handleMinus = () => {
    handleBinaryOperation('-', (a, b) => a - b);
  }

  const handleMultiplication = () => {
    handleBinaryOperation('*', (a, b) => a * b);
  }

  const handleDivision = () => {
    handleBinaryOperation('/', (a, b) => a / b);
  }

  const handleIntegerDivision = () => {
    handleBinaryOperation('//', (a, b) => Math.floor(a / b));
  }

  const handleModulo = () => {
    handleBinaryOperation(' mod ', (a, b) => a % b);
  }

  const handlePower = () => {
    handleBinaryOperation('^', (a, b) => Math.pow(a, b));
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    switch (event.key) {
      case "Enter":
        switch (input) {
          case "mod":
            handleKeyPress("mod");
            break;
          case "div":
            handleKeyPress("//");
            break;
          case "inv":
            handleKeyPress("1/x");
            break;
          default:
            handleKeyPress("⏎");
            break;
        }
        break;
      case "Backspace":
        handleKeyPress("←");
        break;
      case "Delete":
        handleKeyPress("❌");
        break;
      default:
        handleKeyPress(event.key);
        break;
    }
  }

  const handleKeyPress = (key: string) => {
    let inputValue: number;
    switch (key) {
      case '+':
        handlePlus();
        break;
      case '-':
        handleMinus();
        break;
      case '*':
        handleMultiplication();
        break;
      case '/':
        handleDivision();
        break;
      case '//':
        handleIntegerDivision();
        break;
      case 'mod':
        handleModulo();
        break;
      case '^':
        handlePower();
        break;
      case '1/x':
        handleInverse();
        break;
      case '❌':
        handleClear();
        break;
      case '←':
        // Remove the last character from the input field
        setInput(input.slice(0, -1));
        break;
      case '⏎':
        inputValue = parseFloat(input);
        setOperands([...operands, { command: inputValue, value: inputValue }]);
        setInput("");
        break;
      default:
        isClearMode.current = false;
        setInput(input + key);
        break;
    }
  }

  const handleClear = () => {
    if (isClearMode.current) {
      setOperands([]);
    }

    setInput("");
    isClearMode.current = true;
  }

  return (
    <>
      <div className="calculator" ref={calculatorStacksRef}>
        {operands.map((operand, index) => (
          <CalcElement key={index} index={nbOperands - index} command={operand.command} value={operand.value} />
        )
        )}
      </div>
      <div>
        <input id="command-input" type="text" value={input} placeholder="Enter your command" onKeyDown={handleInputKeyDown} onChange={() => { }} />
      </div>
      <KeyPanel onKeyPress={handleKeyPress} />
    </>
  )
}

export default MainCalculator;
