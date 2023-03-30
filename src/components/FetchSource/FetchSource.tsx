import React, { useEffect, useState } from "react";
import { ResultsContext } from "../Context/ResultsContext/ResultsContext";
import useAccessToken from "../../hooks/useAccessToken";

const FetchSource = ({ children, linkToFetch }) => {
	const [isResultLoaded, setIsResultLoaded] = useState(false);
	const [result, setResult] = useState(null);
	const [fetchError, setFetchError] = useState(false);
	const [token] = useAccessToken();

	useEffect(() => {
		const handleFetchSource = async () => {
			await fetch(linkToFetch, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			}).then((data) => data.json())
				.then(async (data) => setResult(data))
				.catch((error) => setFetchError(error));
		}

		if (token && linkToFetch) handleFetchSource();
	}, [token, linkToFetch]);

	useEffect(() => {
		if (result || fetchError) {
			setIsResultLoaded(true);
		}
	}, [result]);

	if (fetchError) {
		return <div>Error</div>;
	} else if (isResultLoaded === false) return <div>Loading...</div>;

	return (
		<ResultsContext.Provider value={{result}}>
			{children}
		</ResultsContext.Provider>
	);
}

export default FetchSource;