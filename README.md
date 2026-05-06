# MovilBank

MovilBank es un prototipo de banca móvil inspirado en la experiencia simple de neobancos como N26. La idea central es que el número de móvil de la persona funciona como identificador principal de cuenta para enviar, solicitar y recibir dinero.

## Funcionalidades incluidas

- Pantalla principal con saludo personalizado y saldo disponible.
- Cuenta bancaria basada en número de móvil, con alias corto para identificarla.
- Acciones rápidas para enviar, solicitar, gestionar tarjeta virtual y crear espacios de ahorro.
- Búsqueda por nombre o número móvil para transferencias instantáneas.
- Contactos frecuentes para pagos P2P.
- Historial de actividad con ingresos, gastos y transferencias.
- Mensaje de seguridad para promover el uso del móvil sin exponer el IBAN.

## Ejecutar el proyecto

```bash
npm install
npm start
```

### Previsualización sin instalar dependencias

Si solo quieres revisar la interfaz en el navegador, puedes abrir la vista previa estática incluida:

```bash
npm run preview
```

Luego entra a `http://127.0.0.1:4173`. Esta vista reproduce la pantalla principal de MovilBank y no requiere descargar paquetes de npm.

Después de iniciar Expo, escanea el QR con Expo Go o ejecuta la app en un emulador iOS/Android.

## Scripts

- `npm start`: inicia Expo.
- `npm run android`: compila y abre en Android.
- `npm run ios`: compila y abre en iOS.
- `npm run web`: abre la app en web.
- `npm run typecheck`: valida TypeScript sin emitir archivos.
