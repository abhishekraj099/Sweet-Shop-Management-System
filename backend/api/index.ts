import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../src/config/db';
import app from '../src/app';

let isConnected = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req as any, res as any);
}
