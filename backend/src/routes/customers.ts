import { Router } from 'express';

const router = Router();

// Obtener cliente por ID
router.get('/:clientId', (req, res) => {
  const { clientId } = req.params;
  
  res.json({
    success: true,
    data: {
      id: "uuid",
      clientId: clientId,
      name: "Juan Pérez",
      address: "Calle 123 #45-67, El Pital",
      phone: "3001234567",
      email: "juan.perez@email.com"
    }
  });
});

// Health check para clientes
router.get('/health', (req, res) => {
  res.json({ status: 'Customers API OK' });
});

export default router; 