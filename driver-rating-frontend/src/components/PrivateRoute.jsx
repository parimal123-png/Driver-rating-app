import { Navigate } from "react-router-dom";

// 🔹 Check if the user is authenticated (modify this logic as needed)
const isAuthenticated = () => {
  return !!localStorage.getItem("userToken"); // Example: Checking if user token exists
};

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
