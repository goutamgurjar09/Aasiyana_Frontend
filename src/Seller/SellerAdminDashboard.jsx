import { Link } from "react-router-dom";
import MetricsPieChart from "../CommonComponent/PieChart";
import { useGetAllPropertiesQuery } from "../redux/features/propertyApi";
import { useGetBookingsQuery, useGetTotalBookingStatusCountQuery } from "../redux/features/bookingApi";
import { useGetAllInquiriesQuery } from "../redux/features/inquiryApi";

export default function SellerAdminDashboard() {
  const { data: propertiesData } = useGetAllPropertiesQuery({ page: 1, limit: 10 });
  const { data: bookingsData } = useGetBookingsQuery({ page: 1, limit: 10 });
  const { data: enquiriesData } = useGetAllInquiriesQuery({ page: 1, limit: 10 });
  const { data: bookingStatusCount } = useGetTotalBookingStatusCountQuery();

  const totalProperties = propertiesData?.data?.totalProperties || 0;
  const totalBookings = bookingsData?.data?.totalBookings || 0;
  const totalEnquiries = enquiriesData?.data?.totalEnquiries || 0;
  const totalPendingBookings = bookingStatusCount?.data?.pending || 0;
  const totalConfirmedBookings = bookingStatusCount?.data?.confirmed || 0;
  const totalCancelledBookings = bookingStatusCount?.data?.cancelled || 0;

  const stats = [
    { title: "Total Properties", value: totalProperties, path: "/property-list" },
    { title: "Total Bookings", value: totalBookings, path: "/bookings" },
    { title: "Confirmed Bookings", value: totalConfirmedBookings, path: "/bookings" },
    { title: "Pending Bookings", value: totalPendingBookings, path: "/bookings" },
    { title: "Cancelled Bookings", value: totalCancelledBookings, path: "/bookings" },
    { title: "Total Enquiries", value: totalEnquiries, path: "/enquiries" },
  ];

  if (!propertiesData || !bookingsData || !enquiriesData) {
    return <div className="text-center mt-10 text-gray-600">Loading dashboard...</div>;
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Seller Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map(item => (
          <Link key={item.title} to={item.path ?? "#"}>
            <div className="p-6 bg-white shadow-md rounded-lg text-center hover:bg-gray-100 transition">
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-700 font-semibold text-xl mt-2">{item.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg mb-10">
        <MetricsPieChart
          totalBookings={totalBookings}
          totalConfirmedBookings={totalConfirmedBookings}
          totalPendingBookings={totalPendingBookings}
          totalCancelledBookings={totalCancelledBookings}
          totalProperties={totalProperties}
          totalEnquiries={totalEnquiries}
        />
      </div>
    </main>
  );
}
