const express = require("express");
const app = express();
const controllerR1 = require("./api/controllers/r1");
const controllerR2 = require("./api/controllers/r2");
const controllerR3 = require("./api/controllers/r3");
const controllerR4 = require("./api/controllers/r4");
const controllerR5 = require("./api/controllers/r5");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: `running on port ${port_number}`,
  });
});

app.get("/generate-key", controllerR1);
app.post("/get-key", controllerR2);
app.put("/unblock-key", controllerR3);
app.delete("/delete-key", controllerR4);
app.post("/refresh-key", controllerR5);

module.exports = app;
