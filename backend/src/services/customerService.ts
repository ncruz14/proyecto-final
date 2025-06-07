import { PrismaClient } from '@prisma/client';
import { CustomerResponse, CreateCustomerRequest } from '../types';

const prisma = new PrismaClient();

export class CustomerService {
  
  // Obtener cliente por ID de cliente
  async getCustomerByClientId(clientId: string): Promise<CustomerResponse | null> {
    const customer = await prisma.customer.findUnique({
      where: { clientId }
    });

    if (!customer) return null;

    return this.formatCustomerResponse(customer);
  }

  // Obtener cliente por ID interno
  async getCustomerById(id: string): Promise<CustomerResponse | null> {
    const customer = await prisma.customer.findUnique({
      where: { id }
    });

    if (!customer) return null;

    return this.formatCustomerResponse(customer);
  }

  // Crear nuevo cliente
  async createCustomer(customerData: CreateCustomerRequest): Promise<CustomerResponse> {
    const customer = await prisma.customer.create({
      data: customerData
    });

    return this.formatCustomerResponse(customer);
  }

  // Actualizar cliente
  async updateCustomer(clientId: string, updateData: Partial<CreateCustomerRequest>): Promise<CustomerResponse | null> {
    const customer = await prisma.customer.update({
      where: { clientId },
      data: updateData
    });

    return this.formatCustomerResponse(customer);
  }

  // Obtener todos los clientes (con paginación)
  async getAllCustomers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.customer.count()
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: customers.map(customer => this.formatCustomerResponse(customer)),
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }

  // Verificar si un cliente existe
  async customerExists(clientId: string): Promise<boolean> {
    const customer = await prisma.customer.findUnique({
      where: { clientId }
    });

    return !!customer;
  }

  // Formatear respuesta de cliente
  private formatCustomerResponse(customer: any): CustomerResponse {
    return {
      id: customer.id,
      clientId: customer.clientId,
      name: customer.name,
      address: customer.address,
      phone: customer.phone,
      email: customer.email,
      createdAt: customer.createdAt.toISOString(),
      updatedAt: customer.updatedAt.toISOString()
    };
  }
}

export default new CustomerService(); 