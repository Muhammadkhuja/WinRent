const express = require("express");
const config = require("config");
const mainRoutes = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/db");
const logger = require("./services/logger.service");

const PORT = config.get("port") || 3030;

const app = express();

app.use(cookieParser());
app.use(express.json()); // parse-body

app.use("/api", mainRoutes);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
