import React from 'react';

const FormTextarea = ({ label, name, value, onChange, rows, error }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default FormTextarea;