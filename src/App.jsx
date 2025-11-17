import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Layouts
import AdminLayout from "./Pages/Layout/AdminLayout";
import PublicLayout from "./Pages/Layout/PublicLayout";
import ScrollToTop from "./Pages/Layout/ScrollToTop";

// Protected route
import ProtectedRoute from "./Protected/ProtectedRoute";

// Public Pages
import { LandingPage } from "./Pages/HomePage/LandingPage";
import Contact from "./Pages/HomePage/Contact";
import AboutUs from "./Pages/Components/AboutUs";
import LoginPage from "./Buyer/LoginPage";
import SignupPage from "./Buyer/SignupPage";
import ForgotPassword from "./Pages/Components/ForgotPassword";
import PropertyDetails from "./Pages/Components/PropertyDetails";
import BookingPage from "./Pages/Components/BookingPage";
import PrivacyPolicy from "./Pages/Components/PrivacyPolicy";
import TermsAndConditions from "./Pages/Components/TermsAndConditions";
import PropertyList from "./Buyer/PropertyList";

// Super Admin Pages
import Dashboard from "./SuperAdmin/Dashboard";
import PropertyForm from "./SuperAdmin/PropertyForm";
import UserManagement from "./SuperAdmin/UserManagement";
import { Properties } from "./SuperAdmin/Properties";
import Booking from "./SuperAdmin/Bookings";
import Enquiries from "./SuperAdmin/Enquiries";
import AdminProfile from "./SuperAdmin/Profile";

// Admin Pages
import { AdminProperties } from "./Admin/AdminProperties";
import  SellerAdminDashboard  from "./Seller/SellerAdminDashboard";

// Seller Pages
import { SellerProperties } from "./Seller/SellerProperties";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/login"
            element={
              <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <LoginPage />
              </GoogleOAuthProvider>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/propertyDetails/:id" element={<PropertyDetails />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
        </Route>

        {/* ---------- PROTECTED ROUTES ---------- */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["superAdmin", "admin", "seller"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Super Admin Routes */}
          <Route path="/super/dashboard" element={<Dashboard />} />
          <Route path="/super/add-property" element={<PropertyForm />} />
          <Route path="/super/property/edit/:id" element={<PropertyForm />} />
          <Route path="/super/users" element={<UserManagement />} />
          <Route path="/super/properties" element={<Properties />} />
          <Route path="/super/bookings" element={<Booking />} />
          <Route path="/super/enquiries" element={<Enquiries />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<SellerAdminDashboard />} />
          <Route path="/admin/add-property" element={<PropertyForm />} />
          <Route path="/admin/property/edit/:id" element={<PropertyForm />} />
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route path="/admin/bookings" element={<Booking />} />
          <Route path="/admin/enquiries" element={<Enquiries />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          {/* Seller Routes */}
          <Route path="/seller/dashboard" element={<SellerAdminDashboard />} />
          <Route path="/seller/add-property" element={<PropertyForm />} />
          <Route path="/seller/property/edit/:id" element={<PropertyForm />} />
          <Route path="/seller/properties" element={<SellerProperties />} />
          <Route path="/seller/bookings" element={<Booking />} />
          <Route path="/seller/enquiries" element={<Enquiries />} />

          {/* Common for all logged-in roles */}
          {/* <Route path="/profile" element={<AdminProfile />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// // Pages
// import Contact from "./Pages/HomePage/Contact";
// import LoginPage from "./Buyer/LoginPage";
// import SignupPage from "./Buyer/SignupPage";
// import PropertyDetails from "./Pages/Components/PropertyDetails";
// import Dashboard from "./SuperAdmin/Dashboard";
// import BookingPage from "./Pages/Components/BookingPage";
// import ForgotPassword from "./Pages/Components/ForgotPassword";
// import AboutUs from "./Pages/Components/AboutUs";
// import PropertyForm from "./SuperAdmin/PropertyForm";
// import UserManagement from "./SuperAdmin/UserManagement";
// import { Properties } from "./SuperAdmin/Properties";
// import Booking from "./SuperAdmin/Bookings";
// import  PropertyList  from "./Buyer/PropertyList";
// import Enquiries from "./SuperAdmin/Enquiries";
// import AdminProfile from "./SuperAdmin/Profile";
// import PrivacyPolicy from "./Pages/Components/PrivacyPolicy";
// import TermsAndConditions from "./Pages/Components/TermsAndConditions";
// import { LandingPage } from "./Pages/HomePage/LandingPage";
// import AdminLayout from "./Pages/Layout/AdminLayout";
// import PublicLayout from "./Pages/Layout/PublicLayout";
// import ScrollToTop from "./Pages/Layout/ScrollToTop";
// import ProtectedRoute from "./Protected/ProtectedRoute";
// import { SellerProperties } from "./Seller/SellerProperties";
// import { AdminProperties } from "./Admin/AdminProperties";
// import { SellerAdminDashboard } from "./Seller/SellerAdminDashboard";
// function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <Routes>
//         {/* Public Routes */}
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/properties" element={<PropertyList />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route
//             path="/login"
//             element={
//               <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//                 <LoginPage />
//               </GoogleOAuthProvider>
//             }
//           />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/forgetPassword" element={<ForgotPassword />} />
//           <Route path="/propertyDetails/:id" element={<PropertyDetails />} />
//           <Route path="/booking" element={<BookingPage />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms-conditions" element={<TermsAndConditions />} />
//         </Route>


//         {/* Protected Routes - only superadmin */}
//         <Route element={<ProtectedRoute allowedRoles={["superAdmin"]}><AdminLayout /></ProtectedRoute>}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/addProperty" element={<PropertyForm />} />
//           <Route path="/property/edit/:id" element={<PropertyForm />} />
//           <Route path="/users" element={<UserManagement />} />
//           <Route path="/property-list" element={<Properties />} />
//           <Route path="/bookings" element={<Booking />} />
//           <Route path="/enquiries" element={<Enquiries />} />
//           <Route path="/profile" element={<AdminProfile />} />
//         </Route>
//           {/* Protected Routes - only admin */}
//         <Route element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}>
//           <Route path="/dashboard" element={<SellerAdminDashboard />} />
//           <Route path="/addProperty" element={<PropertyForm />} />
//           <Route path="/property/edit/:id" element={<PropertyForm />} />
//           <Route path="/property-list" element={<AdminProperties />} />
//           <Route path="/bookings" element={<Booking />} />
//           <Route path="/enquiries" element={<Enquiries />} />
//           <Route path="/profile" element={<AdminProfile />} />
//         </Route>
//          {/* Protected Routes - only seller */}
//         <Route element={<ProtectedRoute allowedRoles={["seller"]}><AdminLayout /></ProtectedRoute>}>
//           <Route path="/dashboard" element={<SellerAdminDashboard />} />
//           <Route path="/addProperty" element={<PropertyForm />} />
//           <Route path="/property/edit/:id" element={<PropertyForm />} />
//           <Route path="/property-list" element={<SellerProperties />} />
//           <Route path="/bookings" element={<Booking />} />
//           <Route path="/enquiries" element={<Enquiries />} />
//           <Route path="/profile" element={<AdminProfile />} />
//         </Route>

//       </Routes>
//     </Router>
//   );
// }

// export default App;
