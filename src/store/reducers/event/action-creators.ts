import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventActionEnum, SetEventAction, SetGuestsAction } from "./types";


export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload: payload}),
    setEvent: (payload: IEvent[]): SetEventAction => ({type: EventActionEnum.SET_EVENT, payload: payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(response.data))
        } catch (e) {

        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            dispatch(EventActionCreators.setEvent(json));
            localStorage.setItem('events', JSON.stringify(json))
        }   catch(e) {
            console.log(e)
        }
    },
    fetchEvents: (userName: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[];
            const currentUserName = json.filter(ev => ev.author === userName || ev.guest === userName);
            dispatch(EventActionCreators.setEvent(currentUserName));
        } catch (e) {
            console.log(e)
        }
    }
}