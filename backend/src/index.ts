const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Ruta simple de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'AguaPago Backend API'
  });
});

// Ruta simple para buscar facturas
app.get('/api/bills', (req, res) => {
  const billNumber = req.query.billNumber;
  
  res.json({
    success: true,
    data: {
      id: "bill-123",
      billNumber: billNumber || "F-2025-02-12345",
      clientId: "1234567",
      period: "Febrero 2025",
      amount: 43200,
      status: "PAID"
    }
  });
});

// Ruta simple para clientes
app.get('/api/customers', (req, res) => {
  const clientId = req.query.clientId;
  
  res.json({
    success: true,
    data: {
      id: "customer-456",
      clientId: clientId || "1234567",
      name: "Juan Pérez",
      address: "Calle 123 #45-67, El Pital",
      phone: "3001234567"
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📋 Health: http://localhost:${PORT}/health`);
});

console.log('Starting AguaPago Backend...');
