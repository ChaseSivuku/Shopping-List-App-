import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { addList, selectUserById } from "../features/usersSlice";

export function AddList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const user = useSelector((state: RootState) =>
    userId ? selectUserById(state, userId) : null
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState("General");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const listName = name.trim();
    if (!listName) {
      setError("List name is required.");
      return;
    }
    const exists = user.lists.some(
      (l) => l.name.toLowerCase() === listName.toLowerCase()
    );
    if (exists) {
      setError("You already have a list with this name.");
      return;
    }
    dispatch(
      addList({
        userId: user.id,
        list: { name: listName, category, notes, items: [] },
      })
    );
    navigate("/home");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please log in.</p>
        <Link to="/login" className="ml-4 text-black underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <Link to="/home" className="text-xl font-bold">
          Shopping List
        </Link>
        <nav className="flex gap-4">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        </nav>
      </header>

      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add new list</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              List name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Groceries"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="General">General</option>
              <option value="Groceries">Groceries</option>
              <option value="Household">Household</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Create list
            </button>
            <Link
              to="/home"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
