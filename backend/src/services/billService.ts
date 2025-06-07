import { PrismaClient } from '@prisma/client';

// Enum values from schema
const BillStatus = {
  PENDING: 'PENDING' as const,
  PAID: 'PAID' as const,
  OVERDUE: 'OVERDUE' as const,
  CANCELLED: 'CANCELLED' as const
};
import { 
  BillResponse, 
  CreateBillRequest, 
  UpdateBillRequest, 
  BillQueryParams,
  BillStats,
  PaginatedResponse 
} from '../types';

const prisma = new PrismaClient();

export class BillService {
  
  // Consultar factura por número de factura
  async getBillByNumber(billNumber: string): Promise<BillResponse | null> {
    const bill = await prisma.bill.findUnique({
      where: { billNumber },
      include: { customer: true }
    });

    if (!bill) return null;

    return this.formatBillResponse(bill);
  }

  // Consultar facturas por ID de cliente
  async getBillsByClientId(clientId: string): Promise<BillResponse[]> {
    const bills = await prisma.bill.findMany({
      where: { clientId },
      include: { customer: true },
      orderBy: { issueDate: 'desc' }
    });

    return bills.map(bill => this.formatBillResponse(bill));
  }

  // Obtener historial de facturas con paginación
  async getBillsHistory(params: BillQueryParams): Promise<PaginatedResponse<BillResponse>> {
    const {
      clientId,
      status,
      page = 1,
      limit = 10,
      startDate,
      endDate
    } = params;

    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (clientId) where.clientId = clientId;
    if (status) where.status = status;
    if (startDate || endDate) {
      where.issueDate = {};
      if (startDate) where.issueDate.gte = new Date(startDate);
      if (endDate) where.issueDate.lte = new Date(endDate);
    }

    const [bills, total] = await Promise.all([
      prisma.bill.findMany({
        where,
        include: { customer: true },
        orderBy: { issueDate: 'desc' },
        skip,
        take: limit
      }),
      prisma.bill.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: bills.map(bill => this.formatBillResponse(bill)),
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }

  // Obtener detalles de una factura específica
  async getBillDetails(billId: string): Promise<BillResponse | null> {
    const bill = await prisma.bill.findUnique({
      where: { id: billId },
      include: { customer: true }
    });

    if (!bill) return null;

    return this.formatBillResponse(bill);
  }

  // Crear nueva factura
  async createBill(billData: CreateBillRequest): Promise<BillResponse> {
    // Verificar que el cliente existe
    const customer = await prisma.customer.findUnique({
      where: { clientId: billData.clientId }
    });

    if (!customer) {
      throw new Error(`Customer with clientId ${billData.clientId} not found`);
    }

    const bill = await prisma.bill.create({
      data: {
        ...billData,
        customerId: customer.id,
        dueDate: new Date(billData.dueDate),
        issueDate: new Date(billData.issueDate)
      },
      include: { customer: true }
    });

    return this.formatBillResponse(bill);
  }

  // Actualizar factura (pago, estado, etc.)
  async updateBill(billId: string, updateData: UpdateBillRequest): Promise<BillResponse | null> {
    const updatePayload: any = { ...updateData };
    
    if (updateData.paymentDate) {
      updatePayload.paymentDate = new Date(updateData.paymentDate);
    }

    const bill = await prisma.bill.update({
      where: { id: billId },
      data: updatePayload,
      include: { customer: true }
    });

    return this.formatBillResponse(bill);
  }

  // Marcar factura como pagada
  async markBillAsPaid(billNumber: string, receiptNumber: string): Promise<BillResponse | null> {
    const bill = await prisma.bill.update({
      where: { billNumber },
      data: {
        status: BillStatus.PAID,
        paymentDate: new Date(),
        receiptNumber
      },
      include: { customer: true }
    });

    return this.formatBillResponse(bill);
  }

  // Obtener estadísticas de facturas
  async getBillStats(clientId?: string): Promise<BillStats> {
    const where = clientId ? { clientId } : {};

    const [bills, totalAmount, paidAmount] = await Promise.all([
      prisma.bill.groupBy({
        by: ['status'],
        where,
        _count: { status: true }
      }),
      prisma.bill.aggregate({
        where,
        _sum: { amount: true }
      }),
      prisma.bill.aggregate({
        where: { ...where, status: BillStatus.PAID },
        _sum: { amount: true }
      })
    ]);

    const stats: BillStats = {
      totalBills: 0,
      paidBills: 0,
      pendingBills: 0,
      overdueBills: 0,
      totalAmount: totalAmount._sum.amount || 0,
      paidAmount: paidAmount._sum.amount || 0,
      pendingAmount: 0
    };

    bills.forEach(group => {
      stats.totalBills += group._count.status;
      
      switch (group.status) {
        case BillStatus.PAID:
          stats.paidBills = group._count.status;
          break;
        case BillStatus.PENDING:
          stats.pendingBills = group._count.status;
          break;
        case BillStatus.OVERDUE:
          stats.overdueBills = group._count.status;
          break;
      }
    });

    stats.pendingAmount = stats.totalAmount - stats.paidAmount;

    return stats;
  }

  // Actualizar facturas vencidas
  async updateOverdueBills(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await prisma.bill.updateMany({
      where: {
        status: BillStatus.PENDING,
        dueDate: { lt: today }
      },
      data: { status: BillStatus.OVERDUE }
    });

    return result.count;
  }

  // Formatear respuesta de factura
  private formatBillResponse(bill: any): BillResponse {
    return {
      id: bill.id,
      billNumber: bill.billNumber,
      clientId: bill.clientId,
      period: bill.period,
      amount: bill.amount,
      dueDate: bill.dueDate.toISOString(),
      issueDate: bill.issueDate.toISOString(),
      paymentDate: bill.paymentDate?.toISOString(),
      status: bill.status,
      receiptNumber: bill.receiptNumber,
      consumption: bill.consumption,
      previousReading: bill.previousReading,
      currentReading: bill.currentReading,
      createdAt: bill.createdAt.toISOString(),
      updatedAt: bill.updatedAt.toISOString(),
      customer: bill.customer ? {
        id: bill.customer.id,
        clientId: bill.customer.clientId,
        name: bill.customer.name,
        address: bill.customer.address,
        phone: bill.customer.phone,
        email: bill.customer.email,
        createdAt: bill.customer.createdAt.toISOString(),
        updatedAt: bill.customer.updatedAt.toISOString()
      } : undefined
    };
  }
}

export default new BillService(); 