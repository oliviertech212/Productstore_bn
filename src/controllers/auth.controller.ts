import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { logger } from '../config/logger';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await authService.register(validatedData);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      logger.error('Error registering user:', error);
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to register user',
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await authService.login(validatedData.email, validatedData.password);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      logger.error('Error logging in:', error);
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to login',
      });
    }
  }
}

export default new AuthController();
