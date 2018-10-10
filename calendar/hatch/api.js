import {
    CALENDAR_HATCH_ROUTE
} from './constants'
import http from '../../../utils/httpService'

const requestCreateHatch = data => {
    const body = {
        ...data
    }
    return http.request(CALENDAR_HATCH_ROUTE, 'POST', body)
}

const requestUpdateHatch = (id, data) => {
    const route = CALENDAR_HATCH_ROUTE + `/${id}`
    const body = {
        ...data
    }
    return http.request(route, 'PUT', body)

}

export {
    requestCreateHatch,
    requestUpdateHatch
}