import {api} from '../services/getApi'
import { AddTripAction, GetTripsAction, TripsActions } from "../types/store"


export const getTrips = async (): Promise<GetTripsAction> => {
    const favs = api();
    return {
        action: TripsActions.GET,
        payload: []
    }
}

export const addNewTrip = ({payload}: Pick<AddTripAction, "payload">): AddTripAction => {
    return {
        action: TripsActions.ADD,
        payload
    }
}