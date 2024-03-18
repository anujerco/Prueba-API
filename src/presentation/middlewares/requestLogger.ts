import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../data/postgres';

export const requestLogger = async(req: Request, res: Response, next: NextFunction) => {
  const requestTime = new Date();
  const { method, url } = req;

  try {

    await prisma.requestLog.create({
      data: {
        method,
        url,
        requestTime,
      },
    });

    next(); 
  } catch (error) {
    console.error('Error al registrar la solicitud:', error);
    next(error);
  }
}