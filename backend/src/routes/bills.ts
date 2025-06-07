import { Router } from 'express';

const router = Router();

// Buscar factura por número
router.get('/search', (req, res) => {
  const { billNumber } = req.query;
  
  if (!billNumber) {
    return res.status(400).json({
      success: false,
      error: 'Bill number is required'
    });
  }

  // Datos de ejemplo
  res.json({
    success: true,
    data: {
      id: "bill-uuid-123",
      billNumber: billNumber,
      clientId: "1234567",
      period: "Febrero 2025",
      amount: 43200,
      status: "PAID",
      dueDate: "2025-03-15",
      paymentDate: "2025-03-10",
      receiptNumber: "COMP-2025-02"
    }
  });
});

// Health check para facturas
router.get('/health', (req, res) => {
  res.json({ 
    status: 'Bills API OK',
    timestamp: new Date().toISOString()
  });
});

export default router; 