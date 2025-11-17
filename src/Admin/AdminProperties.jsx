import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { showError, showSuccess } from "../Alert";
import Loader from "../CommonComponent/Loader";
import PaginatedTable from "../CommonComponent/PaginatedTable";
import PropertyForm from "../SuperAdmin/PropertyForm";
import Modal from "../CommonComponent/Modal";
import {
  useGetAllPropertiesQuery,
  useUpdateApprovalStatusMutation,
} from "../redux/features/propertyApi";

export const AdminProperties = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPropertyId, setEditPropertyId] = useState(null);

  // ✅ Fetch properties
  const { data, isLoading, refetch } = useGetAllPropertiesQuery({ page, limit });

  const properties = data?.data?.properties || [];
  const totalPages = data?.data?.totalPages || 1;
  const totalProperties = properties?.length || 0;

  const [updateApprovalStatus] = useUpdateApprovalStatusMutation();


  const handleEdit = (id) => {
    setEditPropertyId(id);
    setIsModalOpen(true);
  };

  const handleAddProperty = () => {
    setEditPropertyId(null);
    setIsModalOpen(true);
  };

  const handleView = (id) => navigate(`/propertyDetails/${id}`);

  const handleStatusToggle = async (id, val) => {
    try {
      await updateApprovalStatus({ id, approvalStatus: val }).unwrap();
      showSuccess("Status updated successfully!");
      refetch();
    } catch {
      showError("Failed to update status");
    }
  };

  const columns = [
    {
      header: "Image",
      render: (row) => (
        <img
          src={
            row.propertyImages?.[0]
              ? row.propertyImages[0]
              : "https://via.placeholder.com/80x60?text=No+Image"
          }
          alt={row.title}
          className="w-20 h-14 object-cover rounded"
        />
      ),
    },
    { header: "Title", accessor: "title" },
    { header: "Type", accessor: "propertyType" },
    { header: "City", render: (row) => row.city || "N/A" },
    { header: "Locality", render: (row) => row.locality || "N/A" },
    {
      header: "Status",
      render: (row) => (
        <select
          value={row.approvalStatus}
          onChange={(e) => handleStatusToggle(row._id, e.target.value)}
          className="border p-1 rounded text-xs"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-3">
          <button onClick={() => handleView(row._id)} className="text-emerald-600">
            <FaEye size={14} />
          </button>
          <button onClick={() => handleEdit(row._id)} className="text-sky-600">
            <FaEdit size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Properties</h1>
        <button
          onClick={handleAddProperty}
          className="bg-[#005555] text-white px-4 py-2 rounded"
        >
          Add Property
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <PaginatedTable
          columns={columns}
          data={properties}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          pageSize={limit}
          totalItems={totalProperties}
        />
      )}

      {/* ✅ Modal for Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editPropertyId ? "Edit Property" : "Add Property"}
        size="w-[90%] md:w-[60%]"
        maxHeight="50vh"
      >
        <PropertyForm
          id={editPropertyId}
          setIsModalOpen={setIsModalOpen}
          onSuccess={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};
