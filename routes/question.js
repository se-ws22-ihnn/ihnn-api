const express = require('express');
const router = express.Router();
let { getAllQuestions, getQuestionById, addQuestion, removeQuestion } = require('../controllers/questionController')

/**
 * @swagger
 * /questions:
 *   get:
 *     description: Return all questions stored in the database.
 *     responses:
 *       200:
 *          description: Returned all the questions
 *       404:
 *          description: No questions found
 * */
router.get('/', async (req, res) => {
    let response = await getAllQuestions(req.query.s, req.query.page, req.query.limit);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /questions/{id}:
 *   get: 
 *     description: Get a question by id.
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The question id.
 *     responses:
 *       200:
 *         description: Returns the requested question
 *       404:
 *          description: Question not found
 * */
router.get('/:id', async (req, res) => {
    let response = await getQuestionById(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
* /questions:
*   post:
*     description: Add a new question to the database
*     parameters:
*      - in: body
*        name: question
*        description: Add Question
*        schema:
*          type: object
*          properties:
*            question:
*              type: string
*            category:
*              type: string
*     responses:
*       201:
*           description: Added Question
*       404:
*           description: Necessary parameters for adding questions are missing
*/
router.post('/', async (req, res) => {
    let body = {
        question: req.body.question,
        category: req.body.category,
    };
    let response = await addQuestion(body);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /questions/{id}:
 *  delete:
 *      description: Delete Question
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of question to delete
 *      responses:
 *          200:
 *              description: Question deleted
 *          404:
 *              description: Question not found
 * */
router.delete('/:id', async (req, res) => {
    let response = await removeQuestion(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

module.exports = router;
