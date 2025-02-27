import React, { useState } from 'react';
import Card from './Card';

const PaymentModal = ({ showRechargeOptions, setShowRechargeOptions }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const packages = ["100", "150", "250", "500", "1,500", "5,000", "20,000", "100,000"];

    if (!showRechargeOptions) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Métodos de pago</h2>
                    <button
                        className="close-button"
                        onClick={() => setShowRechargeOptions(false)}
                    >
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    <Card logo="stripe" />

                    <div className="packages-grid">
                        {packages.map((amount) => (
                            <button
                                key={amount}
                                className={`package-button ${selectedPackage === amount ? 'selected' : ''}`}
                                onClick={() => setSelectedPackage(amount)}
                            >
                                ${amount}
                            </button>
                        ))}
                    </div>

                    <button
                        className="continue-button"
                        disabled={!selectedPackage}
                    >
                        Continuar
                    </button>
                </div>
            </div>

            <style>
                {`

                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                    }

                    .modal-content {
                        background: var(--color-gray-900);
                        border-radius: 8px;
                        width: 90%;
                        max-width: 500px;
                        padding: 20px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        color: white;
                    }

                    .modal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }

                    .modal-header h2 {
                        margin: 0;
                        font-size: 1.5rem;
                        color: var(--color-gray-200);
                    }

                    .close-button {
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: var(--color-gray-400);
                    }

                    .close-button:hover {
                        color: var(--color-gray-200);
                    }

                    .modal-body {
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                    }

                    .packages-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                        gap: 10px;
                        margin: 20px 0;
                    }

                    .package-button {
                        padding: 10px;
                        border: 2px solid var(--color-gray-600);
                        border-radius: 6px;
                        background: var(--color-gray-800);
                        cursor: pointer;
                        transition: all 0.2s ease;
                        color: white;
                    }

                    .package-button:hover {
                        border-color: var(--color-blue-500);
                        background: var(--color-gray-700);
                    }

                    .package-button.selected {
                        border-color: var(--color-blue-500);
                        background: var(--color-blue-400);
                        color: var(--color-blue-600);
                    }

                    .continue-button {
                        padding: 12px 24px;
                        background: var(--color-blue-500);
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: background 0.2s ease;
                    }

                    .continue-button:hover {
                        background: var(--color-blue-600);
                    }

                    .continue-button:disabled {
                        background: var(--color-gray-600);
                        cursor: not-allowed;
                    }
                `}
            </style>
        </div>
    );
};

export default PaymentModal;
