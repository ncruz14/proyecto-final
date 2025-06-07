import { PrismaClient } from '@prisma/client';

// Enum values from schema
const BillStatus = {
  PENDING: 'PENDING' as const,
  PAID: 'PAID' as const,
  OVERDUE: 'OVERDUE' as const,
  CANCELLED: 'CANCELLED' as const
};

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Limpiar datos existentes
    await prisma.bill.deleteMany();
    await prisma.customer.deleteMany();
    
    console.log('🗑️  Cleared existing data');

    // Crear clientes de prueba
    const customers = [
      {
        clientId: '1234567',
        name: 'Juan Pérez',
        address: 'Calle 123 #45-67, El Pital',
        phone: '3001234567',
        email: 'juan.perez@email.com'
      },
      {
        clientId: '7654321',
        name: 'María Gómez',
        address: 'Carrera 89 #12-34, El Pital',
        phone: '3009876543',
        email: 'maria.gomez@email.com'
      },
      {
        clientId: '9876543',
        name: 'Carlos Rodríguez',
        address: 'Avenida Principal #56-78, Agrado',
        phone: '3005555555',
        email: 'carlos.rodriguez@email.com'
      },
      {
        clientId: '1357924',
        name: 'Ana Martínez',
        address: 'Calle 45 #89-12, El Pital',
        phone: '3007777777',
        email: 'ana.martinez@email.com'
      }
    ];

    console.log('👥 Creating customers...');
    const createdCustomers = await Promise.all(
      customers.map(customer => prisma.customer.create({ data: customer }))
    );
    console.log(`✓ Created ${createdCustomers.length} customers`);

    // Crear facturas de prueba
    const bills = [
      // Facturas de Juan Pérez (1234567)
      {
        billNumber: 'F-2025-02-12345',
        clientId: '1234567',
        customerId: createdCustomers[0].id,
        period: 'Febrero 2025',
        amount: 43200, // $432.00
        dueDate: new Date('2025-03-15'),
        issueDate: new Date('2025-02-15'),
        paymentDate: new Date('2025-03-10'),
        status: BillStatus.PAID,
        receiptNumber: 'COMP-2025-02',
        consumption: 15.5,
        previousReading: 1245.0,
        currentReading: 1260.5
      },
      {
        billNumber: 'F-2025-01-12345',
        clientId: '1234567',
        customerId: createdCustomers[0].id,
        period: 'Enero 2025',
        amount: 38900, // $389.00
        dueDate: new Date('2025-02-15'),
        issueDate: new Date('2025-01-15'),
        paymentDate: new Date('2025-02-10'),
        status: BillStatus.PAID,
        receiptNumber: 'COMP-2025-01',
        consumption: 12.3,
        previousReading: 1232.7,
        currentReading: 1245.0
      },
      {
        billNumber: 'F-2025-03-12345',
        clientId: '1234567',
        customerId: createdCustomers[0].id,
        period: 'Marzo 2025',
        amount: 47500, // $475.00
        dueDate: new Date('2025-04-15'),
        issueDate: new Date('2025-03-15'),
        status: BillStatus.PENDING,
        consumption: 18.2,
        previousReading: 1260.5,
        currentReading: 1278.7
      },

      // Facturas de María Gómez (7654321)
      {
        billNumber: 'F-2025-02-67890',
        clientId: '7654321',
        customerId: createdCustomers[1].id,
        period: 'Febrero 2025',
        amount: 52000, // $520.00
        dueDate: new Date('2025-03-15'),
        issueDate: new Date('2025-02-15'),
        status: BillStatus.PENDING,
        consumption: 22.1,
        previousReading: 567.8,
        currentReading: 589.9
      },
      {
        billNumber: 'F-2025-01-67890',
        clientId: '7654321',
        customerId: createdCustomers[1].id,
        period: 'Enero 2025',
        amount: 35600, // $356.00
        dueDate: new Date('2025-02-15'),
        issueDate: new Date('2025-01-15'),
        paymentDate: new Date('2025-02-12'),
        status: BillStatus.PAID,
        receiptNumber: 'COMP-2025-03',
        consumption: 9.8,
        previousReading: 558.0,
        currentReading: 567.8
      },

      // Facturas de Carlos Rodríguez (9876543)
      {
        billNumber: 'F-2024-12-11111',
        clientId: '9876543',
        customerId: createdCustomers[2].id,
        period: 'Diciembre 2024',
        amount: 28700, // $287.00
        dueDate: new Date('2025-01-15'),
        issueDate: new Date('2024-12-15'),
        status: BillStatus.OVERDUE,
        consumption: 8.5,
        previousReading: 890.2,
        currentReading: 898.7
      },
      {
        billNumber: 'F-2025-02-22222',
        clientId: '9876543',
        customerId: createdCustomers[2].id,
        period: 'Febrero 2025',
        amount: 41300, // $413.00
        dueDate: new Date('2025-03-15'),
        issueDate: new Date('2025-02-15'),
        status: BillStatus.PENDING,
        consumption: 14.7,
        previousReading: 898.7,
        currentReading: 913.4
      },

      // Facturas de Ana Martínez (1357924)
      {
        billNumber: 'F-2025-02-33333',
        clientId: '1357924',
        customerId: createdCustomers[3].id,
        period: 'Febrero 2025',
        amount: 39800, // $398.00
        dueDate: new Date('2025-03-15'),
        issueDate: new Date('2025-02-15'),
        paymentDate: new Date('2025-03-05'),
        status: BillStatus.PAID,
        receiptNumber: 'COMP-2025-04',
        consumption: 13.2,
        previousReading: 445.6,
        currentReading: 458.8
      }
    ];

    console.log('📄 Creating bills...');
    const createdBills = await Promise.all(
      bills.map(bill => prisma.bill.create({ data: bill }))
    );
    console.log(`✓ Created ${createdBills.length} bills`);

    console.log('✅ Seed completed successfully!');
    
    // Mostrar resumen
    const totalCustomers = await prisma.customer.count();
    const totalBills = await prisma.bill.count();
    const paidBills = await prisma.bill.count({ where: { status: BillStatus.PAID } });
    const pendingBills = await prisma.bill.count({ where: { status: BillStatus.PENDING } });
    const overdueBills = await prisma.bill.count({ where: { status: BillStatus.OVERDUE } });

    console.log('\n📊 Database Summary:');
    console.log(`👥 Total customers: ${totalCustomers}`);
    console.log(`📄 Total bills: ${totalBills}`);
    console.log(`✅ Paid bills: ${paidBills}`);
    console.log(`⏳ Pending bills: ${pendingBills}`);
    console.log(`⚠️  Overdue bills: ${overdueBills}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar seed si se ejecuta directamente
if (require.main === module) {
  seed();
}

export default seed; 