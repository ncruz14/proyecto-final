const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

console.log('Starting AguaPago Backend...');

// Datos de ejemplo más completos
const facturas = {
  // Facturas del cliente 1234567 (Juan Pérez)
  "F-2025-02-12345": {
    id: "bill-123",
    billNumber: "F-2025-02-12345",
    clientId: "1234567",
    period: "Febrero 2025",
    amount: 43200,
    status: "PAID",
    dueDate: "2025-03-15",
    paymentDate: "2025-03-10",
    receiptNumber: "COMP-2025-02",
    consumption: "14 m³",
    issueDate: "2025-02-15"
  },
  "F-2025-01-12345": {
    id: "bill-126",
    billNumber: "F-2025-01-12345",
    clientId: "1234567",
    period: "Enero 2025",
    amount: 41800,
    status: "PAID",
    dueDate: "2025-02-15",
    paymentDate: "2025-02-12",
    receiptNumber: "COMP-2025-01",
    consumption: "13 m³",
    issueDate: "2025-01-15"
  },
  "F-2024-12-12345": {
    id: "bill-127",
    billNumber: "F-2024-12-12345",
    clientId: "1234567",
    period: "Diciembre 2024",
    amount: 46500,
    status: "PAID",
    dueDate: "2025-01-15",
    paymentDate: "2025-01-08",
    receiptNumber: "COMP-2024-12",
    consumption: "16 m³",
    issueDate: "2024-12-15"
  },
  "F-2025-04-12345": {
    id: "bill-124",
    billNumber: "F-2025-04-12345",
    clientId: "1234567",
    period: "Abril 2025",
    amount: 45000,
    status: "PENDING",
    dueDate: "2025-05-15",
    consumption: "15 m³",
    issueDate: "2025-04-15"
  },
  "F-2025-03-12345": {
    id: "bill-125",
    billNumber: "F-2025-03-12345",
    clientId: "1234567",
    period: "Marzo 2025",
    amount: 42500,
    status: "OVERDUE",
    dueDate: "2025-04-15",
    consumption: "13 m³",
    issueDate: "2025-03-15"
  },
  
  // Facturas del cliente 7654321 (María Gómez)
  "F-2025-02-67890": {
    id: "bill-201",
    billNumber: "F-2025-02-67890",
    clientId: "7654321",
    period: "Febrero 2025",
    amount: 38900,
    status: "PAID",
    dueDate: "2025-03-15",
    paymentDate: "2025-03-08",
    receiptNumber: "COMP-2025-02-MG",
    consumption: "12 m³",
    issueDate: "2025-02-15"
  },
  "F-2025-01-67890": {
    id: "bill-202",
    billNumber: "F-2025-01-67890",
    clientId: "7654321",
    period: "Enero 2025",
    amount: 40200,
    status: "PAID",
    dueDate: "2025-02-15",
    paymentDate: "2025-02-10",
    receiptNumber: "COMP-2025-01-MG",
    consumption: "13 m³",
    issueDate: "2025-01-15"
  },
  "F-2024-11-67890": {
    id: "bill-203",
    billNumber: "F-2024-11-67890",
    clientId: "7654321",
    period: "Noviembre 2024",
    amount: 37800,
    status: "PAID",
    dueDate: "2024-12-15",
    paymentDate: "2024-12-12",
    receiptNumber: "COMP-2024-11-MG",
    consumption: "11 m³",
    issueDate: "2024-11-15"
  },
  "F-2025-04-67890": {
    id: "bill-204",
    billNumber: "F-2025-04-67890",
    clientId: "7654321",
    period: "Abril 2025",
    amount: 39500,
    status: "PENDING",
    dueDate: "2025-05-15",
    consumption: "12 m³",
    issueDate: "2025-04-15"
  },
  
  // Cliente adicional para más variedad
  "F-2025-03-98765": {
    id: "bill-301",
    billNumber: "F-2025-03-98765",
    clientId: "9876543",
    period: "Marzo 2025",
    amount: 52000,
    status: "OVERDUE",
    dueDate: "2025-04-15",
    consumption: "18 m³",
    issueDate: "2025-03-15"
  },
  "F-2025-02-98765": {
    id: "bill-302",
    billNumber: "F-2025-02-98765",
    clientId: "9876543",
    period: "Febrero 2025",
    amount: 48500,
    status: "PAID",
    dueDate: "2025-03-15",
    paymentDate: "2025-03-14",
    receiptNumber: "COMP-2025-02-EC",
    consumption: "17 m³",
    issueDate: "2025-02-15"
  }
};

