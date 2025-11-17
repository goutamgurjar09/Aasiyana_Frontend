import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // or from redux

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    // Redirect user to their correct dashboard if trying to access others
    if (user.role === "superAdmin") return <Navigate to="/super/dashboard" replace />;
    if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "seller") return <Navigate to="/seller/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  // Allow nested routes
  return children || <Outlet />;
};

export default ProtectedRoute;


// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const user = JSON.parse(localStorage.getItem("user")); // get user from localStorage
//   if (!user) {
//     // if not logged in, redirect to login
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles.length && !allowedRoles.includes(user.role)) {
//     // if role is not allowed, redirect to home or some "Not Authorized" page
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
