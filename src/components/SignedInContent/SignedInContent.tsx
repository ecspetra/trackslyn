import React, {FC} from "react";
import Header from "../Header/Header";
import {Route, Routes} from "react-router-dom";
import Home from "../Home/Home";

type SignedInContentProps = {
    token: string;
    handleLogout: () => void;
}

const SignedInContent: FC<SignedInContentProps> = ({token, handleLogout, ...rest}) => {
    return (
        <div className="signed-in-content">
            <Header token={token} handleLogout={handleLogout} {...rest} />
            <Routes>
                <Route path='/callback/' element={<Home {...rest} />} />
            </Routes>
        </div>
    )
}

export default SignedInContent;