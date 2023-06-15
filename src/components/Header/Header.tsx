import React, { FC } from "react";
import Search from "../Search/Search";
import Logo from "../Logo/Logo";
import UserProfile from "../UserProfile/UserProfile";

import './assets/index.scss';
import Button from "../Button/Button";

type HeaderProps = {
    token: string;
    handleLogout: () => void;
}

const Header: FC<HeaderProps> = ({ token, handleLogout, ...rest }) => {
    return (
        <div className="header">
            <div className="header__content">
                <Logo />
                <Search {...rest} />
                <div className="header__user-wrap">
                    <UserProfile />
                    <Button className="header__logout-button" handleButtonOnClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default Header;