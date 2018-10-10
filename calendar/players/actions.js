import {
    GET_CALENDAR_PLAYERS,
    GET_CALENDAR_PLAYERS_SUCCESS
} from './constants'

const getCalendarPlayers = id => ({
    type: GET_CALENDAR_PLAYERS,
    id
})
const getCalendarPlayersSuccess = players => ({
    type: GET_CALENDAR_PLAYERS_SUCCESS,
    players
})

export {
    getCalendarPlayers,
    getCalendarPlayersSuccess
}