import {
    GET_CALENDAR_PLAYERS_SUCCESS
} from './constants'

const initialPlayersState = []

const calendarPlayersReducer = (state = initialPlayersState, action) => {
    switch (action.type) {
        case GET_CALENDAR_PLAYERS_SUCCESS:
            return {...state, ...action.players }
        default:
            return state
    }
}

export{ calendarPlayersReducer as calendarPlayers }