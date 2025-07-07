import React from 'react';

const PasswordStrengthIndicator = ({ password, showRequirements = true }) => {
  const requirements = [
    { key: 'length', label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { key: 'uppercase', label: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { key: 'lowercase', label: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { key: 'number', label: 'One number', test: (pwd) => /\d/.test(pwd) },
    { key: 'special', label: 'One special character', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: '', color: '' };
    
    const passedRequirements = requirements.filter(req => req.test(password)).length;
    
    if (passedRequirements <= 2) {
      return { score: 1, label: 'Weak', color: '#ff4757' };
    } else if (passedRequirements <= 3) {
      return { score: 2, label: 'Fair', color: '#ffa502' };
    } else if (passedRequirements <= 4) {
      return { score: 3, label: 'Good', color: '#2ed573' };
    } else {
      return { score: 4, label: 'Strong', color: '#1e90ff' };
    }
  };

  const strength = getPasswordStrength();
  const strengthPercentage = (strength.score / 4) * 100;

  return (
    <div className="password-strength-indicator">
      {password && (
        <div className="strength-meter">
          <div className="strength-bar">
            <div 
              className="strength-fill"
              style={{ 
                width: `${strengthPercentage}%`,
                backgroundColor: strength.color,
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          <span 
            className="strength-label"
            style={{ color: strength.color }}
          >
            {strength.label}
          </span>
        </div>
      )}

      {showRequirements && (
        <div className="password-requirements">
          <p className="requirements-title">Password must contain:</p>
          <ul className="requirements-list">
            {requirements.map((requirement) => {
              const isPassed = password && requirement.test(password);
              return (
                <li 
                  key={requirement.key}
                  className={`requirement ${isPassed ? 'passed' : 'pending'}`}
                >
                  <span className="requirement-icon">
                    {isPassed ? '✓' : '○'}
                  </span>
                  <span className="requirement-text">
                    {requirement.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;