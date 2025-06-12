import React from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";


const PrivateRoute = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
  //   console.log(user);
  const location = useLocation();


  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
          <span className="loading loading-ring loading-xl"></span>
      </div>
  );
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;

};

export default PrivateRoute;