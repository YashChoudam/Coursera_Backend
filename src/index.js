import express from "express";
import dotenv from "dotenv";

// all the routes
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
// import courseRoutes from "./routes/course.routes.js";

//Database connection
import connectDB from "./database/database.js";

dotenv.config({
  path: "../.env",
});

const app = express();
const port = process.env.PORT;

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/cousrse", courseRoutes);
// app.use("/api/v1/purchase",purchaseRoutes);

connectDB()
    .then(() => {
        app.listen(port, () => {
        console.log(`Server runnign on  : http://localhost:${port}`);
        });
    })
    .catch(()=>{
        console.log("Database connection Error");
        process.exit(1);
    })
