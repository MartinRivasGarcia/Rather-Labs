import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ isSignedIn, children }) => {
  
  if (!isSignedIn) {
    // user is not authenticated
    return <Navigate to="/" replace/>;
  }
  return children;
};

export default ProtectedRoute;