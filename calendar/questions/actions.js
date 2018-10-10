import {
    CREATE_CALENDAR_QUESTION,
    CREATE_CALENDAR_QUESTION_SUCCESS,
    DELETE_CALENDAR_QUESTION,
    DELETE_CALENDAR_QUESTION_SUCCESS,
    GET_CALENDAR_QUIZZES_LIST,
    GET_CALENDAR_QUIZZES_LIST_SUCCESS,
    CALENDAR_QUESTION_COPY,
    CALENDAR_QUESTION_COPY_SUCCESS,
    UPLOAD_CALENDAR_QUESTION_COVER,
    UPLOAD_CALENDAR_QUESTION_COVER_SUCCESS,
    UPDATE_CALENDAR_QUESTION,
    UPDATE_CALENDAR_QUESTION_SUCCESS,
    GET_HATCH_QUESTIONS,
    GET_HATCH_QUESTIONS_SUCCESS
} from './constants'

const createCalendarQuestion = (hatchID, questionType, questionText, langID) => ({
    type: CREATE_CALENDAR_QUESTION,
    hatchID,
    questionType,
    questionText,
    langID
})

const createCalendarQuestionSuccess = question => ({
    type: CREATE_CALENDAR_QUESTION_SUCCESS,
    question
})

const getHatchQuestions = hatchID => ({
    type: GET_HATCH_QUESTIONS,
    hatchID
})

const getHatchQuestionsSuccess = questions => ({
    type: GET_HATCH_QUESTIONS_SUCCESS, 
    questions
})

const deleteCalendarQuestion = questionID => ({
    type: DELETE_CALENDAR_QUESTION,
    questionID
})

const deleteCalendarQuestionSuccess = question => ({
    type:DELETE_CALENDAR_QUESTION_SUCCESS,
    question
})

const getCalendarQuizzesList = () => ({
    type: GET_CALENDAR_QUIZZES_LIST
})

const getCalendarQuizzesListSuccess = quizzesList => ({
    type: GET_CALENDAR_QUIZZES_LIST_SUCCESS,
    quizzesList
})

const calendarQuestionCopy = (questionID, hatchID) => ({
    type: CALENDAR_QUESTION_COPY,
    questionID,
    hatchID
})

const calendarQuestionCopySuccess = question => ({
    type:CALENDAR_QUESTION_COPY_SUCCESS,
    question
})

const uploadCalendarQuestionCover = (questionID, localizationID, image) => ({
    type: UPLOAD_CALENDAR_QUESTION_COVER,
    localizationID,
    questionID,
    image
})

const uploadCalendarQuestionCoverSuccess = (question) => ({
    type: UPLOAD_CALENDAR_QUESTION_COVER_SUCCESS,
    question
})

const updateCalendarQuestion = (questionID, keyName, updateQuestionPiece) => ({
    type: UPDATE_CALENDAR_QUESTION,
    questionID,
    keyName,
    updateQuestionPiece
})

const updateCalendarQuestionSuccess = (updatedQuestionPiece) => ({
    type: UPDATE_CALENDAR_QUESTION_SUCCESS,
    updatedQuestionPiece
})

export {
    createCalendarQuestion,
    createCalendarQuestionSuccess,
    deleteCalendarQuestion,
    deleteCalendarQuestionSuccess,
    getCalendarQuizzesList,
    getCalendarQuizzesListSuccess,
    calendarQuestionCopy,
    calendarQuestionCopySuccess,
    uploadCalendarQuestionCover,
    uploadCalendarQuestionCoverSuccess,
    updateCalendarQuestion,
    updateCalendarQuestionSuccess,
    getHatchQuestions,
    getHatchQuestionsSuccess
}