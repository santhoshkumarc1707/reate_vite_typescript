import React, { useState } from 'react';

type DropdownProps = {
  options: string[];
  onSelect: (option: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-gray-200 px-4 py-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        Select
      </button>
      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded shadow-md mt-2">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
