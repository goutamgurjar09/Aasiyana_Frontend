import { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { showSuccess, showError } from "../Alert";
import PaginatedTable from "../CommonComponent/PaginatedTable";
import { useGetAllInquiriesQuery, useDeleteInquiryMutation } from "../redux/features/inquiryApi";

const Enquiries = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem('user'));

  // RTK Query hooks
  const { data, isLoading, isError, refetch } = useGetAllInquiriesQuery({ page, limit, search });
  const [deleteInquiry] = useDeleteInquiryMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        const response = await deleteInquiry(id).unwrap();
        showSuccess(response.message || "Enquiry deleted successfully");
        refetch(); // Refresh after deletion
      } catch (err) {
        showError(err?.data?.message || err?.message || "Failed to delete enquiry.");
      }
    }
  };

  const columns = [
    { header: "S No.", render: (_, index) => index + 1 },
    { header: "Name", accessor: "fullname" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Email", accessor: "email" },
    { header: "Message", accessor: "message", className: "max-w-xs" }
  ];
  // ❌ Seller ke liye Actions column mat add karo
  if (user?.role !== "seller") {
    columns.push({
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-red-100 text-red-500 hover:bg-rose-200 p-2 rounded-lg"
            onClick={() => handleDelete(row._id)}
          >
            <FaTrash size={14} />
          </button>
        </div>
      ),
    });
  }

  if (isError) {
    return <p className="text-center text-red-500">Error loading enquiries.</p>;
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-slate-700">Enquiries</h2>

      <div className="flex gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, or mobile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 pr-8"
          />
          {search && (
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setSearch("")}
              tabIndex={-1}
            >
              <FaTimes />
            </span>
          )}
        </div>
      </div>

      <PaginatedTable
        columns={columns}
        data={data?.data?.enquiries || []}
        currentPage={page}
        totalPages={data?.data?.totalPages || 1}
        onPageChange={setPage}
        hasPrevPage={data?.data?.hasPrevPage}
        hasNextPage={data?.data?.hasNextPage}
        loading={isLoading}
        pageSize={limit}
        totalItems={data?.data?.totalEnquiries || 0}
      />


    </main>
  );
};

export default Enquiries;
