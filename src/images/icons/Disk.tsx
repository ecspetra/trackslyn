import * as React from "react";

const Disk = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        width={24}
        height={24}
        viewBox="0 0 24 24"
    >
        <defs>
            <style>
                {
                    ".cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
                }
            </style>
        </defs>
        <title>{"4.cd"}</title>
        <g id="_4.cd" data-name="4.cd">
            <circle cx={12} cy={12} r={11} className="cls-1" />
            <circle cx={12} cy={12} r={3} className="cls-1" />
        </g>
    </svg>
);

export default Disk;
