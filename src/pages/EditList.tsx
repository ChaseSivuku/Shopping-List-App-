import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  selectUserById,
  updateList,
  addItem,
  removeItem,
} from "../features/usersSlice";
import type { List, Item } from "../features/usersSlice";

export function EditList() {
  const { listName } = useParams<{ listName: string }>();
  const decodedName = listName ? decodeURIComponent(listName) : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const user = useSelector((state: RootState) =>
    userId ? selectUserById(state, userId) : null
  );

  const listIndex = user?.lists.findIndex(
    (l) => l.name.toLowerCase() === decodedName.toLowerCase()
  );
  const list = listIndex !== undefined && listIndex >= 0 ? user!.lists[listIndex] : null;

  const [newName, setNewName] = useState(list?.name ?? "");
  const [notes, setNotes] = useState(list?.notes ?? "");
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");

  // Sync form when navigating to a different list or when list first loads
  useEffect(() => {
    if (list && list.name.toLowerCase() === decodedName.toLowerCase()) {
      setNewName(list.name);
      setNotes(list.notes);
    }
  }, [decodedName, list?.name, list?.notes]);

  const handleSaveList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || listIndex === undefined || listIndex < 0) return;
    const updatedList: List = {
      ...list!,
      name: newName.trim() || list!.name,
      notes,
    };
    dispatch(updateList({ userId: user.id, listIndex, list: updatedList }));
    if (newName.trim() !== list!.name) {
      navigate(`/edit-list/${encodeURIComponent(newName.trim())}`, {
        replace: true,
      });
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !list) return;
    const name = list.name;
    dispatch(
      addItem({
        userId: user.id,
        listName: name,
        item: {
          name: itemName.trim(),
          image: itemImage.trim() || "/images/placeholder.png",
        },
      })
    );
    setItemName("");
    setItemImage("");
  };

  const handleRemoveItem = (itemIndex: number) => {
    if (!user || !list) return;
    dispatch(
      removeItem({ userId: user.id, listName: list.name, itemIndex })
    );
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

  if (!list) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-gray-600">List not found.</p>
        <Link to="/home" className="text-black underline">
          Back to Home
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

      <main className="max-w-2xl mx-auto p-6">
        <Link to="/home" className="text-gray-600 hover:underline mb-4 inline-block">
          Back to lists
        </Link>

        <form onSubmit={handleSaveList} className="bg-white rounded-xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit list</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                List name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Save changes
            </button>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Items</h2>
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
                  onClick={() => handleRemoveItem(idx)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddItem} className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="New item"
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
              Add item
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
