// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../store/store'
// import axios from 'axios'


// interface Item {
//   image: string
//   name: string
// }

// interface List {
//   name: string
//   category: string
//   notes: string
//   items: Item[]
// }

// interface User {
//   id: number
//   name: string
//   surname: string
//   email: string
//   cell: string
//   password: string
//   lists: List[]
// }

// interface UsersState {
//   users: User[]
//   status: 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: string | null
// }

// const initialState: UsersState = {
//   users: [],
//   status: 'idle',
//   error: null,
// }

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await axios.get<User[]>('http://localhost:3000/users')
//   return response.data
// })

// export const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {
//     addUser: (state, action: PayloadAction<User>) => {
//       state.users.push(action.payload)
//     },

//     updateUser: (state, action: PayloadAction<User>) => {
//       const index = state.users.findIndex((u) => u.id === action.payload.id)
//       if (index !== -1) {
//         state.users[index] = action.payload
//       }
//     },

//     deleteUser: (state, action: PayloadAction<number>) => {
//       state.users = state.users.filter((u) => u.id !== action.payload)
//     },

//     addList: (state, action: PayloadAction<{ userId: number; list: List }>) => {
//       const user = state.users.find((u) => u.id === action.payload.userId)
//       if (user) {
//         user.lists.push(action.payload.list)
//       }
//     },

   
//     addItem: (
//       state,
//       action: PayloadAction<{ userId: number; listName: string; item: Item }>
//     ) => {
//       const user = state.users.find((u) => u.id === action.payload.userId)
//       if (user) {
//         const list = user.lists.find((l) => l.name === action.payload.listName)
//         if (list) {
//           list.items.push(action.payload.item)
//         }
//       }
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = 'loading'
//       })
//       .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
//         state.status = 'succeeded'
//         state.users = action.payload
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error.message || 'Something went wrong'
//       })
//   },
// })

// export const { addUser, updateUser, deleteUser, addList, addItem } =
//   usersSlice.actions

// export const selectUsers = (state: RootState) => state.users.users
// export const selectUserById = (state: RootState, userId: number) =>
//   state.users.users.find((user) => user.id === userId)

// // usersSlice.ts (additions)

// interface AuthState {
//   currentUser: User | null
// }

// const initialState: UsersState & AuthState = {
//   users: [],
//   status: 'idle',
//   error: null,
//   currentUser: null,
// }

// export const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {
//     addUser: (state, action: PayloadAction<User>) => {
//       state.users.push(action.payload)
//     },

//     login: (state, action: PayloadAction<{ email: string; password: string }>) => {
//       const found = state.users.find(
//         (u) => u.email === action.payload.email && u.password === action.payload.password
//       )
//       if (found) {
//         state.currentUser = found
//       } else {
//         state.error = "Invalid credentials"
//       }
//     },

//     logout: (state) => {
//       state.currentUser = null
//     },
//   },
// })

// export const { addUser, login, logout } = usersSlice.actions
// export default usersSlice.reducer



// export default usersSlice.reducer
