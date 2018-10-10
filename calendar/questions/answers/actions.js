import {
    CREATE_HATCH_ANSWER,
    CREATE_HATCH_ANSWER_SUCCESS,
    UPDATE_HATCH_ANSWER,
    UPDATE_HATCH_ANSWER_SUCCESS,
    DELETE_HATCH_ANSWER,
    DELETE_HATCH_ANSWER_SUCCESS
} from './constants'

const createAnswer = (questionID, answer, localizationId, questionType) => ({
    type: CREATE_HATCH_ANSWER,
    questionID,
    answer,
    localizationId,
    questionType
})
const createAnswerSuccess = (questionID, question) => ({
    type: CREATE_HATCH_ANSWER_SUCCESS,
    questionID,
    question
})

const updateAnswer = (questionID, answerId, answer, questionType) => ({
    type: UPDATE_HATCH_ANSWER,
    questionID,
    answerId,
    answer,
    questionType
})
const updateAnswerSuccess = (questionID, question) => ({
    type: UPDATE_HATCH_ANSWER_SUCCESS,
    questionID,
    question
})
const deleteAnswer = (questionID, answerId, questionType) => ({
    type: DELETE_HATCH_ANSWER,
    questionID,
    answerId,
    questionType
})
const deleteAnswerSuccess = (questionID, question) => ({
    type: DELETE_HATCH_ANSWER_SUCCESS,
    questionID,
    question
})

export {
    createAnswer,
    createAnswerSuccess,
    updateAnswer,
    updateAnswerSuccess,
    deleteAnswer,
    deleteAnswerSuccess
}