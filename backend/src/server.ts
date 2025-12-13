// server.ts – use ONLY for local dev, do not deploy this file
import { connectDB } from "./config/db";
import app from "./app";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
