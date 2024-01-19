import React, { FC, useEffect, useState } from "react";
import { createContext, useReducer } from 'react';
import { initialState, Store, tracksReducer } from "../../../reducers/TracksReducer";
import { Action, addTrack } from "../../../actions";
import Button from "../../Button/Button";
import Logo from "../../Logo/Logo";

type TracksContextType = {
	state: Store;
	dispatch: React.Dispatch<Action>;
};

export const TracksContext = createContext<TracksContextType>({} as TracksContextType);

type TracksContextProviderProps = {
	token: string;
	linkToFetch: string;
	handleLogout: () => void;
	children: JSX.Element|JSX.Element[];
}

export const TracksContextProvider: FC<TracksContextProviderProps> = ({ token, linkToFetch, handleLogout, children }) => {
	const [isResultLoaded, setIsResultLoaded] = useState(false);
	const [currentResult, setCurrentResult] = useState<string>(linkToFetch);
	const [nextResult, setNextResult] = useState<string>(null);
	const [fetchError, setFetchError] = useState(false);

	const [state, dispatch] = useReducer<React.Reducer<Store, Action>>(
		tracksReducer,
		initialState
	);

	const handleSetNextResult = () => {
		setCurrentResult(nextResult);
	}

	const childrenWithProps = React.Children.map(children, (child) => (
		React.cloneElement(child, {
			handleSetNextResult: handleSetNextResult,
			isResultLoaded: isResultLoaded
		})
	));

	useEffect(() => {
		setIsResultLoaded(false);

		const handleFetchSource = async () => {
			await fetch(currentResult, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			}).then((data) => data.json())
				.then(async (data) => {
					data.items.map((item) => dispatch(addTrack(item.track)));
					setNextResult(data.next);
				}).catch((error) => setFetchError(error));

			setIsResultLoaded(true);
		}

		if (token && currentResult) handleFetchSource();
	}, [token, currentResult]);

	useEffect(() => {
		if (state.tracks.length !== 0 || fetchError) {
			if (!nextResult) setNextResult(null);
			setIsResultLoaded(true);
		}
	}, [state, fetchError]);

	if (fetchError) {
		return (
			<div className="app__auth">
				<Logo />
				<p className="app__text">Something went wrong. Please try again</p>
				<Button className="app__auth-link" handleButtonOnClick={handleLogout}>Try again</Button>
			</div>
		);
	}

	return (
		<TracksContext.Provider value={{state, dispatch}}>
			{childrenWithProps}
		</TracksContext.Provider>
	);
}