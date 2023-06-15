import React, { useContext } from "react";
import { ResultsContext } from "../Context/ResultsContext/ResultsContext";
import {PREMIUM_USER} from "../../constants/userInfo";
import "./assets/index.scss";

const UserInfo = () => {
    const {result} = useContext(ResultsContext);
    const isPremium = result.product === PREMIUM_USER;
    const isUserImageExists = result.images.length;
    const userName = result.display_name;
    const userNameShort = result.display_name.substring(0, 2);
    const userImage = result.images[0].url;

    return (
        <div className="user-info">
            {isUserImageExists ? (
                <img className="user-info__image" src={userImage} alt="" />
            ) : (
                <div className="user-info__circle">
                    <p className="user-info__name-short">{userNameShort}</p>
                </div>
            )}
            <div className="user-info__name-wrap">
                <p className="user-info__name">{userName}</p>
                {isPremium && <p className="user-info__premium">Premium</p>}
            </div>
        </div>
    )
}

export default UserInfo;