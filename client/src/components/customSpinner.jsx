import React from "react";
import { Spinner } from "react-bootstrap";

const CustomSpinner = () => {
	return (
		<Spinner
			style={{
				position: "absolute",
				top: "0",
				left: "0",
				right: "0",
				bottom: "0",
				margin: "auto",
			}}
			animation="border"
			variant="warning"
		/>
	);
};

export default CustomSpinner;
