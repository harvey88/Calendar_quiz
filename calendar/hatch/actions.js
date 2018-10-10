import {
    CREATE_HATCH,
    CREATE_HATCH_SUCCESS,
    UPDATE_HATCH,
    UPDATE_HATCH_SUCCESS,
    GET_HATCHES_SUCCESS
} from './constants'

const createHatch = (calendar_id, typeHatch) => ({
    type: CREATE_HATCH,
    calendar_id,
    typeHatch
})  

const createHatchSuccess = hatch => ({
    type: CREATE_HATCH_SUCCESS,
    hatch
})

const updateHatch = (calendar_id, hatchID, value) => ({
    type: UPDATE_HATCH,
    calendar_id,
    hatchID, 
    value
})

const updateHatchSuccess = hatch => ({
    type: UPDATE_HATCH_SUCCESS,
    hatch
})

const getHatchesSuccess = hatches => ({
    type: GET_HATCHES_SUCCESS,
    hatches
})

export {
    createHatch,
    createHatchSuccess,
    updateHatch,
    updateHatchSuccess,
    getHatchesSuccess
}