import {
    QUESTIONS_ROUTE,
    QUIZZES_LIST_ROUTE,
    QUESTION_COPY_ROUTE,
    QUESTION_COVER_ROUTE,
    GET_HATCH_QUESTIONS_ROUTE
} from './constants'

import http from 'utils/httpService'

const requestCalendarQuestionCreation = (hatchID, questionType, questionText, langID) => {
    const questionBody = {
        hatch_id: hatchID,
        type: questionType,
        text: questionText,
        lang_id: langID
    }
    return http.request(QUESTIONS_ROUTE, 'POST', questionBody)
}

const requestDeleteCalendarQuestion = questionID => {
    const route = QUESTIONS_ROUTE + `/${questionID}`
    return http.request(route, 'DELETE')
}

const requestCalendarQuizzesList = () => {
    return http.request(QUIZZES_LIST_ROUTE, 'GET')
}

const requestCalendarQuestionCopy = (questionID, hatchID) => {
    const body = {
        hatch_id: hatchID
    }
    const route = QUESTION_COPY_ROUTE + `/${questionID}`
    return http.request(route, 'POST', body)
}

const requestQuestionCoverUpload = (questionID, localizationID, image) => {
    const route = QUESTION_COVER_ROUTE + `/${questionID}`
    const requestBody = new FormData()
    requestBody.append('image', image)
    requestBody.append('question_localization_id', localizationID)

    return http.request(route, 'POST', requestBody, true)
}

const requestGetHatchQuestions = (hatchID) => {
    const route = GET_HATCH_QUESTIONS_ROUTE + `/${hatchID}`

    return http.request(route, 'GET')
}

const requestCalendarQuestionUpdate = (questionID, questionPiece) => {
    const route = QUESTIONS_ROUTE + `/${questionID}`
    return http.request(route, 'PUT', questionPiece)
}

export {
    requestCalendarQuestionCreation,
    requestDeleteCalendarQuestion,
    requestCalendarQuizzesList,
    requestCalendarQuestionCopy,
    requestQuestionCoverUpload,
    requestCalendarQuestionUpdate,
    requestGetHatchQuestions
}
