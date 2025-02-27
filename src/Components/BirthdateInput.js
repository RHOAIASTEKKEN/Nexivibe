import React, { useState } from 'react';
import '../Styles/BirthdateInput.css'

const BirthdateInput = ({ onBirthdateChange }) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const handleDayChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setDay(value);
        validateDate(value, month, year);
    };

    const handleMonthChange = (e) => {
        const value = e.target.value;
        setMonth(value);
        validateDate(day, value, year);
    };

    const handleYearChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setYear(value);
        validateDate(day, month, value);
    };

    const validateDate = (inputDay, inputMonth, inputYear) => {
        // Validar edad mínima de 13 años
        const currentDate = new Date();
        const inputDate = new Date(inputYear, months.indexOf(inputMonth), inputDay);
        const minAgeDate = new Date(
            currentDate.getFullYear() - 13,
            currentDate.getMonth(),
            currentDate.getDate()
        );

        // Validaciones
        if (inputDay && inputMonth && inputYear) {
            const daysInMonth = new Date(inputYear, months.indexOf(inputMonth) + 1, 0).getDate();

            if (inputDay < 1 || inputDay > daysInMonth) {
                setError('Día inválido para el mes seleccionado');
                onBirthdateChange('');
                return;
            }

            if (inputDate > minAgeDate) {
                setError('Debes tener al menos 13 años');
                onBirthdateChange('');
                return;
            }

            // Formato ISO para backend
            const formattedDate = `${inputYear}-${(months.indexOf(inputMonth) + 1).toString().padStart(2, '0')}-${inputDay.padStart(2, '0')}`;

            setError('');
            onBirthdateChange(formattedDate);
        }
    };

    return (
        <div className="birthdate-input">
            <div className="input-row">
                <div className="input-group">
                    <label>Día</label>
                    <input
                        type="text"
                        placeholder="DD"
                        maxLength="2"
                        value={day}
                        onChange={handleDayChange}
                        className="day-input"
                    />
                </div>

                <div className="input-group">
                    <label>Mes</label>
                    <select
                        value={month}
                        onChange={handleMonthChange}
                        className="month-input"
                    >
                        <option value="">Selecciona</option>
                        {months.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label>Año</label>
                    <input
                        type="text"
                        placeholder="AAAA"
                        maxLength="4"
                        value={year}
                        onChange={handleYearChange}
                        className="year-input"
                    />
                </div>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default BirthdateInput;