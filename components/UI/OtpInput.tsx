import React, { useRef, useState } from 'react';

interface OtpInputProps {
  onComplete: (otp: string) => void;
  disabled?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({ onComplete, disabled }) => {
  const [values, setValues] = useState<string[]>(['', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newValues = [...values];
    newValues[index] = val.slice(-1); // Only take last char
    setValues(newValues);

    // Trigger complete
    if (newValues.every(v => v !== '')) {
      onComplete(newValues.join(''));
    }

    // Auto focus next
    if (val && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4).split('');
    if (pastedData.some(char => isNaN(Number(char)))) return;

    const newValues = [...values];
    pastedData.forEach((char, i) => {
      newValues[i] = char;
    });
    setValues(newValues);
    if (newValues.every(v => v !== '')) {
      onComplete(newValues.join(''));
    }
  };

  return (
    <div className="flex gap-3 my-4 justify-center">
      {values.map((val, index) => (
        <input
          key={index}
          ref={el => inputsRef.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          disabled={disabled}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl font-bold border-2 border-[#0a585b] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#0a585b]/20 transition-all disabled:opacity-50 disabled:bg-gray-100 text-[#0a585b]"
        />
      ))}
    </div>
  );
};