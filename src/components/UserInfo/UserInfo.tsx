import React, { useContext } from "react";
import { ResultsContext } from "../Context/ResultsContext/ResultsContext";

const UserInfo = () => {
    const {result} = useContext(ResultsContext);

    console.log(result)

    return (
        <div>
            {result.country}
            {result.display_name}
            {result.email}
            <>
                {Object.entries(result.followers).map(([key, value]) =>
                    <p key={key}>
                        <>
                            {key}: {value}
                        </>
                    </p>
                )}
            </>
        </div>
    )
}

export default UserInfo;