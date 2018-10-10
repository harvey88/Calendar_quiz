import {
    CALENDAR_PLAYERS_ROUTE
} from './constants'
import http from '../../../utils/httpService'

const requestCalendarPlayers = calendarID => {
    const route = CALENDAR_PLAYERS_ROUTE + `/${calendarID}`
    return http.request(route, 'GET')
} 
export {
    requestCalendarPlayers
}