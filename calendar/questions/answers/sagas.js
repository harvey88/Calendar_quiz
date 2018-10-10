import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import { 
    CREATE_HATCH_ANSWER, 
    UPDATE_HATCH_ANSWER, 
    DELETE_HATCH_ANSWER 
} from './constants'
import {
    createAnswerSuccess,
    updateAnswerSuccess,
    deleteAnswerSuccess
} from './actions'

import {
    requestAnswerCreation,
    requestAnswerUpdating,
    requestAnswerDeleting 
} from './api' 

function* createAnswer(actionObj) {
    const updatedQuestion = yield requestAnswerCreation(actionObj.questionID, actionObj.answer, actionObj.localizationId, actionObj.questionType)
    
    if(updatedQuestion) {
        yield put ( createAnswerSuccess(actionObj.questionID, updatedQuestion) )
    }
}

function* updateAnswer(actionObj){
    const updatedQuestion = yield requestAnswerUpdating(actionObj.questionID, actionObj.answerId, actionObj.answer, actionObj.questionType)
    if(updatedQuestion) {
        yield put( updateAnswerSuccess(actionObj.questionID, updatedQuestion))
    }
}

function* deleteAnswer(actionObj){
    const updatedQuestion = yield requestAnswerDeleting(actionObj.answerId, actionObj.questionType)
    if(updatedQuestion) {
        yield put( deleteAnswerSuccess(actionObj.questionID, updatedQuestion))
    }
}

function* watchHatchAnswers() {
    yield takeEvery(CREATE_HATCH_ANSWER, createAnswer)
    yield takeLatest(UPDATE_HATCH_ANSWER, updateAnswer)
    yield takeLatest(DELETE_HATCH_ANSWER, deleteAnswer)
}

export default watchHatchAnswers