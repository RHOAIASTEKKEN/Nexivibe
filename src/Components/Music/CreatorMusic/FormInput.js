import React from 'react';

const FormInput = ({ label, type, name, value, onChange, placeholder, error }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default FormInput;