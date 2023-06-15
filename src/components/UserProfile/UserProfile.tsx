import React from "react";
import FetchSource from "../FetchSource/FetchSource";
import { LINK_TO_FETCH_MY_PROFILE } from "../../constants/linksToFetch";
import UserInfo from "../UserInfo/UserInfo";

const UserProfile = () => {
	return (
		<FetchSource linkToFetch={LINK_TO_FETCH_MY_PROFILE}>
			<UserInfo />
		</FetchSource>
	);
};

export default UserProfile;