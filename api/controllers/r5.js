var available = require("../available");
var blocked = require("../blocked");

module.exports = (req, res) => {
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
};
