const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const ticketRoutes = require("./Routes/ticketRoutes");
const userAuthRoutes = require("./Routes/userAuth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.use(cors());
    app.use(express.json({ extended: false }));

    // Keep both for compatibility if frontend uses either path
    app.use("/api/users", userAuthRoutes);
    app.use("/api/auth", userAuthRoutes);

    app.use("/api/tickets", ticketRoutes);

    if (process.env.NODE_ENV === "production") {
      app.use(express.static("build"));
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();