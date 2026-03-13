import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

export interface Item {
  image: string;
  name: string;
}

export interface List {
  name: string;
  category: string;
  notes: string;
  items: Item[];
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  cell: string;
  password: string;
  lists: List[];
}

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [
    {
      id: 1,
      name: "Alice",
      surname: "Smith",
      email: "alice@gmail.com",
      cell: "0829999999",
      password: "alice123",
      lists: [
        {
          name: "Groceries",
          category: "General",
          notes: "Get these by the end of the week",
          items: [
            { image: "/images/placeholder.png", name: "Apple" },
            { image: "/images/placeholder.png", name: "Milk" },
          ],
        },
      ],
    },
  ],
  status: "idle",
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    addList: (state, action: PayloadAction<{ userId: number; list: List }>) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        user.lists.push(action.payload.list);
      }
    },
    updateList: (
      state,
      action: PayloadAction<{
        userId: number;
        listIndex: number;
        list: List;
      }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user && user.lists[action.payload.listIndex]) {
        user.lists[action.payload.listIndex] = action.payload.list;
      }
    },
    deleteList: (
      state,
      action: PayloadAction<{ userId: number; listName: string }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        user.lists = user.lists.filter((l) => l.name !== action.payload.listName);
      }
    },
    addItem: (
      state,
      action: PayloadAction<{ userId: number; listName: string; item: Item }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        const list = user.lists.find((l) => l.name === action.payload.listName);
        if (list) {
          list.items.push(action.payload.item);
        }
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{
        userId: number;
        listName: string;
        itemIndex: number;
      }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        const list = user.lists.find((l) => l.name === action.payload.listName);
        if (list && list.items.length > action.payload.itemIndex) {
          list.items.splice(action.payload.itemIndex, 1);
        }
      }
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  addList,
  updateList,
  deleteList,
  addItem,
  removeItem,
} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find((user) => user.id === userId);
export const selectUserByEmail = (state: RootState, email: string) =>
  state.users.users.find((user) => user.email === email);

export default usersSlice.reducer;
