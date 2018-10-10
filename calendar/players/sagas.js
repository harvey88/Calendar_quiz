import { all, takeLatest, put } from 'redux-saga/effects'
import {
    GET_CALENDAR_PLAYERS
} from './constants'
import {
    requestCalendarPlayers
} from './api'
import {
    getCalendarPlayersSuccess
} from './actions'

function* getCalendarPlayers(obj) {
    const players = yield requestCalendarPlayers(obj.id)
    if(players) {
        yield put( getCalendarPlayersSuccess(players) )
    }
}

function* watchCalendarPlayers() {
    yield takeLatest(GET_CALENDAR_PLAYERS, getCalendarPlayers)
}

/*function* playersSaga() {
    yield all([
        watchCalendarPlayers()
    ])
}*/

export default watchCalendarPlayers