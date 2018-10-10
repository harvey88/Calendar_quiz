import {
    CALENDAR_ROUTE,
    CALENDAR_PLAYER_ROUTE
} from './constants'
import http from '../../utils/httpService'

const requestCalendarCreation = (title, lang) => {
    return http.request(CALENDAR_ROUTE, 'POST', {title, lang_id: lang})
}

const requestAllCalendars = page => {
    const route = CALENDAR_ROUTE + `?page=${page}`
    return http.request(route, 'GET')
}

const requestCalendar = calendarID => {
    const route = CALENDAR_ROUTE + `/${calendarID}`
    return http.request(route, 'GET')
}

const requestPlayerCalendar = calendarID => {
    const route = CALENDAR_PLAYER_ROUTE + `/${calendarID}`
    return http.request(route, 'GET')
}

const requestUpdateCalendar = (calendarID, object) => {
    const route = CALENDAR_ROUTE + `/${calendarID}`
    return http.request(route, 'PUT', object)
}

export {
    requestCalendarCreation,
    requestAllCalendars,
    requestCalendar,
    requestUpdateCalendar,
    requestPlayerCalendar
}