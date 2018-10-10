import {
    CREATE_CALENDAR,
    CREATE_CALENDAR_SUCCESS,

    GET_ALL_CALENDARS,
    GET_ALL_CALENDARS_SUCCESS,
    
    GET_CALENDAR,
    GET_CALENDAR_SUCCESS,

    GET_PLAYER_CALENDAR,
    GET_PLAYER_CALENDAR_SUCCESS,

    UPDATE_CALENDAR,
    UPDATE_CALENDAR_SUCCESS
} from './constants'

const createCalendar = (title, lang) => ({
    type: CREATE_CALENDAR,
    title,
    lang
})

const createCalendarSuccess = calendar => ({
    type: CREATE_CALENDAR_SUCCESS,
    calendar
})

const getAllCalendars = page => ({
    type: GET_ALL_CALENDARS,
    page
})
const getAllCalendarsSuccess = calendars => ({
    type: GET_ALL_CALENDARS_SUCCESS,
    calendars
})

const getCalendar = id => ({
    type: GET_CALENDAR,
    id
})
const getCalendarSuccess = calendar => ({
    type: GET_CALENDAR_SUCCESS,
    calendar
})

const getPlayerCalendar = id => ({
    type: GET_PLAYER_CALENDAR,
    id
})
const getPlayerCalendarSuccess = playerCalendar => ({
    type: GET_PLAYER_CALENDAR_SUCCESS,
    playerCalendar
})
const updateCalendar = (id, value) => ({
    type: UPDATE_CALENDAR,
    id,
    value
})
const updateCalendarSuccess = calendar => ({
    type: UPDATE_CALENDAR_SUCCESS,
    calendar
})

export {
    createCalendar,
    createCalendarSuccess,
    getAllCalendars,
    getAllCalendarsSuccess,
    getCalendar,
    getCalendarSuccess,
    updateCalendar,
    updateCalendarSuccess,
    getPlayerCalendar,
    getPlayerCalendarSuccess
}