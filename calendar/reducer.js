import {
    CREATE_CALENDAR_SUCCESS,
    GET_ALL_CALENDARS_SUCCESS,
    GET_CALENDAR_SUCCESS,
    UPDATE_CALENDAR_SUCCESS,
    GET_PLAYER_CALENDAR_SUCCESS
} from './constants'
import {
    UPDATE_CALENDAR_SETTINGS_SUCCESS,
    UPDATE_CALENDAR_REGISTRATION_SETTINGS_SUCCESS
} from './settings/constants'
import {
    // CREATE_CALENDAR_QUESTION_SUCCESS,
    // DELETE_CALENDAR_QUESTION_SUCCESS,
    GET_CALENDAR_QUIZZES_LIST_SUCCESS,
    // CALENDAR_QUESTION_COPY_SUCCESS,
    // UPLOAD_CALENDAR_QUESTION_COVER_SUCCESS
} from './questions/constants'

import { UPDATE_CALENDAR_RULES_SUCCESS } from './navigation/rules/constants'
import { UPDATE_CALENDAR_WINNERS_SUCCESS } from './navigation/winners/constants'

const initialCalendarsState = {
    data: {}
}

const calendarsReducer = (state = initialCalendarsState, action) => {
    switch (action.type) {
        case CREATE_CALENDAR_SUCCESS: {
            const newState = {...state}
            const newCalndar = {[action.calendar.id]: action.calendar}

            return {...newState, data: {...newState.data, ...newCalndar}}
        }            
        case GET_ALL_CALENDARS_SUCCESS: {
            const newState = {...state}
            const calendars = action.calendars
            if (!Object.keys(calendars.data).length) {
                return newState
            }
            const calendarsObj = {}
            Object.values(calendars.data).map(item => calendarsObj[item.id] = item)
            return {
                ...newState,
                data: {...newState.data, ...calendarsObj},
                perPage:
                    calendars.current_page + 1 === calendars.last_page
                        ? calendars.total - calendars.to
                        : calendars.per_page,
                currentPage: calendars.current_page,
                lastPage: calendars.last_page
            }
        }
            
    default:
        return state
    }
}

const initialCalendarState = {
    quizzes_list: []
}

const calendarReducer = (state = initialCalendarState, action) => {
    switch (action.type) {
        case GET_CALENDAR_SUCCESS:
        case UPDATE_CALENDAR_SUCCESS:
        case UPDATE_CALENDAR_REGISTRATION_SETTINGS_SUCCESS: {
            return { ...state, ...action.calendar }
        }
        case GET_PLAYER_CALENDAR_SUCCESS: {
            return { ...state, ...action.playerCalendar }
        }
        case UPDATE_CALENDAR_SETTINGS_SUCCESS: {
            return { ...state, settings: action.settings }
        }
        case GET_CALENDAR_QUIZZES_LIST_SUCCESS: {
            return {...state, quizzes_list: action.quizzesList}
        }
        case UPDATE_CALENDAR_RULES_SUCCESS: {
            return { ...state, rules: action.rules }
        }
        case UPDATE_CALENDAR_WINNERS_SUCCESS: {
            return { ...state, rules: action.winners }
        }

        default:
            return state
    }
}

export { calendarsReducer as calendars, calendarReducer as calendar }