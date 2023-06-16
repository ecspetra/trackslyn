import React, {FC} from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";

type SignedInContentProps = {
    token: string;
    handleLogout: () => void;
}

const SignedInContent: FC<SignedInContentProps> = ({token, handleLogout, ...rest}) => {
    return (
        <div className="signed-in-content">
            <Header token={token} handleLogout={handleLogout} {...rest} />
            <Home {...rest} />
        </div>
    )
}

export default SignedInContent;