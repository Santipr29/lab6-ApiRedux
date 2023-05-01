import { Fav } from "./favorites"

export type Observer = ({ render: () => void } & HTMLElement);

export type AppState = {
    favorites: Fav[]
}

export enum TripsActions {
    "ADD" = "ADD",
    "GET" = "GET",
}

export interface AddTripAction {
    action: TripsActions.ADD,
    payload: Fav
}

export interface GetTripsAction {
    action: TripsActions.GET,
    payload: Fav[]
}

export type Actions = AddTripAction | GetTripsAction;