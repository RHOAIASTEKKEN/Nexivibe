# Nexivibe - Configuración del Proyecto

## Información General

- **Nombre:** Nexivibe
- **Versión:** 5.1.0
- **Privado:** Sí
- **Descripción:** Aplicación para comunidad con funcionalidades de mensajes, posts, videos, música y streaming.
- **Estado:** En fase de pruebas, con un 40% de desarrollo completado.

## Dependencias

### Principales
- `react` ^18.3.1
- `react-dom` ^18.3.1
- `react-router-dom` ^7.0.2
- `styled-components` ^6.1.14

### Integraciones y Utilidades
- `@react-google-maps/api` ^2.20.5
- `@react-oauth/google` ^0.12.1
- `axios` ^1.7.9
- `jwt-decode` ^4.0.0
- `socket.io-client` ^4.8.1

### Testing
- `@testing-library/jest-dom` ^5.17.0
- `@testing-library/react` ^13.4.0
- `@testing-library/user-event` ^13.5.0

### Animaciones e Iconos
- `framer-motion` ^12.0.6
- `lucide-react` ^0.469.0

### QR Code
- `qrcode` ^1.5.4
- `qrcode-react` ^0.1.16
- `qrcode.react` ^4.2.0

### Rendimiento
- `web-vitals` ^2.1.4

## Scripts

- `start`: Inicia la aplicación con `react-scripts start`
- `build`: Genera la versión de producción con `react-scripts build`
- `test`: Ejecuta pruebas con `react-scripts test`
- `eject`: Expone la configuración de React con `react-scripts eject`

## Configuración de ESLint

Extiende las configuraciones de:
- `react-app`
- `react-app/jest`

## Configuración de Browserslist

### Producción
- `>0.2%`
- `not dead`
- `not op_mini all`

### Desarrollo
- `last 1 chrome version`
- `last 1 firefox version`
- `last 1 safari version`

---

Este documento detalla la configuración del proyecto **Nexivibe**, incluyendo las dependencias principales, scripts de ejecución, configuración de ESLint y compatibilidad con navegadores.
