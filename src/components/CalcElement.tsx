interface CalcElementProps {
  index: number;
  command: string | number;
  value: number;
}

const CalcElement = ({ index, command, value }: CalcElementProps) => {
  const isCommandNumber = (typeof (command) === "number");

  return (
    <div className="calc-item" key={index}>
      <span className="calc-item-index">{index.toString() + ":"}</span>
      <div className="calc-item-command">
        <span className="calc-item-value">{value}</span>
        <span className="calc-item-command">{!isCommandNumber && command}</span>
      </div>
    </div>
  )
}

export default CalcElement;