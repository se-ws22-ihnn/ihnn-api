const Question = require("../models/question");

async function getAllQuestions(search, reqPage, reqLimit) {
    let options = {};

    if (search) {
        options = {
            ...options,
            $or: [
                {question: new RegExp(search.toString(), 'i')},
                {category: new RegExp(search.toString(), 'i')}
            ]
        }
    }

    let total = Question.countDocuments(options);
    let page = parseInt(reqPage) || 1;
    let limit = parseInt(reqLimit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const questions = await Question.find(options).skip((page - 1) * limit).limit(limit);
        return {
            success: true,
            data: questions,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString(),
        };
    } catch (err) {
        return { success: false, message: "Questions not found" };
    }
}

async function getQuestionById(id) {
    let question;
    try {
        question = await Question.findById(id);
        if (question == null) {
            return { success: false, message: 'Cannot find question' };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }

    return {
        success: true,
        data: question,
    };
}

async function addQuestion(body) {
    const question = new Question(body);

    try {
        if (Object.values(body.question).length == 0) {
            throw new Error("Cannot add empty question");
        }

        if (Object.values(body.category).length == 0) {
            throw new Error("Cannot add question without category");
        }
        
        const newQuestion = await question.save();
        return {
            success: true,
            data: newQuestion,
        };
    } catch (err) {
        return { success: false, message: err.message };
    }
}

async function removeQuestion(id) {
    let question;
    try {
        question = await Question.findById(id);
        if (question == null) {
            return { success: false, message: 'Cannot find question' };
        }

        try {
            await question.remove();
            return { success: true, message: 'Deleted question' };
        }
        catch (err) {
            return { success: false, message: err.message };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    addQuestion,
    removeQuestion,
};