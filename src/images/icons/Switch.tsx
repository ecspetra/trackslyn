import * as React from "react"

const Switch = (props) => (
    <svg
		xmlns="http://www.w3.org/2000/svg"
		width={800}
		height={800}
		fill="none"
		viewBox="0 0 20 20"
		{...props}
	>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M2.293 15.293a1 1 0 1 0 1.414 1.414l6-6a1 1 0 0 0 0-1.414l-6-6a1 1 0 0 0-1.414 1.414L7.586 10l-5.293 5.293zm8 0a1 1 0 1 0 1.414 1.414l6-6a1 1 0 0 0 0-1.414l-6-6a1 1 0 1 0-1.414 1.414L15.586 10l-5.293 5.293z"
		/>
	</svg>
)

export default Switch;
