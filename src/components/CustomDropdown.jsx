import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select an option",
  disabled = false,
  className = "",
  searchable = false,
  clearable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`custom-dropdown ${className}`} ref={dropdownRef}>
      <div 
        className={`dropdown-header ${disabled ? 'disabled' : ''} ${isOpen ? 'open' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="dropdown-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="dropdown-actions">
          {clearable && selectedOption && (
            <button 
              type="button"
              className="clear-btn"
              onClick={handleClear}
              disabled={disabled}
            >
              ×
            </button>
          )}
          <span className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}>
            ▼
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {searchable && (
            <div className="dropdown-search">
              <input
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className="dropdown-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`dropdown-option ${option.value === value ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`}
                  onClick={() => !option.disabled && handleOptionClick(option)}
                >
                  <span className="option-label">{option.label}</span>
                  {option.description && (
                    <span className="option-description">{option.description}</span>
                  )}
                  {option.badge && (
                    <span className={`option-badge ${option.badge.type || ''}`}>
                      {option.badge.text}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="dropdown-no-options">
                {searchable && searchTerm ? 'No matching options' : 'No options available'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;