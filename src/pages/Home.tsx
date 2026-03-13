import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  addList,
  addItem,
  removeItem,
  selectUserById,
} from "../features/usersSlice";
import { logout } from "../store/userSlice";
import type { Item } from "../features/usersSlice";

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const user = useSelector((state: RootState) =>
    userId ? selectUserById(state, userId) : null
  );

  const [listName, setListName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [addingToList, setAddingToList] = useState<string | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">User not found. Please log in again.</p>
        <button
          onClick={() => navigate("/login")}
          className="ml-4 text-black underline"
        >
          Login
        </button>
      </div>
    );
  }

  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName.trim()) return;
    const name = listName.trim();
    const exists = user.lists.some(
      (l) => l.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      alert("A list with this name already exists.");
      return;
    }
    dispatch(
      addList({
        userId: user.id,
        list: { name, category: "General", notes: "", items: [] },
      })
    );
    setListName("");
  };

  const handleAddItem = (e: React.FormEvent, listNameArg: string) => {
    e.preventDefault();
    if (!itemName.trim()) return;
    dispatch(
      addItem({
        userId: user.id,
        listName: listNameArg,
        item: {
          image: itemImage.trim() || "/images/placeholder.png",
          name: itemName.trim(),
        },
      })
    );
    setItemName("");
    setItemImage("");
    setAddingToList(null);
  };

  const handleRemoveItem = (listNameArg: string, itemIndex: number) => {
    dispatch(
      removeItem({ userId: user.id, listName: listNameArg, itemIndex })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <Link to="/home" className="text-xl font-bold">
          🛒 Shopping List
        </Link>
        <nav className="flex gap-4 items-center">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/add-list" className="hover:underline">
            Add List
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Hello, {user.name}
        </h1>

        <section className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Create a new list</h2>
          <form onSubmit={handleAddList} className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="List name (e.g. Groceries)"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Add List
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Your lists
          </h2>
          {user.lists.length === 0 ? (
            <p className="text-gray-600">No lists yet. Create one above.</p>
          ) : (
            <div className="space-y-6">
              {user.lists.map((list) => (
                <div
                  key={list.name}
                  className="bg-white rounded-xl shadow p-6 border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">📝 {list.name}</h3>
                    <Link
                      to={`/edit-list/${encodeURIComponent(list.name)}`}
                      className="text-sm text-black underline"
                    >
                      Edit
                    </Link>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {(list.items as Item[]).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="w-8 h-8 object-cover rounded"
                        />
                        <span className="flex-1">{item.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(list.name, idx)}
                          className="text-red-600 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  {addingToList === list.name ? (
                    <form
                      onSubmit={(e) => handleAddItem(e, list.name)}
                      className="flex gap-2 flex-wrap items-center"
                    >
                      <input
                        type="text"
                        placeholder="Item name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-[120px]"
                      />
                      <input
                        type="text"
                        placeholder="Image URL (optional)"
                        value={itemImage}
                        onChange={(e) => setItemImage(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-40"
                      />
                      <button
                        type="submit"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAddingToList(null);
                          setItemName("");
                          setItemImage("");
                        }}
                        className="text-gray-600"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAddingToList(list.name)}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      + Add item
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
