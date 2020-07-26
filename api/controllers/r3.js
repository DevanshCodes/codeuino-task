var available = require("../available");
var blocked = require("../blocked");

module.exports = (req, res) => {
  let key = req.body.key;
  if (blocked[key]) {
    delete blocked[key];
    available[key] = "";
    res.status(200).json({
      success: `Unblocked ${key}`,
    });
  } else if ((available[key] === "")) {
    res.status(400).json({
      failed: "Already Available Key, No need to Unblock",
    });
  } else {
    res.status(400).json({
      failed: "Not a valid key",
    });
  }
};
