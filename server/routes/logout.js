const router = require("express").Router();

router.get("/", (req, res) => {
  res
    .clearCookie("auth-token", { path: "/" })
    .json({ message: "LogOut Done", error: false });
});

module.exports = router;
