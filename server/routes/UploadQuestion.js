//const { addListener } = require('../models/jeletQuesUp')
const router = require('express').Router()
const chemQuesUp = require('../models/jeletChemQues')
const feeeQuesUp = require('../models/jeletFeeeQues')
const mathQuesUp = require('../models/jeletMathQues')
const physQuesUp = require('../models/jeletPhysQues')
/*router.get('/', async (req, res) => {
    try {
        const upload = await chemQuesUp.find()
        res.json(upload)
    }
    catch (err) {
        res.send('Error ' + err)
    }
})*/

router.post('/chemistry', async (req, res) => {
    try {
        const quesUp = new chemQuesUp({
            question: req.body.question,
            questionImagePath: req.body.questionImagePath,
            solution: req.body.solution,
            solutionImage: req.body.solutionImage,
            isPreviousYearQuestion: req.body.isPreviousYearQuestion,
            year: req.body.year,
            chapter: req.body.chapter
        })
        const q1 = await quesUp.save()
        res.send(q1)
    }
    catch (err) {
        console.log(err)
    }
})
router.post('/math', async (req, res) => {
    try {
        const quesUp = new mathQuesUp({
            question: req.body.question,
            questionImagePath: req.body.questionImagePath,
            solution: req.body.solution,
            solutionImage: req.body.solutionImage,
            isPreviousYearQuestion: req.body.isPreviousYearQuestion,
            year: req.body.year,
            chapter: req.body.chapter
        })
        const q1 = await quesUp.save()
        res.send(q1)
    }
    catch (err) {
        console.log(err)
    }
})
router.post('/physics', async (req, res) => {
    try {
        const quesUp = new physQuesUp({
            question: req.body.question,
            questionImagePath: req.body.questionImagePath,
            solution: req.body.solution,
            solutionImage: req.body.solutionImage,
            isPreviousYearQuestion: req.body.isPreviousYearQuestion,
            year: req.body.year,
            chapter: req.body.chapter
        })
        const q1 = await quesUp.save()
        res.send(q1)
    }
    catch (err) {
        console.log(err)
    }
})
router.post('/feee', async (req, res) => {
    try {
        const quesUp = new feeeQuesUp({
            question: req.body.question,
            questionImagePath: req.body.questionImagePath,
            solution: req.body.solution,
            solutionImage: req.body.solutionImage,
            isPreviousYearQuestion: req.body.isPreviousYearQuestion,
            year: req.body.year,
            chapter: req.body.chapter
        })
        const q1 = await quesUp.save()
        res.send(q1)
    }
    catch (err) {
        console.log(err)
    }
})
module.exports = router