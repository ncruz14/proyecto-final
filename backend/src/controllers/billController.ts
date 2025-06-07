import { Request, Response } from 'express';
import billService from '../services/billService';
import { ApiResponse, BillQueryParams } from '../types';

export class BillController {

  // GET /api/bills/search?billNumber=F-2025-02-12345
  async searchBillByNumber(req: Request, res: Response) {
    try {
      const { billNumber } = req.query;

      if (!billNumber || typeof billNumber !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Bill number is required'
        } as ApiResponse);
      }

      const bill = await billService.getBillByNumber(billNumber);

      if (!bill) {
        return res.status(404).json({
          success: false,
          error: 'Bill not found'
        } as ApiResponse);
      }

      res.json({
        success: true,
        data: bill
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // GET /api/bills/client/:clientId
  async getBillsByClientId(req: Request, res: Response) {
    try {
      const { clientId } = req.params;

      const bills = await billService.getBillsByClientId(clientId);

      res.json({
        success: true,
        data: bills
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // GET /api/bills/history
  async getBillsHistory(req: Request, res: Response) {
    try {
      const params: BillQueryParams = {
        clientId: req.query.clientId as string,
        status: req.query.status as any,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string
      };

      const result = await billService.getBillsHistory(params);
      res.json(result);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // GET /api/bills/:billId
  async getBillDetails(req: Request, res: Response) {
    try {
      const { billId } = req.params;

      const bill = await billService.getBillDetails(billId);

      if (!bill) {
        return res.status(404).json({
          success: false,
          error: 'Bill not found'
        } as ApiResponse);
      }

      res.json({
        success: true,
        data: bill
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // POST /api/bills
  async createBill(req: Request, res: Response) {
    try {
      const billData = req.body;

      // Validación básica
      const required = ['billNumber', 'clientId', 'period', 'amount', 'dueDate', 'issueDate'];
      for (const field of required) {
        if (!billData[field]) {
          return res.status(400).json({
            success: false,
            error: `Field ${field} is required`
          } as ApiResponse);
        }
      }

      const bill = await billService.createBill(billData);

      res.status(201).json({
        success: true,
        data: bill,
        message: 'Bill created successfully'
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // PUT /api/bills/:billId
  async updateBill(req: Request, res: Response) {
    try {
      const { billId } = req.params;
      const updateData = req.body;

      const bill = await billService.updateBill(billId, updateData);

      if (!bill) {
        return res.status(404).json({
          success: false,
          error: 'Bill not found'
        } as ApiResponse);
      }

      res.json({
        success: true,
        data: bill,
        message: 'Bill updated successfully'
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // POST /api/bills/:billNumber/pay
  async markBillAsPaid(req: Request, res: Response) {
    try {
      const { billNumber } = req.params;
      const { receiptNumber } = req.body;

      if (!receiptNumber) {
        return res.status(400).json({
          success: false,
          error: 'Receipt number is required'
        } as ApiResponse);
      }

      const bill = await billService.markBillAsPaid(billNumber, receiptNumber);

      if (!bill) {
        return res.status(404).json({
          success: false,
          error: 'Bill not found'
        } as ApiResponse);
      }

      res.json({
        success: true,
        data: bill,
        message: 'Bill marked as paid successfully'
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }

  // GET /api/bills/stats
  async getBillStats(req: Request, res: Response) {
    try {
      const { clientId } = req.query;

      const stats = await billService.getBillStats(clientId as string);

      res.json({
        success: true,
        data: stats
      } as ApiResponse);

    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }
}

export default new BillController(); 