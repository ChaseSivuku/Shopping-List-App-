import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { selectUserById } from "../features/usersSlice";

export function Profile() {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const user = useSelector((state: RootState) =>
    userId ? selectUserById(state, userId) : null
  );

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
          🛒 Shopping List
        </Link>
        <nav className="flex gap-4">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/add-list" className="hover:underline">
            Add List
          </Link>
        </nav>
      </header>

      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <div>
            <span className="text-sm text-gray-500">Name</span>
            <p className="font-medium">{user.name} {user.surname}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Email</span>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Cell</span>
            <p className="font-medium">{user.cell || "—"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Lists</span>
            <p className="font-medium">{user.lists.length} list(s)</p>
          </div>
          <Link
            to="/home"
            className="inline-block mt-4 text-black underline hover:no-underline"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
