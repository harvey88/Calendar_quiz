import { ANSWERS_HATCH_ROUTE } from './constants'
import { TEXT_ANSWERS_HATCH_ROUTE } from './text/constants'
import { IMAGE_ANSWERS_HATCH_ROUTE } from './image/constants'
import { SCALE_ANSWERS_HATCH_ROUTE } from './scale/constants'
import { FREE_TEXT_ANSWERS_HATCH_ROUTE } from './freeText/constants'

import http from '../../../../utils/httpService'

const getRouteByQuestionType = type => {
    switch(type) {
        case 'text':
            return TEXT_ANSWERS_HATCH_ROUTE
        case 'image':
            return IMAGE_ANSWERS_HATCH_ROUTE
        case 'scale':
            return SCALE_ANSWERS_HATCH_ROUTE
        case 'free_text':
            return FREE_TEXT_ANSWERS_HATCH_ROUTE
        default:
            return ANSWERS_HATCH_ROUTE
    }
}


const requestAnswerCreation = (questionID, answer, localizationId, questionType) => {
    const answerBody = {
        question_localization_id: localizationId,
        ...answer
    } 

    const route = getRouteByQuestionType(questionType)
    const formData = new FormData();
    Object.keys(answerBody).forEach(key => formData.append(key, answerBody[key]));

    return http.request(route, 'POST', formData, true)
}

const requestAnswerUpdating = (questionID, answerId, answer, questionType) => {
    const answerBody = {
        question_localization_id: questionID,
        ...answer
    }

    const route = getRouteByQuestionType(questionType)
    return http.request(route + `/${answerId}`, 'PUT', answerBody)
}

const requestAnswerDeleting = (answerId, questionType) => {
    const route = getRouteByQuestionType(questionType)
    return http.request(route + `/${answerId}`, 'DELETE')
}

export { 
    requestAnswerCreation,
    requestAnswerUpdating,
    requestAnswerDeleting 
}