import { Request, Response } from 'express';
import customerService from '../services/customerService';
import { ApiResponse } from '../types';

export class CustomerController {

  // GET /api/customers/:clientId
  async getCustomerByClientId(req: Request, res: Response) {
    try {
      const { clientId } = req.params;

      const customer = await customerService.getCustomerByClientId(clientId);

      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        } as ApiResponse);
      }

      res.json({
        success: true,
        data: customer
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // GET /api/customers
  async getAllCustomers(req: Request, res: Response) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const result = await customerService.getAllCustomers(page, limit);
      res.json(result);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // POST /api/customers
  async createCustomer(req: Request, res: Response) {
    try {
      const customerData = req.body;

      // Validación básica
      const required = ['clientId', 'name', 'address'];
      for (const field of required) {
        if (!customerData[field]) {
          return res.status(400).json({
            success: false,
            error: `Field ${field} is required`
          } as ApiResponse);
        }
      }

      // Verificar si el cliente ya existe
      const exists = await customerService.customerExists(customerData.clientId);
      if (exists) {
        return res.status(409).json({
          success: false,
          error: 'Customer with this clientId already exists'
        } as ApiResponse);
      }

      const customer = await customerService.createCustomer(customerData);

      res.status(201).json({
        success: true,
        data: customer,
        message: 'Customer created successfully'
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // PUT /api/customers/:clientId
  async updateCustomer(req: Request, res: Response) {
    try {
      const { clientId } = req.params;
      const updateData = req.body;

      const customer = await customerService.updateCustomer(clientId, updateData);

      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        } as ApiResponse);
      }

      res.json({
        success: true,
        data: customer,
        message: 'Customer updated successfully'
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // GET /api/customers/:clientId/exists
  async checkCustomerExists(req: Request, res: Response) {
    try {
      const { clientId } = req.params;

      const exists = await customerService.customerExists(clientId);

      res.json({
        success: true,
        data: { exists }
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }
}

export default new CustomerController(); 