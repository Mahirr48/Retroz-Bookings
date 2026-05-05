const user = JSON.parse(localStorage.getItem("user"));

<div className="flex justify-between items-center mt-3">
  <span className="text-sm text-gray-500">View details</span>

  {user?.role === "admin" && hotel.ownerId === user?._id && (
    <button
      onClick={handleDelete}
      className="text-xs text-red-500 hover:text-red-600 transition"
    >
      Delete
    </button>
  )}
</div>