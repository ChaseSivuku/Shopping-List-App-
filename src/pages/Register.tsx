// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../../features/users/usersSlice";

// export default function Register() {
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({
//     name: "",
//     surname: "",
//     email: "",
//     cell: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newUser = {
//       ...form,
//       id: Date.now(),
//       lists: [],
//     };
//     dispatch(addUser(newUser));
//     setForm({ name: "", surname: "", email: "", cell: "", password: "" });
//     alert("User registered successfully!");
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//         />
//         <input
//           name="surname"
//           placeholder="Surname"
//           value={form.surname}
//           onChange={handleChange}
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//         />
//         <input
//           name="cell"
//           placeholder="Cell"
//           value={form.cell}
//           onChange={handleChange}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }
