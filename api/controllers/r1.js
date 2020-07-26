const crypto = require("crypto");
var available = require("../available");
var blocked = require("../blocked");

module.exports = (req, res) => {
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
};
