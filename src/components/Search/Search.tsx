import React, {useEffect, useRef, useState} from "react";
import {LINK_TO_SEARCH} from "../../constants/linksToFetch";
import FetchSource from "../FetchSource/FetchSource";
import SearchResults from "../SearchResults/SearchResults";
import "./assets/index.scss";
import Button from "../Button/Button";
import Close from "../../images/icons/Close";

const Search = () => {
	const searchRef = useRef(null);
	const buttonRef = useRef(null);
	const [query, setQuery] = useState<string>("");
	const [isShowCloseButton, setIsShowCloseButton] = useState<boolean>(false);
	const LINK_TO_SEARCH_TRACKS = `${LINK_TO_SEARCH}${query}&type=track`;

	const handleSearchQuery = (event) => {
		setQuery(event.target.value);

		if (event.target.value === "") {
			setIsShowCloseButton(false);
		} else setIsShowCloseButton(true);
	}

	const handleCleanQuery = () => {
		setQuery("");
		setIsShowCloseButton(false);
	}

	useEffect(() => {
		function handleClickOutside(event) {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setQuery("");
				setIsShowCloseButton(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [searchRef]);

	return (
		<div ref={searchRef} className="search">
			<input onChange={handleSearchQuery} placeholder="Search..." value={query} />
			{isShowCloseButton && <Button buttonRef={buttonRef} className="search__close-button" handleButtonOnClick={handleCleanQuery}><Close /></Button>}
			{query !== "" && (
				<FetchSource linkToFetch={LINK_TO_SEARCH_TRACKS}>
					<SearchResults />
				</FetchSource>
			)}
		</div>
	);
};

export default Search;