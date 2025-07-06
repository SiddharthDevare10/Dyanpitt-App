import React, { useState, useRef, useEffect } from 'react';

export default function CustomDropdown({ 
  name, 
  value, 
  onChange, 
  options, 
  placeholder, 
  className, 
  error 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange({
      target: {
        name: name,
        value: optionValue
      }
    });
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="custom-dropdown-wrapper" ref={dropdownRef}>
      <div 
        className={`custom-dropdown ${className} ${error ? 'input-error' : ''} ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-dropdown-selected">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="custom-dropdown-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </span>
      </div>
      
      {isOpen && (
        <div className="custom-dropdown-options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-dropdown-option ${value === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}