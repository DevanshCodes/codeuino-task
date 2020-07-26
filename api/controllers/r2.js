var available = require("../available");
var blocked = require("../blocked");

module.exports = (req, res) => {
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
      success: `${firstKey}`,
    });
  }
};
