// import React, { useState } from "react";
// import Reservation2 from "./Components/Reservation2"; // rename the import

// const Reservation = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     people: "",
//     date: "",
//     time: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${API_BASE_URL}/reservations`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         console.error("Backend error:", errorData);
//         alert("❌ Error from backend");
//         return;
//       }

//       const data = await res.json();
//       alert(data.message);

//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         people: "",
//         date: "",
//         time: ""
//       });

//     } catch (err) {
//       console.error("Network/fetch error:", err);
//       alert("❌ Error sending reservation");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
//       <h2>Book a Table</h2>
//       <input name="name" value={form.name} placeholder="Name" onChange={handleChange} required /><br />
//       <input name="email" type="email" value={form.email} placeholder="Email" onChange={handleChange} required /><br />
//       <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} required /><br />
//       <input name="people" type="number" value={form.people} placeholder="People" onChange={handleChange} required /><br />
//       <input name="date" type="date" value={form.date} onChange={handleChange} required /><br />
//       <input name="time" type="time" value={form.time} onChange={handleChange} required /><br />
//       <button type="submit">Reserve</button>
//     </form>
//   );
// };

// export default Reservation;
