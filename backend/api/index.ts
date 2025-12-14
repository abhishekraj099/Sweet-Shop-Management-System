// backend/api/index.ts
import type { IncomingMessage, ServerResponse } from "http";
import app from "../src/app";

export default function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  app(req as any, res as any);
}
