import React, { useState } from 'react';

interface RadioProps {
  value: string;
  label: string;
}

const Radio: React.FC<RadioProps> = ({ value, label }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue === selectedValue ? null : newValue);
  };

  return (
    <label>
      <input
        type="radio"
        value={value}
        checked={value === selectedValue}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};

export default Radio;