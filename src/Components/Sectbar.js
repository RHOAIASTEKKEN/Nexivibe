import React from 'react';

// Componente Sectbar
function Sectbar({ leftSidebarVisible, rightSidebarVisible, children, TituloSection, stilos }) {
    // Clases para expandir las barras laterales según su visibilidad
    const expandedLeftClass = leftSidebarVisible ? 'expanded-left' : '';
    const expandedRightClass = rightSidebarVisible ? 'expanded-right' : '';
    const customStylesClass = stilos || ''; // Aplica estilos personalizados solo si están definidos

    return (
        <div className={`home-central-content ${expandedLeftClass} ${expandedRightClass} ${customStylesClass}`}>
            {/* Renderiza el título solo si TituloSection está definido */}
            {TituloSection && <h2>{TituloSection}</h2>}
            <div className="posts-container">
                {/* Renderiza los hijos pasados al componente */}
                {children}
            </div>
        </div>
    );
}

export default Sectbar;
