const router = require("express").Router();
const chemQuesUp = require("../models/jeletChemQues");
const feeeQuesUp = require("../models/jeletFeeeQues");
const mathQuesUp = require("../models/jeletMathQues");
const physQuesUp = require("../models/jeletPhysQues");

router.post("/chem", async (req, res) => {
  try {
    let foundQues;
    foundQues = await chemQuesUp.find({ year: req.body.year });
    res
      .status(200)
      .json({
        question: foundQues,
        error: false,
        messsage: "successful",
        count: foundQues.length,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "please try again!" });
  }
});
router.post("/math", async (req, res) => {
  try {
    let foundQues;
    foundQues = await mathQuesUp.find({ year: req.body.year });
    res
      .status(200)
      .json({
        question: foundQues,
        error: false,
        messsage: "successful",
        count: foundQues.length,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "please try again!" });
  }
});
router.post("/phys", async (req, res) => {
  try {
    let foundQues;
    foundQues = await physQuesUp.find({ year: req.body.year });
    res
      .status(200)
      .json({
        question: foundQues,
        error: false,
        messsage: "successful",
        count: foundQues.length,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "please try again!" });
  }
});
router.post("/feee", async (req, res) => {
  try {
    let foundQues;
    foundQues = await feeeQuesUp.find({ year: req.body.year });
    res
      .status(200)
      .json({
        question: foundQues,
        error: false,
        messsage: "successful",
        count: foundQues.length,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "please try again!" });
  }
});
module.exports = router;
