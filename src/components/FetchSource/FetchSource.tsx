// import React, { useEffect, useState } from "react";
// import { ResultsContext } from "../Context/ResultsContext/ResultsContext";
// import useAccessToken from "../../hooks/useAccessToken";
//
// type Result = {
// 	next: string,
// }
//
// const FetchSource = ({ children, linkToFetch }) => {
// 	const [isResultLoaded, setIsResultLoaded] = useState(false);
// 	const [result, setResult] = useState<Result>(null);
// 	const [nextResult, setNextResult] = useState(linkToFetch);
// 	const [fetchError, setFetchError] = useState(false);
// 	const [token] = useAccessToken();
//
// 	const handleSetNextResult = () => {
// 		setNextResult(result.next);
// 	}
//
// 	const childrenWithProps = React.Children.map(children, (child) => {
// 		return React.cloneElement(child, {handleSetNextResult: handleSetNextResult});
// 	});
//
// 	useEffect(() => {
// 		const handleFetchSource = async () => {
// 			await fetch(nextResult, {
// 				headers: {
// 					'Authorization': `Bearer ${token}`
// 				}
// 			}).then((data) => data.json())
// 				.then(async (data: Result[]) => {
// 					setResult(data);
// 				}).catch((error) => setFetchError(error));
// 		}
//
// 		if (token && nextResult) handleFetchSource();
// 	}, [token, nextResult]);
//
// 	useEffect(() => {
// 		if (result.length !== 0 || fetchError) {
// 			if (!result.next) setNextResult(false);
// 			setIsResultLoaded(true);
// 		}
// 	}, [result]);
//
// 	if (fetchError) {
// 		return <div>Error</div>;
// 	} else if (isResultLoaded === false) return <div>Loading...</div>;
//
// 	return (
// 		<ResultsContext.Provider value={result}>
// 			{childrenWithProps}
// 		</ResultsContext.Provider>
// 	);
// }
//
// export default FetchSource;