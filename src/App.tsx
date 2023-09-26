import React, { ChangeEvent, useState } from 'react';
import './App.css';

function App() {
  const [inputString, setInputString] = useState('');
  const [shiftAmount, setShiftAmount] = useState(0);

  const handleInputStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Only allow uppercase letters
    const uppercaseValue = value.toUpperCase();
    setInputString(uppercaseValue);
  };

  const inputStringAsArray = Array.from(inputString);
  const outputCharCodeArray = inputStringAsArray.map((character) => {
    const charCode = character.charCodeAt(0);
    if (!/^[A-Z]$/.test(character)) {
      return charCode;
    }
    return shift(charCode);
  });

  function shift(charCode: number) {
    const low = 65; // Character code for letter A
    const high = 90 + 1; // Character code for letter Z + 1 to include Z
    const range = high - low;
    // Keep charCode within the range, loop around at the top and bottom
    return ((charCode - low + (shiftAmount % range) + range) % range) + low;
  }

  const outputString = String.fromCharCode(...outputCharCodeArray);

  return (
    <section>
      <h1>Caeser cipher</h1>
      <div>
        <label htmlFor="input-string">Input string</label>
        <input value={inputString} onChange={handleInputStringChange} id="input-string" />
      </div>
      <div>
        <label htmlFor="shift-amount">Shift amount</label>
        <input
          type="number"
          min={-25}
          max={25}
          id="shift-amount"
          value={shiftAmount}
          onChange={(event) => setShiftAmount(event.target.valueAsNumber)}
        />
        <p>(Values between -25 and 25)</p>
      </div>
      <div>
        <p data-testid="string-output">{outputString}</p>
      </div>
    </section>
  );
}

export default App;
