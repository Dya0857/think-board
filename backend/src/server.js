import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notes.routes.js"
import { connectDB } from "./config/db.config.js"
import rateLimiter from "./middleware/rateLimiter.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

app.use(cors({
    origin:"http://localhost:5173"}
));

app.use(express.json()); //parses the json bodies.
app.use(rateLimiter);

app.use((req, res, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
}); 

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT);
    });
});