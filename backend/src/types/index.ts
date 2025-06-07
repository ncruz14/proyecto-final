// Enum values from schema
type BillStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';

// Tipos de respuesta para la API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Tipos para Customer
export interface CustomerResponse {
  id: string;
  clientId: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequest {
  clientId: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
}

// Tipos para Bill
export interface BillResponse {
  id: string;
  billNumber: string;
  clientId: string;
  period: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  paymentDate?: string;
  status: BillStatus;
  receiptNumber?: string;
  consumption?: number;
  previousReading?: number;
  currentReading?: number;
  createdAt: string;
  updatedAt: string;
  customer?: CustomerResponse;
}

export interface CreateBillRequest {
  billNumber: string;
  clientId: string;
  period: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  consumption?: number;
  previousReading?: number;
  currentReading?: number;
}

export interface UpdateBillRequest {
  status?: BillStatus;
  paymentDate?: string;
  receiptNumber?: string;
}

// Tipos para consultas
export interface BillQueryParams {
  billNumber?: string;
  clientId?: string;
  status?: BillStatus;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para estadísticas
export interface BillStats {
  totalBills: number;
  paidBills: number;
  pendingBills: number;
  overdueBills: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
} 