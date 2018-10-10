import {all, takeLatest, put, takeEvery} from 'redux-saga/effects'



import {
    CREATE_CALENDAR,
    GET_ALL_CALENDARS,
    GET_CALENDAR,
    GET_PLAYER_CALENDAR,
    UPDATE_CALENDAR
} from './constants'
import {
    requestCalendarCreation,
    requestAllCalendars,
    requestCalendar,
    requestUpdateCalendar,
    requestPlayerCalendar
} from './api'
import {
    createCalendarSuccess,
    getAllCalendarsSuccess,
    getCalendarSuccess,
    updateCalendarSuccess,
    getPlayerCalendarSuccess
} from './actions'
import { getHatchesSuccess } from './hatch/actions'

import { getPrizesSuccess } from './navigation/prizes/actions'

import watchSettings from 'data/calendar/settings/sagas'
import watchQuestions from './questions/sagas'
import watchRules from './navigation/rules/sagas'
import watchWinners from './navigation/winners/sagas'
import watchCalendarPlayers from './players/sagas'
import watchHatchAnswers from './questions/answers/sagas'

function* createCalendar(actionObj) {
    const calendar = yield requestCalendarCreation(actionObj.title, actionObj.lang)
    if(calendar){
        yield put( createCalendarSuccess(calendar) )
    }
}

function* getAllCalendars(actionObj) {
    const calendars = yield requestAllCalendars(actionObj.page)
    if(calendars) {
        yield put( getAllCalendarsSuccess(calendars) )
    }
}
function* getCalendar(actionObj) {
    const calendar = yield requestCalendar(actionObj.id)
    if(calendar) {
        yield put( getCalendarSuccess(calendar) )
        yield put( getHatchesSuccess(calendar.hatches) )
        yield put( getPrizesSuccess(calendar.prizes) )
    }
}

function* getPlayerCalendar(actionObj) {
    const playerCalendar = yield requestPlayerCalendar(actionObj.id)
    if(playerCalendar) {
        yield put( getPlayerCalendarSuccess(playerCalendar) )
    }
}

function* updateCalendar(actionObj) {
    const calendar = yield requestUpdateCalendar(actionObj.id, actionObj.value)
    if(calendar) {
        yield put( updateCalendarSuccess(calendar) )
    }
}

function* watchCalendar() {
    yield takeLatest(CREATE_CALENDAR, createCalendar)
    yield takeLatest(GET_ALL_CALENDARS, getAllCalendars)
    yield takeLatest(GET_CALENDAR, getCalendar)
    yield takeLatest(UPDATE_CALENDAR, updateCalendar)
    yield takeLatest(GET_PLAYER_CALENDAR, getPlayerCalendar)
}

function* calendarSaga(){
    yield all([
        watchCalendar(),
        watchSettings(),
        watchQuestions(),
        watchRules(),
        watchWinners(),
        watchCalendarPlayers(),
        watchHatchAnswers()
    ])
}

export default calendarSaga