import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render the string input, shift amount input and output', () => {
    render(<App />);
    const stringInput = screen.getByLabelText('Input string');
    expect(stringInput).toBeInTheDocument();
    const shiftAmountInput = screen.getByLabelText('Shift amount');
    expect(shiftAmountInput).toBeInTheDocument();
    const stringOutput = screen.getByTestId('string-output');
    expect(stringOutput).toBeInTheDocument();
  });

  it('output should match input', () => {
    render(<App />);
    const stringInput = screen.getByLabelText('Input string');
    fireEvent.change(stringInput, {
      target: {
        value: 'ABC',
      },
    });
    const stringOutput = screen.getByTestId('string-output');
    expect(stringOutput).toHaveTextContent('ABC');
  });

  it('output should be shifted by 1', () => {
    render(<App />);
    const stringInput = screen.getByLabelText('Input string');
    fireEvent.change(stringInput, {
      target: {
        value: 'ABC',
      },
    });
    const shiftAmountInput = screen.getByLabelText('Shift amount');
    fireEvent.change(shiftAmountInput, {
      target: {
        value: 1,
      },
    });
    const stringOutput = screen.getByTestId('string-output');
    expect(stringOutput).toHaveTextContent('BCD');
  });

  it('output should be shifted by -1', () => {
    render(<App />);
    const stringInput = screen.getByLabelText('Input string');
    fireEvent.change(stringInput, {
      target: {
        value: 'BCD',
      },
    });
    const shiftAmountInput = screen.getByLabelText('Shift amount');
    fireEvent.change(shiftAmountInput, {
      target: {
        value: -1,
      },
    });
    const stringOutput = screen.getByTestId('string-output');
    expect(stringOutput).toHaveTextContent('ABC');
  });

  it('output should pass through non-letters unaffected', () => {
    render(<App />);
    const stringInput = screen.getByLabelText('Input string');
    fireEvent.change(stringInput, {
      target: {
        value: '123;# []!$&"(',
      },
    });
    const stringOutput = screen.getByTestId('string-output');
    expect(stringOutput).toHaveTextContent('123;# []!$&"(');
  });

  it('output should pass through non-letters unaffected when shifted by 1', () => {
    render(<App />);
    const stringInput = screen.getByLabelText('Input string');
    fireEvent.change(stringInput, {
      target: {
        value: '123A; #[]B!$&"(C',
      },
    });
    const shiftAmountInput = screen.getByLabelText('Shift amount');
    fireEvent.change(shiftAmountInput, {
      target: {
        value: 1,
      },
    });
    const stringOutput = screen.getByTestId('string-output');
    expect(stringOutput).toHaveTextContent('123B; #[]C!$&"(D');
  });

  it('output should be shifted by 1 and loop around to the start of the range', () => {
    render(<App />);
    const stringInput = screen.getByLabelText('Input string');
    fireEvent.change(stringInput, {
      target: {
        value: 'YZA',
      },
    });
    const shiftAmountInput = screen.getByLabelText('Shift amount');
    fireEvent.change(shiftAmountInput, {
      target: {
        value: 1,
      },
    });
    const stringOutput = screen.getByTestId('string-output');
    expect(stringOutput).toHaveTextContent('ZAB');
  });

  it('output should be shifted by -1 and loop around to the end of the range', () => {
    render(<App />);
    const stringInput = screen.getByLabelText('Input string');
    fireEvent.change(stringInput, {
      target: {
        value: 'ZAB',
      },
    });
    const shiftAmountInput = screen.getByLabelText('Shift amount');
    fireEvent.change(shiftAmountInput, {
      target: {
        value: -1,
      },
    });
    const stringOutput = screen.getByTestId('string-output');
    expect(stringOutput).toHaveTextContent('YZA');
  });
});
