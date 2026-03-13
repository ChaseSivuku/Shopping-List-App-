import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/usersSlice";
import { InputField } from "../components/InputField";

export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    cell: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Name, email and password are required.");
      return;
    }
    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      surname: form.surname.trim(),
      email: form.email.trim().toLowerCase(),
      cell: form.cell.trim(),
      password: form.password,
      lists: [],
    };
    dispatch(addUser(newUser));
    setForm({ name: "", surname: "", email: "", cell: "", password: "" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      <div className="bg-black w-[50%] flex flex-col justify-center items-center gap-8 p-12">
        <div className="h-[200px] w-[200px]">
          <img src="/images/logo.png" alt="Logo" className="w-full h-full" />
        </div>
        <p className="text-white text-center text-lg">
          Create your account and start building smarter shopping lists.
        </p>
      </div>

      <div className="bg-white w-[50%] flex flex-col justify-center items-center p-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-[434px]"
        >
          <InputField
            label="Name:"
            typeInput="text"
            placeholder="Your name"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
          />
          <InputField
            label="Surname:"
            typeInput="text"
            placeholder="Your surname"
            value={form.surname}
            onChange={(v) => handleChange("surname", v)}
          />
          <InputField
            label="Email:"
            typeInput="email"
            icon="/icons/email.png"
            placeholder="someone@example.com"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
          />
          <InputField
            label="Cell:"
            typeInput="tel"
            placeholder="082 123 4567"
            value={form.cell}
            onChange={(v) => handleChange("cell", v)}
          />
          <InputField
            label="Password:"
            typeInput="password"
            icon="/icons/lock.png"
            placeholder="Choose a password"
            value={form.password}
            onChange={(v) => handleChange("password", v)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-black text-white w-full h-[55px] rounded-[20px] mt-4 hover:bg-gray-800 transition font-medium"
          >
            Create account
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