const clientes = {
  "1234567": {
    id: "customer-456",
    clientId: "1234567",
    name: "Juan Pérez",
    address: "Calle 123 #45-67, El Pital",
    phone: "3001234567",
    email: "juan.perez@email.com"
  },
  "7654321": {
    id: "customer-457",
    clientId: "7654321",
    name: "María Gómez",
    address: "Carrera 89 #12-34, El Pital",
    phone: "3009876543",
    email: "maria.gomez@email.com"
  },
  "9876543": {
    id: "customer-458",
    clientId: "9876543",
    name: "Elena Castro",
    address: "Avenida 45 #78-90, Agrado",
    phone: "3005551234",
    email: "elena.castro@email.com"
  }
};

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'AguaPago Backend API'
  });
});

// Buscar factura específica por número
app.get('/api/bills', (req, res) => {
  const billNumber = req.query.billNumber;
  
  if (!billNumber) {
    return res.status(400).json({
      success: false,
      error: 'El número de factura es requerido'
    });
  }

  const factura = facturas[billNumber];
  
  if (factura) {
    res.json({
      success: true,
      data: factura
    });
  } else {
    res.status(404).json({
      success: false,
      error: `No se encontró la factura ${billNumber}. Por favor, verifica el número ingresado.`
    });
  }
});

// Obtener todas las facturas de un cliente
app.get('/api/billsByClient', (req, res) => {
  const clientId = req.query.clientId;
  
  if (!clientId) {
    return res.status(400).json({
      success: false,
      error: 'El ID del cliente es requerido'
    });
  }

  const facturasCliente = Object.values(facturas).filter(f => f.clientId === clientId);
  
  if (facturasCliente.length > 0) {
    res.json({
      success: true,
      data: facturasCliente
    });
  } else {
    res.status(404).json({
      success: false,
      error: `No se encontraron facturas para el cliente ${clientId}`
    });
  }
});

// Obtener información de cliente
app.get('/api/customers', (req, res) => {
  const clientId = req.query.clientId;
  
  if (!clientId) {
    return res.status(400).json({
      success: false,
      error: 'El ID del cliente es requerido'
    });
  }

  const cliente = clientes[clientId];
  
  if (cliente) {
    res.json({
      success: true,
      data: cliente
    });
  } else {
    res.status(404).json({
      success: false,
      error: `No se encontró el cliente ${clientId}. Por favor, verifica el número ingresado.`
    });
  }
});

// Información de la API
app.get('/api/info', (req, res) => {
  res.json({
    service: 'AguaPago Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      bills: '/api/bills?billNumber=F-2025-02-12345',
      billsByClient: '/api/billsByClient?clientId=1234567',
      customers: '/api/customers?clientId=1234567'
    },
    examples: {
      paidBills: ['F-2025-02-12345', 'F-2025-01-12345', 'F-2025-02-67890'],
      pendingBills: ['F-2025-04-12345', 'F-2025-04-67890'],
      overdueBills: ['F-2025-03-12345', 'F-2025-03-98765']
    },
    totalBills: Object.keys(facturas).length,
    totalClients: Object.keys(clientes).length
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📋 Health: http://localhost:${PORT}/health`);
  console.log(`📖 Info: http://localhost:${PORT}/api/info`);
  console.log(`📄 Total bills: ${Object.keys(facturas).length}`);
  console.log(`👥 Total clients: ${Object.keys(clientes).length}`);
  console.log(`\n📊 Examples to test:`);
  console.log(`   - Juan Pérez (1234567): Mix of paid & pending`);
  console.log(`   - María Gómez (7654321): Mostly paid, one pending`);
  console.log(`   - Elena Castro (9876543): One paid, one overdue`);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
}); 