# MóvilBank

MóvilBank es un prototipo de banca móvil inspirado en experiencias digitales como N26. La diferencia principal es que el número móvil verificado de la persona funciona como identificador de cuenta para enviar y recibir dinero de forma inmediata.

## Funcionalidades incluidas

- Alta y edición de una cuenta usando un número móvil internacional.
- Alias bancario legible generado a partir del teléfono, por ejemplo `MB-346-123-5678`.
- Panel de saldo disponible, plan activo y cuenta móvil enmascarada.
- Envío de dinero a otro móvil con validación de importe y destinatario.
- Historial de movimientos con ingresos, pagos, domiciliaciones y transferencias.
- Espacios de ahorro con objetivos y barras de progreso.
- Analítica de gastos por categoría.
- Controles visuales de seguridad: móvil verificado, biometría y tarjeta congelable.

## Estructura

```text
App.js                    Interfaz principal de React Native / Expo
src/domain/banking.js     Reglas de negocio de cuenta móvil, saldo y transferencias
test/banking.test.mjs     Pruebas unitarias con node:test
```

## Ejecutar en desarrollo

```bash
npm install
npm start
```

Después, abre el proyecto con Expo Go, un emulador Android, un simulador iOS o la vista web de Expo.

## Ejecutar pruebas

```bash
npm test
```
