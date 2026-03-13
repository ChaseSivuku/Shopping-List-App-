import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { AddList } from "./pages/AddList";
import { EditList } from "./pages/EditList";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-list"
          element={
            <ProtectedRoute>
              <AddList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-list/:listName"
          element={
            <ProtectedRoute>
              <EditList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
