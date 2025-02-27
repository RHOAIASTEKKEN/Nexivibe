const FormInput = ({ label, type, value, onChange, placeholder, error, options }) => {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            {type === 'select' ? (
                <select value={value} onChange={onChange} className="form-select">
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="form-input"
                    placeholder={placeholder}
                />
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default FormInput;