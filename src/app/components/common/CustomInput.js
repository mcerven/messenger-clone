import React from 'react';
import './CustomInput.css';

function CustomInput({placeholder, value, onChange, disabled, children}) {
    return (
        <label className="customInput">
            {children}
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled} />
        </label>
    );
}
export default CustomInput;
