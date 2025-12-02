# Guía de Integración con Backend - PVM Frontend

## Resumen de Implementación

El proyecto está completamente preparado para recibir datos desde el backend. Todas las funciones mock tienen fallback automático a datos locales si el backend no está disponible.

## Archivos Creados/Modificados

### Servicios API
- ✅ `src/services/api.ts` - Servicio centralizado de API con todos los endpoints
- ✅ `src/services/orderService.ts` - Servicio de alto nivel para operaciones de órdenes
- ✅ `src/config/env.ts` - Configuración de variables de entorno

### Páginas Actualizadas

#### Fase 1: Client Order (Receptionist)
- ✅ `src/pages/ReceptionistPage.tsx`
  - Carga órdenes pendientes desde backend
  - Permite cancelar órdenes
  - Muestra lista de órdenes en tiempo real

#### Fase 2: Order Recollection (Inventory Manager)
- ✅ `src/pages/InventoryManagerPage.tsx`
  - Carga órdenes desde backend
  - Confirma disponibilidad de items con backend
  - Completa recolección y asigna token
  - Reserva inventario

#### Fase 3: Payment (Sale Area)
- ✅ `src/pages/SaleAreaPage.tsx`
  - Valida tokens con backend
  - Procesa pagos
  - Reserva pagos por tiempo limitado
  - Cancela pagos y libera inventario
  - Muestra PickupLabel después del pago

#### Fase 4: Delivery (Delivery Area)
- ✅ `src/pages/DeliveryAreaPage.tsx`
  - Valida tokens con backend
  - Procesa entregas
  - Registra modificaciones de materiales
  - Deducir inventario
  - Maneja sobrantes

#### Clientes
- ✅ `src/pages/CatalogPage.tsx` - Carga productos desde backend
- ✅ `src/pages/CartPage.tsx` - Verifica stock con backend antes de pagar
- ✅ `src/pages/PrincipalInterface.tsx` - Crea órdenes y procesa pagos con backend

#### Autenticación
- ✅ `src/pages/LoginScreen.tsx` - Autentica con backend, fallback a usuarios locales
- ✅ `src/pages/form.tsx` - Registra usuarios en backend, fallback a local

### Componentes Actualizados
- ✅ `src/components/OrderList.tsx` - Acepta órdenes desde props (backend)
- ✅ `src/components/OrderDetails.tsx` - Confirma items con backend
- ✅ `src/components/ui/ConfirmOrderButton.tsx` - Maneja callbacks de pago
- ✅ `src/catalogue/ProductGrid.tsx` - Acepta productos desde props (backend)

## Flujo Completo de las 4 Fases

### FASE 1: Client Order (Receptionist)
1. Cliente agrega productos al carrito
2. Cliente procede al pago → Se crea orden con `ordersApi.create()`
3. Orden queda en estado `PENDING`
4. Receptionist ve la orden en su dashboard

**Endpoints usados:**
- `POST /orders` - Crear orden
- `GET /orders?status=PENDING` - Ver órdenes pendientes
- `POST /orders/:id/cancel` - Cancelar orden

### FASE 2: Order Recollection (Inventory Manager)
1. Inventory Manager ve órdenes pendientes
2. Confirma disponibilidad de cada item → `inventoryApi.confirmItem()`
3. Marca cantidad recogida
4. Al completar todos los items → `inventoryApi.completeRecollection()`
5. Sistema asigna token automáticamente
6. Orden pasa a estado `READY_FOR_PAYMENT`
7. Inventario queda reservado

**Endpoints usados:**
- `GET /orders?status=PENDING` - Ver órdenes
- `POST /orders/:orderId/items/:itemId/confirm` - Confirmar item
- `POST /orders/:orderId/complete-recollection` - Completar recolección
- `POST /orders/:orderId/reserve-inventory` - Reservar inventario

### FASE 3: Payment (Sale Area)
1. Cliente/Empleado valida token → `tokensApi.validate()`
2. Se carga la orden → `ordersApi.getByToken()`
3. Se procesa el pago → `paymentsApi.process()`
4. Se muestra PickupLabel con QR code
5. Orden pasa a estado `PAID`

**Opciones adicionales:**
- Reservar pago → `paymentsApi.reserve()` (30 min por defecto)
- Cancelar pago → `paymentsApi.cancel()` (libera inventario)

**Endpoints usados:**
- `GET /tokens/:tokenNumber/validate` - Validar token
- `GET /orders/token/:token` - Obtener orden por token
- `POST /payments/process` - Procesar pago
- `POST /payments/reserve` - Reservar pago
- `POST /payments/cancel` - Cancelar pago

### FASE 4: Delivery (Delivery Area)
1. Cliente presenta token en área de entrega
2. Se valida token → `tokensApi.validate()`
3. Se carga orden → `ordersApi.getByToken()`
4. Se procesan materiales (cortar/modificar si es necesario)
5. Se procesa entrega → `deliveryApi.process()`
6. Se deduce inventario reservado
7. Se registran sobrantes para devolver a inventario
8. Orden pasa a estado `DELIVERED`

**Endpoints usados:**
- `GET /tokens/:tokenNumber/validate` - Validar token
- `GET /orders/token/:token` - Obtener orden
- `POST /deliveries/process` - Procesar entrega
- `GET /deliveries/order/:orderId` - Ver registro de entrega

## Configuración del Backend

### Variables de Entorno

Crea `.env` en la raíz:

```env
VITE_BACKEND_URL=http://localhost:8000/api
VITE_ENABLE_MOCK_FALLBACK=true
```

### Estructura de Respuestas del Backend

Ver `src/utils/README_BACKEND.md` para detalles completos de cada endpoint.

## Características Implementadas

✅ **Sistema de autenticación** con fallback a usuarios locales
✅ **Carga de productos** desde backend con fallback a mock
✅ **Creación de órdenes** desde carrito
✅ **Verificación de stock** antes de pagar
✅ **Confirmación de inventario** por item
✅ **Asignación automática de tokens**
✅ **Procesamiento de pagos** con registro
✅ **Reserva de pagos** por tiempo limitado
✅ **Cancelación de órdenes** con liberación de inventario
✅ **Procesamiento de entregas** con deducción de inventario
✅ **Manejo de materiales modificables** (rollos, cortes, etc.)
✅ **Registro de sobrantes** para devolver a inventario
✅ **PickupLabel** con QR code después del pago
✅ **Manejo de errores** robusto con mensajes amigables
✅ **Estados de carga** en todas las operaciones
✅ **Fallback automático** a datos mock si el backend falla

## Próximos Pasos

1. Configurar la URL del backend en `.env`
2. Asegurar que el backend implemente todos los endpoints documentados
3. Probar cada fase del flujo
4. Ajustar tipos de datos si el backend devuelve estructuras diferentes

## Notas Importantes

- Todas las llamadas API tienen manejo de errores
- Si el backend no está disponible, el sistema usa datos mock automáticamente
- Los tokens se validan con el backend pero también hay validación local
- El inventario se reserva en el backend, no solo localmente
- Los estados de las órdenes se sincronizan con el backend

