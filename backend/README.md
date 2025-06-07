# 🚰 AguaPago Backend API

Backend API para la plataforma AguaPago - Sistema de consulta y gestión de facturas de agua para El Pital y Agrado.

## 🛠️ Tecnologías

- **Node.js** con **JavaScript ES6**
- **Express.js** - Framework web minimalista
- **CORS** - Configuración de CORS para integración frontend
- **Datos en memoria** - Almacenamiento temporal para desarrollo

## 📋 Requisitos

- Node.js 18+
- npm o yarn

## 🚀 Instalación y Configuración

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

   El servidor estará disponible en `http://localhost:8000`

3. **Iniciar en modo producción**
   ```bash
   npm start
   ```

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con nodemon (auto-reload)
npm run start        # Servidor de producción
npm run build        # Compilar TypeScript (para versiones futuras)

# Base de datos (configuración para Prisma - no activa)
npm run db:generate  # Generar cliente de Prisma
npm run db:push      # Sincronizar esquema con BD
npm run db:studio    # Abrir Prisma Studio
npm run db:seed      # Poblar BD con datos de prueba
```

## 🗂️ Arquitectura del Proyecto

```
backend/
├── src/
│   ├── index.js         # Servidor principal con Express
│   ├── index.ts         # Versión TypeScript (no activa)
│   ├── controllers/     # Controladores (estructura preparada)
│   ├── services/        # Servicios (estructura preparada)
│   ├── routes/          # Rutas (estructura preparada)
│   ├── types/           # Tipos TypeScript
│   └── scripts/         # Scripts utilitarios
├── prisma/
│   ├── schema.prisma    # Esquema de base de datos
│   └── dev.db          # Base de datos SQLite
├── package.json
├── nodemon.json         # Configuración de nodemon
└── README.md
```

### 🏗️ Construcción del Proyecto

El backend está construido con:

- **Express.js puro**: Sin frameworks adicionales, configuración mínima
- **Arquitectura simple**: Un solo archivo (`src/index.js`) con toda la lógica
- **Datos estáticos**: Facturas y clientes definidos como objetos JavaScript en memoria
- **API RESTful**: Endpoints claros y estructurados
- **CORS habilitado**: Para integración con frontend Next.js
- **Manejo de errores**: Respuestas consistentes con formato JSON

## 🔌 Servicios que Expone

### 🏠 General
- `GET /health` - Health check del servidor
- `GET /api/info` - Información completa de datos disponibles

### 🔍 Búsqueda de Facturas
- `GET /api/bills?billNumber=F-2025-02-12345` - Buscar factura específica por número
- `GET /api/billsByClient?clientId=1234567` - Obtener todas las facturas de un cliente

### 👥 Información de Clientes
- `GET /api/customers?clientId=1234567` - Obtener información de un cliente específico

## 🗄️ Estructura de Datos

### Cliente (Customer)
```javascript
{
  id: "customer-456",
  clientId: "1234567",           // ID único del cliente (7 dígitos)
  name: "Juan Pérez",            // Nombre completo
  address: "Calle 123 #45-67, El Pital", // Dirección completa
  phone: "3001234567",           // Teléfono celular
  email: "juan.perez@email.com"  // Email opcional
}
```

### Factura (Bill)
```javascript
{
  id: "bill-123",
  billNumber: "F-2025-02-12345", // Número único de factura
  clientId: "1234567",           // ID del cliente asociado
  period: "Febrero 2025",        // Período de facturación
  amount: 43200,                 // Monto en pesos colombianos
  status: "PAID",                // PAID, PENDING, OVERDUE
  dueDate: "2025-03-15",         // Fecha de vencimiento
  paymentDate: "2025-03-10",     // Fecha de pago (si está pagada)
  receiptNumber: "COMP-2025-02", // Número de comprobante
  consumption: "14 m³",          // Consumo de agua
  issueDate: "2025-02-15"        // Fecha de emisión
}
```

## 📊 Datos de Prueba Incluidos

### 👥 Clientes (3 clientes):
1. **Juan Pérez** (1234567) - El Pital
   - 5 facturas: 3 pagadas, 1 pendiente, 1 vencida
2. **María Gómez** (7654321) - El Pital
   - 4 facturas: 3 pagadas, 1 pendiente
3. **Elena Castro** (9876543) - Agrado
   - 2 facturas: 1 pagada, 1 vencida

### 📄 Total: 11 facturas con estados variados para testing completo

## 🚀 Cómo Inicializar

### Desarrollo
```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd agua-pago/backend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Verificar funcionamiento
curl http://localhost:8000/health
```

### Producción
```bash
# 1. Instalar dependencias
npm install --production

