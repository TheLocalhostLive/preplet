const router = require('express').Router()
const { schema } = require('../models/jeletChemQues')
const chemQuesUp = require('../models/jeletChemQues')
const feeeQuesUp = require('../models/jeletFeeeQues')
const mathQuesUp = require('../models/jeletMathQues')
const physQuesUp = require('../models/jeletPhysQues')

router.post('/previousyearquestions', async (req, res) => {
    try {
        const prevQues = new chemQuesUp({
            question: req.body.question,
            questionImagePath: req.body.questionImagePath,
            solution: req.body.solution,
            solutionImage: req.body.solutionImage,
            isPreviousYearQuestion: req.body.isPreviousYearQuestion,
            year: req.body.year,
            chapter: req.body.chapter
        })
        const q1 = await prevQues.save()
        res.status(201).send(q1)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({message:"please try again!"})
    }
})

module.exports = router