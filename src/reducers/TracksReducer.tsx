import type { Action } from '../actions/actions';

export const initialState = {
	currentTrack: null,
	tracks: [],
};

export type Store = typeof initialState;

export const tracksReducer = (state: Store, action: Action) => {
	switch(action.type) {
		case 'ADD_TRACK':
			const isTrackAlreadyExistInState = state.tracks.find((item) => item.id === action.payload.track.id);
			if (isTrackAlreadyExistInState) {
				return state;
			} else {
				return {
					...state,
					tracks: [...state.tracks, action.payload],
				}
			}
		case 'SET_CURRENT_TRACK':
			return {
				...state,
				currentTrack: action.payload,
			}
		default:
			return state;
	}
}