import React, { FC, ReactNode } from "react";
import classNames from "classnames";

import './assets/index.scss';

type ButtonProps = {
    handleButtonOnClick: () => void;
    className?: string;
    children?: ReactNode;
    buttonRef?: React.RefObject<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ handleButtonOnClick, className, children, buttonRef }) => {
    return (
        <button ref={buttonRef} className={classNames('generic-button', className)} onClick={() => handleButtonOnClick()}><span className="generic-button__content">{children}</span></button>
    )
}

export default Button;