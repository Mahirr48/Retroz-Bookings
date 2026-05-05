import { useEffect, useState } from "react";
import API from "../services/api";
import { 
  MdEdit, 
  MdDelete, 
  MdHotel, 
  MdLocationOn, 
  MdAttachMoney, 
  MdDescription, 
  MdWifi,
  MdCloudUpload,
  MdAddCircleOutline,
  MdCheckCircle
} from "react-icons/md";

const Admin = () => {

  // ✅ SAFE USER
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (!user || (user.role !== "admin" && user.role !== "super_admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-red-100 dark:border-red-500/20 dark:bg-slate-900">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  // ✅ STATES
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    amenities: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  // ✅ FETCH HOTELS (ONLY OWN)
  const fetchHotels = async () => {
    try {
      const res = await API.get("/hotels/admin");
      setHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // ✅ PREFILL WHEN EDITING
  useEffect(() => {
    if (editingHotel) {
      setForm({
        name: editingHotel.name,
        location: editingHotel.location,
        price: editingHotel.price,
        description: editingHotel.description || "",
        amenities: editingHotel.amenities?.join(", ") || "",
      });
      setPreview(""); // Reset preview when editing starts if no image exists or fetch existing image
    } else {
      setForm({
        name: "",
        location: "",
        price: "",
        description: "",
        amenities: "",
      });
      setPreview("");
      setImageFile(null);
    }
  }, [editingHotel]);

  // ✅ IMAGE PREVIEW
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ SUBMIT (CREATE + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.location || !form.price) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      // 🔥 UPDATE
      if (editingHotel) {
        await API.put(`/hotels/${editingHotel._id}`, {
          ...form,
          amenities: form.amenities.split(",").map(item => item.trim()).filter(Boolean),
        });

        setEditingHotel(null);
      } 
      // 🔥 CREATE
      else {
        if (!imageFile) {
          alert("Please select an image for the hotel.");
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("location", form.location);
        formData.append("price", form.price);
        formData.append("description", form.description);
        formData.append(
          "amenities",
          JSON.stringify(form.amenities.split(",").map(item => item.trim()).filter(Boolean))
        );
        formData.append("image", imageFile);

        await API.post("/hotels", formData);
      }

      // reset
      setForm({
        name: "",
        location: "",
        price: "",
        description: "",
        amenities: "",
      });

      setPreview("");
      setImageFile(null);

      fetchHotels();

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await API.delete(`/hotels/${id}`);
        fetchHotels();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin Dashboard
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Manage your properties, pricing, and details in one place.
            </p>
          </div>
          {editingHotel && (
            <button 
              onClick={() => setEditingHotel(null)}
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-950"
            >
              <MdAddCircleOutline className="mr-2 -ml-1 h-5 w-5 text-slate-500" />
              Add New Hotel
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* LEFT: FORM */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-300 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30">
              <div className="px-6 py-6 border-b border-slate-100 bg-slate-50/50 dark:border-white/10 dark:bg-slate-800/60">
                <h3 className="text-xl font-bold text-slate-800 flex items-center">
                  {editingHotel ? (
                    <><MdEdit className="mr-2 text-indigo-600" /> Edit Property Details</>
                  ) : (
                    <><MdAddCircleOutline className="mr-2 text-indigo-600" /> Register New Property</>
                  )}
                </h3>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Hotel Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Property Name</label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdHotel className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-slate-50 focus:bg-white border text-slate-900 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900"
                        placeholder="e.g. Grand Plaza Hotel"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location</label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdLocationOn className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-slate-50 focus:bg-white border text-slate-900 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900"
                        placeholder="e.g. New York, USA"
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price per Night</label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdAttachMoney className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="number"
                        required
                        min="0"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-slate-50 focus:bg-white border text-slate-900 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Amenities</label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <MdWifi className="h-5 w-5 text-slate-400" />
                      </div>
                      <textarea
                        value={form.amenities}
                        onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                        rows={2}
                        className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-slate-50 focus:bg-white border text-slate-900 resize-none dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900"
                        placeholder="WiFi, Pool, Gym, Spa (comma separated)"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <MdDescription className="h-5 w-5 text-slate-400" />
                      </div>
                      <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={4}
                        className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-slate-50 focus:bg-white border text-slate-900 resize-none dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900"
                        placeholder="Describe your property..."
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  {!editingHotel && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Property Image</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-500 transition-colors bg-slate-50 relative overflow-hidden group dark:border-white/10 dark:bg-slate-950">
                        {preview ? (
                          <div className="absolute inset-0 w-full h-full">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-lg font-medium text-sm shadow-sm flex items-center">
                                <MdCheckCircle className="text-green-500 mr-2 h-5 w-5" /> Image Selected
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2 text-center">
                            <MdCloudUpload className="mx-auto h-12 w-12 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                            <div className="flex text-sm text-slate-600 justify-center">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 px-2 py-1">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                              </label>
                            </div>
                            <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                        {/* Invisible input overlay to allow clicking anywhere on the preview to change image */}
                        {preview && (
                          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} accept="image/*" title="Click to change image" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white transition-all duration-200 ${
                        loading 
                          ? "bg-indigo-400 cursor-not-allowed" 
                          : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]"
                      }`}
                    >
                      {loading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : null}
                      {loading
                        ? "Processing..."
                        : editingHotel
                        ? "Save Changes"
                        : "Publish Property"}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>

          {/* RIGHT: LIST */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full max-h-[850px] dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30">
              <div className="px-6 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl dark:border-white/10 dark:bg-slate-800/60">
                <h3 className="text-xl font-bold text-slate-800 flex items-center">
                  <MdHotel className="mr-2 text-indigo-600" /> Your Properties
                </h3>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {hotels.length} total
                </span>
              </div>

              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                {hotels.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MdHotel className="h-10 w-10 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">No properties found</h3>
                    <p className="text-slate-500 mb-6">Get started by adding your first hotel or property.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {hotels.map((hotel) => (
                      <div
                        key={hotel._id}
                        className={`group relative bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 dark:bg-slate-950 ${
                          editingHotel?._id === hotel._id ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' : 'border-slate-200'
                        }`}
                      >
                        {/* Image Header */}
                        <div className="h-32 bg-slate-200 relative overflow-hidden">
                          {hotel.imageUrl ? (
                            <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                              <MdHotel className="h-12 w-12 text-slate-300" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                            <span className="font-bold text-slate-900">${hotel.price}</span>
                            <span className="text-xs text-slate-600">/night</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h4 className="text-lg font-bold text-slate-900 truncate mb-1" title={hotel.name}>
                            {hotel.name}
                          </h4>
                          <p className="text-sm text-slate-500 flex items-center mb-3">
                            <MdLocationOn className="text-slate-400 mr-1 flex-shrink-0" />
                            <span className="truncate">{hotel.location}</span>
                          </p>

                          {/* Amenities Tags (Max 2) */}
                          {hotel.amenities && hotel.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {hotel.amenities.slice(0, 2).map((amenity, idx) => (
                                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                                  {amenity}
                                </span>
                              ))}
                              {hotel.amenities.length > 2 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200">
                                  +{hotel.amenities.length - 2} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Actions Overlay */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-4 px-4 flex justify-between gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <button
                              onClick={() => setEditingHotel(hotel)}
                              className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                              <MdEdit className="mr-1.5 h-4 w-4" /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(hotel._id)}
                              className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-red-200 shadow-sm text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                              <MdDelete className="mr-1.5 h-4 w-4" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Global styles for custom scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}} />
    </div>
  );
};

export default Admin;
