const router = require("express").Router();

router.get("/", (req, res) => {
  res.send(
    `<h1>Email has been verified , Now you can <a href="${process.env.FRONT_END_URL}/Login">Login</a> </h1>`
  );
});

module.exports = router;
