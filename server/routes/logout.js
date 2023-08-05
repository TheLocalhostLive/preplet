const router = require("express").Router();

router.get("/", (req, res) => {
  res
    .clearCookie("auth-token", { path: "/" })
    .json({ message: "Khatam Tata Bye Bye", error: false });
});

module.exports = router;
