export const addTrack = (track: { id: string, album: { name: string, images: [{ [key: string]: any }] }, name: string, artists: [] }): {
	type: 'ADD_TRACK',
	payload: {
		track: {
			id: string,
			album: {
				name: string,
				images: [{ [key: string]: any }],
			},
			name: string,
			artists: [],
		}
	};
} => ({
	type: "ADD_TRACK",
	payload: {
		track: {
			id: track.id,
			album: track.album,
			name: track.name,
			artists: track.artists,
		}
	}
});

export const setCurrentTrack = (track: { id: string, album: { name: string, images: [{ [key: string]: any }] }, name: string, artists: [] }): {
	type: 'SET_CURRENT_TRACK',
	payload: {
		track: {
			id: string,
			album: {
				name: string,
				images: [{ [key: string]: any }],
			},
			name: string,
			artists: [],
		}
	};
} => ({
	type: "SET_CURRENT_TRACK",
	payload: {
		track: {
			id: track.id,
			album: track.album,
			name: track.name,
			artists: track.artists,
		}
	}
});

export type Action =
	| ReturnType<typeof addTrack>
	| ReturnType<typeof setCurrentTrack>;