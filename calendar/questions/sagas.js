import { takeEvery, takeLatest, put } from 'redux-saga/effects'

import { 
    CREATE_CALENDAR_QUESTION,
    DELETE_CALENDAR_QUESTION,
    GET_CALENDAR_QUIZZES_LIST,
    CALENDAR_QUESTION_COPY,
    UPLOAD_CALENDAR_QUESTION_COVER,
    UPDATE_CALENDAR_QUESTION,
    GET_HATCH_QUESTIONS
} from './constants'

import {
    requestCalendarQuestionCreation,
    requestDeleteCalendarQuestion,
    requestCalendarQuizzesList,
    requestCalendarQuestionCopy,
    requestQuestionCoverUpload,
    requestCalendarQuestionUpdate,
    requestGetHatchQuestions
} from './api'

import {
    createCalendarQuestionSuccess,
    deleteCalendarQuestionSuccess,
    getCalendarQuizzesListSuccess,
    calendarQuestionCopySuccess,
    uploadCalendarQuestionCoverSuccess,
    updateCalendarQuestionSuccess,
    getHatchQuestionsSuccess
} from './actions'


function* getHatchQuestions(actionObj) {
    const hatchQuestions = yield requestGetHatchQuestions(actionObj.hatchID)
    if (hatchQuestions) {
        yield put(getHatchQuestionsSuccess(hatchQuestions))
    }
}

function* createCalendarQuestion(actionObj) {
    const newQuestion = yield requestCalendarQuestionCreation(actionObj.hatchID, actionObj.questionType, actionObj.questionText, actionObj.langID)

    if(newQuestion) {
        yield put(createCalendarQuestionSuccess(newQuestion))
    }
}

function* deleteCalendarQuestion(actionObj) {
    const updatedQuestion = yield requestDeleteCalendarQuestion(actionObj.questionID)

    if(updatedQuestion) {
        yield put(deleteCalendarQuestionSuccess(updatedQuestion))
    }
}

function* getCalendarQuizzesList() {
    const quizzesList = yield requestCalendarQuizzesList()

    if (quizzesList) {
        yield put(getCalendarQuizzesListSuccess(quizzesList))
    }
}

function* calendarQuestionCopy(actionObj) {
    const addQuestion = yield requestCalendarQuestionCopy(actionObj.questionID, actionObj.hatchID)

    if(addQuestion) {
        yield put(calendarQuestionCopySuccess(addQuestion))
    }
}

function* uploadQuestionCover(actionObj) {
    const updatedQuestion = yield requestQuestionCoverUpload(actionObj.questionID, actionObj.localizationID, actionObj.image)
    if (updatedQuestion) {
        yield put(uploadCalendarQuestionCoverSuccess(updatedQuestion))
    }
}

function* updateCalendarQuestion(actionObj) {
    const requestObj = {
        [actionObj.keyName]: actionObj.updateQuestionPiece
    }
    const updateData = yield requestCalendarQuestionUpdate(actionObj.questionID, requestObj)
    if (updateData) {
        yield put(updateCalendarQuestionSuccess(updateData))
    }
}

function* watchQuestions() {
    yield takeEvery(CREATE_CALENDAR_QUESTION, createCalendarQuestion)
    yield takeEvery(UPLOAD_CALENDAR_QUESTION_COVER, uploadQuestionCover)
    yield takeEvery(UPDATE_CALENDAR_QUESTION, updateCalendarQuestion)
    yield takeEvery(DELETE_CALENDAR_QUESTION, deleteCalendarQuestion)
    yield takeEvery(GET_CALENDAR_QUIZZES_LIST, getCalendarQuizzesList)
    yield takeEvery(CALENDAR_QUESTION_COPY, calendarQuestionCopy)
    yield takeEvery(GET_HATCH_QUESTIONS, getHatchQuestions)
}

export default watchQuestions