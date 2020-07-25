const express = require("express");
const app = express();
var port_number = process.env.PORT || 4000;
const server = app.listen(port_number);
const crypto = require("crypto");

app.use(express.json());
let available = {};
let blocked = {};

app.get("/", (req, res) => {
  res.status(200).json({
    success: `running on port ${port_number}`,
  });
});

app.get("/generate-key", (req, res) => {
  crypto.randomBytes(64, (err, buf) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    let key = buf.toString("hex");
    available[key] = "";
    res.status(200).json({
      success: "Generated a Key!",
    });
    console.log(available);
  });
});

app.post("/get-key", (req, res) => {
  for (var firstKey in available) break;
  if (firstKey === undefined) {
    res.status(404).json({
      failed: "Please generate a new key",
    });
  } else {
    const refreshTimeout = setTimeout(() => {
      delete blocked[firstKey];
      available[firstKey] = "";
    }, 1000 * 60);
    const deleteTimeout = setTimeout(() => {
      delete available[firstKey];
    }, 5 * 1000 * 60);
    blocked[firstKey] = {
      user: req.body.user,
      time: new Date().getTime(),
      refreshTimeout,
      deleteTimeout,
    };
    delete available[firstKey];
    res.status(200).json({
      success: `Key ${firstKey}`,
    });
  }
});

app.put("/unblock-key", (req, res) => {
  let key = req.body.key;
  if (blocked[key]) {
    delete blocked[key];
    available[key] = "";
    res.status(200).json({
      success: `Unblocked ${key}`,
    });
  } else {
    res.status(400).json({
      failed: "not a valid key",
    });
  }
});

app.post("/refresh-key", (req, res) => {
  let key = req.body.key;
  if (available[key] === "") {
    const refreshTimeout = setTimeout(() => {
      delete blocked[key];
      available[key] = "";
    }, 1000 * 60);
    const deleteTimeout = setTimeout(() => {
      delete available[key];
    }, 5 * 1000 * 60);
    blocked[key] = {
      user: req.body.user,
      time: new Date().getTime(),
      refreshTimeout,
      deleteTimeout,
    };
    delete available[key];
    res.status(200).json({
      Success: "Refresh successfull after the time",
    });
  } else if (blocked[key]) {
    let user = blocked[key].user;
    if (user === req.body.user) {
      clearTimeout(blocked[key].refreshTimeout);
      clearTimeout(blocked[key].deleteTimeout);
      const refreshTimeout = setTimeout(() => {
        delete blocked[key];
        available[key] = "";
      }, 1000 * 60);
      const deleteTimeout = setTimeout(() => {
        delete available[key];
      }, 5 * 1000 * 60);
      blocked[key] = {
        user,
        refreshTimeout,
        deleteTimeout,
      };
      res.status(200).json({
        Success: "Refresh successfull within the time",
      });
    } else {
      res.status(400).json({
        failed: "somebody else took that key or invalid user",
      });
    }
  } else {
    res.status(400).json({
      failed: "key not found",
    });
  }
});

app.delete("/delete-key", (req, res) => {
  let key = req.body.key;
  if (available[key] === "") {
    delete available[key];
    res.status(200).json({
      success: `key ${key}`,
    });
  } else if (blocked[key]) {
    delete blocked[key];
    res.status(200).json({
      success: `key ${key}`,
    });
  } else {
    res.status(400).json({
      failed: "key invalid",
    });
  }
});

module.exports = app;
