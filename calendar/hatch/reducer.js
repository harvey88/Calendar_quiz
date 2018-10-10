import {
    CREATE_HATCH_SUCCESS,
    GET_HATCHES_SUCCESS,
    UPDATE_HATCH_SUCCESS
} from './constants'

const initialHatchesState = {}

const hatchesReducer = (state = initialHatchesState, action) => {
    switch (action.type) {
        case GET_HATCHES_SUCCESS: {
            return {
                ...state, ...action.hatches
            }
        }
        case CREATE_HATCH_SUCCESS:{
            const oldHatches = Object.keys(state).map(i => {
                let oldState = { ...state[i], last:false }
                return oldState
            })
            const newHatches = { ... action.hatch, last: true }
            const newHatchesList = [ ...oldHatches, newHatches ]
            return {...newHatchesList, }
        }
        case UPDATE_HATCH_SUCCESS: {
            return {
                ...state, ...action.hatch
            }
        }
        default:
            return state
    }
}

export { hatchesReducer as hatches }