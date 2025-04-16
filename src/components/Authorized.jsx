import { Navigate } from "react-router-dom";

const Authorized = ({ element }) => {
	// Check if the user is logged in.
	const userToken = localStorage.getItem("userToken");

	// Return to login if user is not logged in.
	if (!userToken) {
		return <Navigate to={"/login"} replace />;
	}

	// Go to the page the user wants to if logged in.
	return element;
};

export default Authorized;
