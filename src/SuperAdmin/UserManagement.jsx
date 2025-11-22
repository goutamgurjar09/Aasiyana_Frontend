import React, { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import PaginatedTable from "../CommonComponent/PaginatedTable";
import { showSuccess, showError } from "../Alert";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} from "../redux/features/authApi";

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  // RTK Query: fetch users
  const {
    data: usersData,
    isLoading,
    refetch,
    error,
  } = useGetUsersQuery({ page, limit, search, role: roleFilter });

  const users = usersData?.data?.users || [];
   console.log(users);

  const totalUsers = usersData?.data?.totalUsers || 0;
  const totalPages = usersData?.data?.totalPages || 0;
  const hasNextPage = usersData?.data?.hasNextPage || false;
  const hasPrevPage = usersData?.data?.hasPrevPage || false;

  // RTK Mutations
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        showSuccess("User deleted successfully!");
        refetch();
      } catch (err) {
        showError(err?.data?.message || "Failed to delete user.");
      }
    }
  };

  const handleUpdateRole = async (userId, role) => {
    try {
      await updateUserRole({ userId, newRole: role }).unwrap();
      showSuccess("Role updated successfully!");
      refetch();
    } catch (err) {
      showError(err?.data?.message || "Failed to update user role.");
    }
  };

  const columns = [
    { header: "S No.", render: (_, index) => index + 1 },
    { header: "Name", accessor: "fullname" },
    { header: "Email", accessor: "email" },
    {
      header: "Role",
      render: (row) => (
        <select
          value={row.role}
          disabled={user?.role === "seller"}
          onChange={(e) => handleUpdateRole(row._id, e.target.value)}
          className={`border border-gray-300 rounded p-1 ${
            user?.role === "seller" ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <option value="admin" className="bg-yellow-200 text-yellow-800">
            Admin
          </option>
          <option value="seller" className="bg-green-200 text-green-800">
            Seller
          </option>
          <option value="buyer" className="bg-red-200 text-red-800">
            Buyer
          </option>
        </select>
      ),
    },
    { header: "Mobile", accessor: "mobile" },
    {
      header: "Actions",
      render: (row) => (
        <button
          className={`bg-red-100 text-red-500 hover:bg-rose-200 p-2 rounded-lg ${
            user?.role === "seller" ? "opacity-50 pointer-events-none" : ""
          }`}
          title={
            user?.role === "seller"
              ? "Seller can't delete users"
              : `Delete ${row.fullname}`
          }
          disabled={user?.role === "seller"}
          onClick={() => handleDelete(row._id)}
        >
          <FaTrash size={14} />
        </button>
      ),
    },
  ];

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error: {error?.data?.message || "Something went wrong"}
      </p>
    );
  }

  return (
    <div className="mt-6 mb-6 bg-gray-100 p-4 shadow-md w-[96%] mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-700">Users List</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mb-4 w-full">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 pr-8 w-full sm:w-[250px]"
          />
          {search && (
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setSearch("")}
            >
              <FaTimes />
            </span>
          )}
        </div>

        <div className="w-full sm:w-[200px]">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded px-3 py-2 sm:w-full"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
      </div>

      <PaginatedTable
        columns={columns}
        data={users}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        loading={isLoading}
        pageSize={limit}
        totalItems={totalUsers}
      />
    </div>

   
  );
};

export default UserManagement;
