# 2. Iniciar servidor
npm start

# El servidor estará disponible en http://localhost:8000
```

## 📋 API Endpoints Detallados

### Health Check
```bash
GET http://localhost:8000/health
```
**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-27T10:30:00.000Z",
  "service": "AguaPago Backend API"
}
```

### Información Completa del Sistema
```bash
GET http://localhost:8000/api/info
```
**Respuesta:**
```json
{
  "success": true,
  "data": {
    "totalBills": 11,
    "totalClients": 3,
    "bills": [...],
    "clients": [...],
    "examples": {
      "searchByClient": "1234567",
      "searchByBill": "F-2025-02-12345"
    }
  }
}
```

### Buscar Factura por Número
```bash
GET http://localhost:8000/api/bills?billNumber=F-2025-02-12345
```
**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": "bill-123",
    "billNumber": "F-2025-02-12345",
    "clientId": "1234567",
    "period": "Febrero 2025",
    "amount": 43200,
    "status": "PAID",
    "dueDate": "2025-03-15",
    "paymentDate": "2025-03-10",
    "receiptNumber": "COMP-2025-02",
    "consumption": "14 m³",
    "issueDate": "2025-02-15"
  }
}
```

### Obtener Cliente
```bash
GET http://localhost:8000/api/customers?clientId=1234567
```
**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": "customer-456",
    "clientId": "1234567",
    "name": "Juan Pérez",
    "address": "Calle 123 #45-67, El Pital",
    "phone": "3001234567",
    "email": "juan.perez@email.com"
  }
}
```

### Obtener Facturas de un Cliente
```bash
GET http://localhost:8000/api/billsByClient?clientId=1234567
```
**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "bill-123",
      "billNumber": "F-2025-02-12345",
      "period": "Febrero 2025",
      "amount": 43200,
      "status": "PAID",
      "dueDate": "2025-03-15",
      "consumption": "14 m³"
    },
    // ... más facturas
  ]
}
```

## 🔧 Configuración

### Puerto del Servidor
El servidor corre en el puerto **8000** por defecto. Para cambiarlo:

```javascript
// En src/index.js
const PORT = process.env.PORT || 8000;
```

### CORS
CORS está habilitado para todos los orígenes en desarrollo:

```javascript
app.use(cors());
```

Para producción, configurar orígenes específicos:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://tu-dominio.com']
}));
```

## 🧪 Testing de la API

### Usando curl:
```bash
# Health check
curl http://localhost:8000/health

# Información general
curl http://localhost:8000/api/info

# Buscar factura
curl "http://localhost:8000/api/bills?billNumber=F-2025-02-12345"

# Buscar cliente
curl "http://localhost:8000/api/customers?clientId=1234567"

# Facturas de un cliente
curl "http://localhost:8000/api/billsByClient?clientId=1234567"
```

### Usando navegador:
- http://localhost:8000/health
- http://localhost:8000/api/info
- http://localhost:8000/api/bills?billNumber=F-2025-02-12345

## 🔄 Integración con Frontend

Este backend está diseñado específicamente para integrarse con el frontend Next.js de AguaPago que corre en `http://localhost:3000`.

### Headers de respuesta:
- `Content-Type: application/json`
- `Access-Control-Allow-Origin: *` (desarrollo)

### Formato de respuesta estándar:
```json
{
  "success": true|false,
  "data": {...} | null,
  "error": "mensaje de error" | null
}
```

## 📈 Estadísticas del Sistema

- **Total de facturas**: 11
- **Total de clientes**: 3
- **Estados de facturas**: PAID, PENDING, OVERDUE
- **Rango de montos**: $37,800 - $52,000 COP
- **Consumo promedio**: 11-18 m³

## 🚀 Próximos Pasos

1. **Base de datos real**: Migrar de datos en memoria a PostgreSQL/MySQL
2. **Autenticación**: Implementar JWT para seguridad
3. **Validación**: Agregar validación de datos con express-validator
4. **Logging**: Implementar sistema de logs
5. **Tests**: Agregar tests unitarios y de integración
6. **Documentación OpenAPI**: Generar documentación automática

## 📝 Notas de Desarrollo

- Los datos están hardcodeados en `src/index.js` para simplicidad
- Los montos están en pesos colombianos (no centavos)
- El servidor es completamente stateless
- No hay persistencia de datos entre reinicios
- Diseñado para desarrollo y testing

---

**🚰 AguaPago Backend API v1.0.0**  
*Sistema de gestión de facturas de agua para El Pital y Agrado* 