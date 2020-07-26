var available = require("../available");
var blocked = require("../blocked");

module.exports = (req, res) => {
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
};
