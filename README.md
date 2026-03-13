# Shopping List App

A full-stack style **Shopping List** web application built with React, TypeScript, Vite, Redux Toolkit, and Tailwind CSS. Register an account, create multiple lists, add items with optional images, and manage everything from one place.

---

## Features

- **Authentication**: Register and log in (client-side; no backend required for demo).
- **Multiple lists**: Create named lists (e.g. Groceries, Household) with optional notes and categories.
- **Items**: Add items to any list with optional image URLs; remove items from lists.
- **Profile**: View your profile and list count.
- **Protected routes**: Home, Add List, Edit List, and Profile require login; unauthenticated users are redirected to the login page.
- **Responsive UI**: Layout and forms styled with Tailwind CSS; works on desktop and smaller screens.

---

## Tech Stack

| Category      | Technology |
|--------------|------------|
| Framework    | React 19   |
| Language     | TypeScript |
| Build        | Vite 7     |
| State        | Redux Toolkit (auth + users/lists) |
| Routing      | React Router v7 |
| Styling      | Tailwind CSS v4 |
| Lint         | ESLint     |

---

## Project Structure

```
Shopping-List-App-
├── public/                 # Static assets (optional)
│   ├── images/
│   │   ├── logo.png        # App logo (optional; fallback: emoji)
│   │   ├── background.png  # Landing background (optional)
│   │   └── placeholder.png # Default item image
│   └── icons/
│       ├── email.png
│       └── lock.png
├── src/
│   ├── auth/               # Auth context (minimal; auth is Redux-based)
│   ├── components/         # Reusable UI
│   │   ├── InputField.tsx
│   │   ├── Loader (loader.tsx)
│   │   ├── ProtectedRoute.tsx
│   │   └── SubmitButton.tsx
│   ├── features/
│   │   ├── usersSlice.ts   # Users + lists + items state & actions
│   │   └── usersSclice.ts  # Legacy (unused)
│   ├── pages/
│   │   ├── Landing.tsx      # Welcome + entry to login/register
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Home.tsx        # Dashboard: lists + add list/item
│   │   ├── AddList.tsx     # Create a new list
│   │   ├── EditList.tsx    # Edit list name, notes, items
│   │   └── Profile.tsx     # User info
│   ├── store/
│   │   ├── store.ts        # Redux store (auth + users)
│   │   ├── userSlice.ts    # Auth slice (email, userId, isAuthenticated)
│   │   └── hooks.ts        # Typed useAppDispatch / useAppSelector
│   ├── App.tsx             # Router + routes
│   ├── App.css             # Global styles (Tailwind import)
│   └── main.tsx            # React root + Redux Provider
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** (or yarn/pnpm)

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Then open **http://localhost:5173** (or the URL shown in the terminal).

### Build for production

```bash
npm run build
```

Output is in the `dist/` folder. Preview the production build locally:

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Usage

1. **Landing** (`/`)  
   - Click the logo (or emoji fallback) to go to **Login**, or use “Create an account” to go to **Register**.

2. **Register** (`/register`)  
   - Fill in name, surname, email, cell (optional), and password.  
   - On submit you are added to the app’s user list and redirected to **Login**.

3. **Login** (`/login`)  
   - Use **email** and **password** of a registered user.  
   - Demo user: `alice@gmail.com` / `alice123`.  
   - On success you are redirected to **Home**.

4. **Home** (`/home`)  
   - Create new lists (name only or via “Add List” page).  
   - For each list: add items (name + optional image URL), remove items, or open **Edit** to change list name/notes and manage items.

5. **Add List** (`/add-list`)  
   - Create a list with name, category, and notes; then you’re redirected to **Home**.

6. **Edit List** (`/edit-list/:listName`)  
   - Change list name and notes; add or remove items.

7. **Profile** (`/profile`)  
   - View your name, email, cell, and number of lists.

8. **Logout**  
   - Use the **Logout** link in the header (on Home/Add List/Edit List/Profile); you are logged out and can go back to Landing/Login.

---

## Optional: Static assets

The app works without any images (logo and landing use fallbacks). To use your own:

- **Logo**: `public/images/logo.png`  
  Used on Landing and Login; if missing, a cart emoji is shown.

- **Landing background**: `public/images/background.png`  
  If you prefer a custom background, you can switch the Landing page to use this; by default a gradient is used.

- **Item placeholder**: `public/images/placeholder.png`  
  Used when an item has no image URL.

- **Icons**: `public/icons/email.png`, `public/icons/lock.png`  
  Used in Login/Register; optional.

---

## Data and “backend”

- **State**: All data (users, lists, items) lives in **Redux** in memory. There is no persistence by default (refreshing the page resets state except for the initial demo user in `usersSlice.ts`).
- **Auth**: Login checks email/password against the Redux `users` array; no separate backend or encryption. Suitable for local/demo use only.
- To add a real backend later, you would:
  - Replace or supplement Redux actions with API calls (e.g. `createAsyncThunk`).
  - Add token-based or session-based auth and protect routes accordingly.

---

## Scripts reference

| Script     | Command           | Description                |
|-----------|--------------------|----------------------------|
| `dev`     | `npm run dev`      | Start Vite dev server      |
| `build`   | `npm run build`     | TypeScript + Vite build    |
| `preview` | `npm run preview`   | Serve `dist` locally       |
| `lint`    | `npm run lint`      | Run ESLint                 |

---

## License

Private / educational use. No official license specified.
