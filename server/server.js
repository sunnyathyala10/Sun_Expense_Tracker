import app from "./src/app.js";
import { connectDB } from "./src/config";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
