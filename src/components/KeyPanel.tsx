interface KeyPanelProps {
  onKeyPress: (key: string) => void;
  isDoubleKey?: boolean;
}

const KeyPanel = ({ onKeyPress }: KeyPanelProps) => {
  const generateKeyButton = (key: string, isDoubleKey?: boolean) => {
    const classContent = isDoubleKey ? "key-item-double" : "";

    return (
      <button onClick={() => onKeyPress(key)} className={classContent}>
        {key}
      </button>
    )
  }

  return (
    <div className="key-panel">
      {generateKeyButton("7")}
      {generateKeyButton("8")}
      {generateKeyButton("9")}
      {generateKeyButton("/")}
      {generateKeyButton("//")}
      {generateKeyButton("mod")}

      {generateKeyButton("4")}
      {generateKeyButton("5")}
      {generateKeyButton("6")}
      {generateKeyButton("*")}
      {generateKeyButton("^")}
      {generateKeyButton("1/x")}

      {generateKeyButton("1")}
      {generateKeyButton("2")}
      {generateKeyButton("3")}
      {generateKeyButton("-")}
      {generateKeyButton("←")}
      {generateKeyButton("❌")}


      {generateKeyButton("0")}
      {generateKeyButton(".")}
      {generateKeyButton("+", true)}
      {generateKeyButton("⏎", true)}
    </div>
  )
}

export default KeyPanel;