// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const PublicLayout = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main content */}
//       <main className="flex-grow">
//         <Outlet />
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default PublicLayout;












import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = () => {
  const location = useLocation();

  // Pages jahan Navbar & Footer hide karna hai
  const hideLayoutRoutes = ["/login", "/signup", "/forgetPassword"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <Outlet />

      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default PublicLayout;
