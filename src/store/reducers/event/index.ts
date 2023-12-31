import { EventActionEnum, EventState } from "./types"


const initialState: EventState = {
    guests: [],
    events: []
}

export default function eventReducer(state = initialState, action: any): EventState {
    switch(action.type) {
        case EventActionEnum.SET_GUESTS: {
            return {
                ...state,
                guests: action.payload
            }
        }
        case EventActionEnum.SET_EVENT: {
            return {
                ...state,
                events: action.payload
            }
        }
        default: {
            return state
        }
    }
}