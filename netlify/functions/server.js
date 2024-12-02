const express = require("express");
const http = require("http");
const cors = require("cors");
const productRoutes = require("../../routes/productRoutes");
const serverless = require("serverless-http");

const app = express();
// const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);

const server = http.createServer(app);

// server.listen(port, () => {
//   console.log(`Server is listening on http://localhost:${port}`);
// });

module.exports.handler = serverless(app);
// Try something