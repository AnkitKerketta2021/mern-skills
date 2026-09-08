import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { SERVER_CONFIG } from "./config/env.js";

await connectDatabase();
app.listen(SERVER_CONFIG.port, () => console.log(`MERN SKILLS API listening on ${SERVER_CONFIG.port}`));
