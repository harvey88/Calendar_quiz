import {all, takeLatest, put, takeEvery} from 'redux-saga/effects'

import {
    CREATE_HATCH,
    UPDATE_HATCH
} from './constants'

import {
    requestCreateHatch,
    requestUpdateHatch
} from './api'

import {
    createHatchSuccess,
    updateHatchSuccess,
} from './actions'

function* createHatch(actionObj) {
    const requestHatch = {
        calendar_id: actionObj.calendar_id,
        type: actionObj.typeHatch
    }
    const hatch = yield requestCreateHatch(requestHatch)
    if(hatch) {
        yield put (createHatchSuccess(hatch))
    }
}

function* updateHatch(actionObj) {
    const dataHatch = {
        calendar_id: actionObj.calendar_id,
        ...actionObj.value
    }
    const newHatch = yield requestUpdateHatch(actionObj.hatchID, dataHatch)
    if (newHatch) {
        yield put(updateHatchSuccess(newHatch))
    }
}

function* watchCalendarHatch() {
    yield takeLatest(CREATE_HATCH, createHatch)
    yield takeLatest(UPDATE_HATCH, updateHatch)
}

export default watchCalendarHatch