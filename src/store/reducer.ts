import { Actions, AppState, TripsActions,  } from "../types/store";

export const reducer = (currentAction: Actions, currentState: AppState): AppState => {
    const { action, payload } = currentAction; 

    switch (action) {
            
        case TripsActions.ADD:
            return {
                ...currentState,
                favorites: [
                    payload,
                    ...currentState.favorites,
                ]
            }
        
        case TripsActions.GET:
            return {
                ...currentState,
                favorites: payload
            }

    
        default:
            return currentState;
    }
}