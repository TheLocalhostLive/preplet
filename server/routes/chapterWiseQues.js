const router = require("express").Router();
const chemQuesUp = require("../models/jeletChemQues");
const feeeQuesUp = require("../models/jeletFeeeQues");
const mathQuesUp = require("../models/jeletMathQues");
const physQuesUp = require("../models/jeletPhysQues");

router.post("/chem", async (req, res) => {
  try {
    let foundQues;
    foundQues = await chemQuesUp.find({ chapter: req.body.chapter });
    //console.log(foundQues);
    res.status(200).json({
      question: foundQues,
      error: false,
      messsage: "successful",
      count: foundQues.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "please try again!" });
  }
});
router.post("/math", async (req, res) => {
  try {
    let foundQues;
    foundQues = await mathQuesUp.find({ chapter: req.body.chapter });
    res.status(200).json({
      question: foundQues,
      error: false,
      messsage: "successful",
      count: foundQues.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "please try again!" });
  }
});
router.post("/phys", async (req, res) => {
  try {
    let foundQues;
    foundQues = await physQuesUp.find({ chapter: req.body.chapter });
    res.status(200).json({
      question: foundQues,
      error: false,
      messsage: "successful",
      count: foundQues.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "please try again!" });
  }
});
router.post("/feee", async (req, res) => {
  try {
    let foundQues;
    foundQues = await feeeQuesUp.find({ chapter: req.body.chapter });
    res.status(200).json({
      question: foundQues,
      error: false,
      messsage: "successful",
      count: foundQues.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "please try again!" });
  }
});
module.exports = router;
