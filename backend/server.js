const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const ticketRoutes = require("./Routes/ticketRoutes");
const userAuthRoutes = require("./Routes/userAuth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );
    app.use(express.json({ extended: false }));
    app.use(cookieParser());

    // Auth routes (keep both prefixes for compatibility)
    app.use("/api/auth", userAuthRoutes);
    app.use("/api/users", userAuthRoutes);

    // Ticket routes
    app.use("/api/tickets", ticketRoutes);

    app.get("/api/health", (req, res) => res.json({ ok: true }));

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server start error:", error.message);
    process.exit(1);
  }
};

startServer();