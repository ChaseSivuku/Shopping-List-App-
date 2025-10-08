import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  addUser,
  addList,
  addItem,
  selectUsers,
} from "../../features/users/usersSlice";

export default function ShoppingApp() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => selectUsers(state));

  // Local form state
  const [userName, setUserName] = useState("");
  const [listName, setListName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  // Handlers
  const handleAddUser = () => {
    if (!userName) return;
    dispatch(
      addUser({
        id: Date.now(),
        name: userName,
        surname: "",
        email: "",
        cell: "",
        password: "",
        lists: [],
      })
    );
    setUserName("");
  };

  const handleAddList = () => {
    if (selectedUser === null || !listName) return;
    dispatch(
      addList({
        userId: selectedUser,
        list: { name: listName, category: "General", notes: "", items: [] },
      })
    );
    setListName("");
  };

  const handleAddItem = () => {
    if (selectedUser === null || !listName || !itemName) return;
    dispatch(
      addItem({
        userId: selectedUser,
        listName,
        item: { image: itemImage || "no-image.png", name: itemName },
      })
    );
    setItemName("");
    setItemImage("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🛒 Shopping List Saver</h2>

      {/* Add User */}
      <div>
        <input
          type="text"
          placeholder="Enter user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* Select User */}
      <div>
        <h3>Select User</h3>
        <select
          onChange={(e) => setSelectedUser(Number(e.target.value))}
          value={selectedUser ?? ""}
        >
          <option value="">-- choose user --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add List */}
      {selectedUser && (
        <div>
          <input
            type="text"
            placeholder="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <button onClick={handleAddList}>Add List</button>
        </div>
      )}

      {/* Add Item */}
      {selectedUser && listName && (
        <div>
          <input
            type="text"
            placeholder="Item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item image URL"
            value={itemImage}
            onChange={(e) => setItemImage(e.target.value)}
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
      )}

      {/* Display Users & Lists */}
      <div style={{ marginTop: "1rem" }}>
        <h3>👥 Users and Shopping Lists</h3>
        {users.map((u) => (
          <div key={u.id} style={{ border: "1px solid #ccc", margin: "0.5rem", padding: "0.5rem" }}>
            <h4>{u.name}</h4>
            {u.lists.map((list, i) => (
              <div key={i} style={{ marginLeft: "1rem" }}>
                <strong>📝 {list.name}</strong>
                <ul>
                  {list.items.map((item: { image: string | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
                    <li key={idx}>
                      <img src={item.image} alt={item.name} width="30" /> {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
