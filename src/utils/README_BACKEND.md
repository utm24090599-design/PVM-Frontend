# Integración con Backend

Este proyecto está preparado para recibir datos desde un backend. Todas las llamadas API están centralizadas en `src/services/api.ts`.

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_BACKEND_URL=http://localhost:8000/api
VITE_ENABLE_MOCK_FALLBACK=true
```

## Endpoints Esperados del Backend

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `POST /auth/logout` - Cerrar sesión

### Productos
- `GET /products` - Obtener todos los productos
- `GET /products/:id` - Obtener producto por ID
- `POST /products/:id/check-stock` - Verificar stock

### Órdenes (Fase 1)
- `POST /orders` - Crear nueva orden
- `GET /orders` - Obtener todas las órdenes (query param: status)
- `GET /orders/:id` - Obtener orden por ID
- `GET /orders/token/:token` - Obtener orden por token
- `PUT /orders/:id` - Actualizar orden
- `POST /orders/:id/cancel` - Cancelar orden

### Inventario (Fase 2)
- `POST /orders/:orderId/items/:itemId/confirm` - Confirmar disponibilidad de item
- `POST /orders/:orderId/complete-recollection` - Completar recolección y asignar token
- `POST /orders/:orderId/reserve-inventory` - Reservar inventario
- `POST /orders/:orderId/release-inventory` - Liberar inventario

### Pagos (Fase 3)
- `POST /payments/process` - Procesar pago
- `POST /payments/reserve` - Reservar pago
- `POST /payments/cancel` - Cancelar pago
- `GET /payments/order/:orderId` - Obtener registro de pago

### Entregas (Fase 4)
- `POST /deliveries/process` - Procesar entrega
- `GET /deliveries/order/:orderId` - Obtener registro de entrega

### Tokens
- `GET /tokens/:tokenNumber/validate` - Validar token
- `GET /tokens/order/:orderId` - Obtener token por orden

## Estructura de Respuestas Esperadas

### Login Response
```json
{
  "token": "jwt-token-string",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "CLIENT"
  }
}
```

### Order Response
```json
{
  "orderId": "ORD-001",
  "clientName": "Cliente",
  "totalOrder": 250.00,
  "status": "PENDING",
  "token": "001",
  "paymentStatus": "PENDING",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "inventoryReserved": false,
  "paymentRequestCreated": false,
  "deliveryOrderCreated": false,
  "items": [...]
}
```

## Fallback a Mocks

Si el backend no está disponible, el sistema automáticamente usa datos mock locales. Esto permite desarrollo sin backend.

## Manejo de Errores

Todos los errores de API se manejan con:
- Interceptores de axios para errores 401 (redirección a login)
- Try-catch en cada llamada
- Mensajes de error amigables al usuario
- Fallback a datos locales cuando es posible

