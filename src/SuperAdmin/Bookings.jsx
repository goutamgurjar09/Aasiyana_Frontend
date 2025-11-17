import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaTimes } from "react-icons/fa";
import PaginatedTable from "../CommonComponent/PaginatedTable";
import { showSuccess, showError } from "../Alert";
import {
  useGetBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
} from "../redux/features/bookingApi";

const Booking = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Filters
  const [page, setPage] = useState(1);
  const limit = 10;
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");    // input field
  const [nameFilter, setNameFilter] = useState(""); // debounced value

  
  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setNameFilter(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // RTK Query call
  const { data, isLoading, refetch } = useGetBookingsQuery({
    page,
    limit,
    status: statusFilter,
    name: nameFilter,
  });

  const [deleteBooking] = useDeleteBookingMutation();
  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking(id).unwrap();
      showSuccess("Booking deleted successfully");
      refetch();
    } catch (err) {
      showError(err?.data?.message || "Failed to delete booking");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus({ id, status }).unwrap();
      showSuccess("Booking status updated");
      refetch();
    } catch (err) {
      showError(err.data?.message || "Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    { header: "S No.", render: (_, index) => index + 1 },
    { header: "Name", accessor: "name" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Message", accessor: "message", className: "max-w-xs" },

    {
      header: "Status",
      render: (row) => (
        <select
          value={row.status}
          disabled={user?.role === "seller"}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          className={`border rounded p-1 text-sm ${getStatusColor(row.status)} ${
            user?.role === "seller" ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
    },

    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/propertyDetails/${row?.propertyId?._id}`)}
            className="bg-emerald-100 text-emerald-600 hover:bg-emerald-200 p-2 rounded-lg"
          >
            <FaEye size={14} />
          </button>

          <button
            disabled={user?.role === "seller"}
            onClick={() => handleDelete(row._id)}
            className={`bg-red-100 text-red-500 hover:bg-red-200 p-2 rounded-lg ${
              user?.role === "seller" && "opacity-50 pointer-events-none"
            }`}
          >
            <FaTrash size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-slate-700">Bookings</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 mb-4">

        {/* Search */}
        <div className="relative w-full sm:w-[250px]">
          <input
            type="text"
            placeholder="Search by Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-[#52b9b9]"
          />
          {search && (
            <span
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              <FaTimes />
            </span>
          )}
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2 sm:w-[200px] focus:ring-2 focus:ring-[#52b9b9]"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <PaginatedTable
        columns={columns}
        data={data?.data?.bookings || []}
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
        hasPrevPage={data?.hasPrevPage}
        hasNextPage={data?.hasNextPage}
        loading={isLoading}
        pageSize={limit}
        totalItems={data?.totalBookings || 0}
      />
    </main>
  );
};

export default Booking;
