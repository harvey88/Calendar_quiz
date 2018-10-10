import {fromJS, Map} from 'immutable'

import {
    GET_HATCH_QUESTIONS_SUCCESS,
    CREATE_CALENDAR_QUESTION_SUCCESS,
    DELETE_CALENDAR_QUESTION_SUCCESS,
    CALENDAR_QUESTION_COPY_SUCCESS,
    UPLOAD_CALENDAR_QUESTION_COVER_SUCCESS,
    UPDATE_CALENDAR_QUESTION_SUCCESS
} from './constants'

import {
    CREATE_HATCH_ANSWER_SUCCESS,
    UPDATE_HATCH_ANSWER_SUCCESS,
    DELETE_HATCH_ANSWER_SUCCESS
} from './answers/constants'

const initialQuestionsState = {}

const questionsReducer = (state = initialQuestionsState, action) => {
    switch (action.type) {
        case GET_HATCH_QUESTIONS_SUCCESS: {
            return {
                ...action.questions
            }
        }
        case CREATE_CALENDAR_QUESTION_SUCCESS: {
            // console.log('create question', action)
            const oldQuestions = Object.keys(state).map(i => state[i])
            const newQestionsList = [ ...oldQuestions, action.question ]
            return {...newQestionsList }
        }
        case DELETE_CALENDAR_QUESTION_SUCCESS: {
            return { ...action.question }
        }
        case CALENDAR_QUESTION_COPY_SUCCESS: {
            const oldQuestions = Object.keys(state).map(i => state[i])
            const newQuestionsList = [ ...oldQuestions, action.question ]
            return {...newQuestionsList }
        }
        case UPLOAD_CALENDAR_QUESTION_COVER_SUCCESS: {
            const oldQuestions = Object.keys(state).map(i => state[i])
            const questionIndex = oldQuestions.indexOf(oldQuestions.find(que => que.id === action.question.id))
            state[questionIndex] = action.question
            return { ...state }
        }
        case UPDATE_CALENDAR_QUESTION_SUCCESS: {
            const oldQuestions = Object.keys(state).map(i => state[i])
            const questionIndex = oldQuestions.indexOf(oldQuestions.find(que => que.id === action.updatedQuestionPiece.id))
            state[questionIndex] = action.updatedQuestionPiece
            return { ...state }
        }
        case CREATE_HATCH_ANSWER_SUCCESS: 
        case UPDATE_HATCH_ANSWER_SUCCESS:
        case DELETE_HATCH_ANSWER_SUCCESS: {
            const oldQuestions = Object.keys(state).map(i => state[i])
            const immutableQuestions = fromJS(oldQuestions)
            const indexOfQuestion = immutableQuestions.findIndex(
                question => question.get('id') == action.questionID
            )
            const updatedQuestion = immutableQuestions.setIn([indexOfQuestion, 'localization'], Map(action.question))
            return {...state, ...updatedQuestion.toJS()}
        }
        default:
            return state
    }
}

export { questionsReducer as questions }