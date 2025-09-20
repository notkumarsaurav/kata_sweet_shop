import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Page & Component Imports
import { Navbar } from "./components/Navbar";
import { SweetList } from "./pages/SweetList";
import { AddSweet } from "./pages/AddSweet";
import { EditSweet } from "./pages/EditSweet";
import { SweetDetails } from "./pages/SweetDetails";
import { PurchaseSweet } from "./pages/PurchaseSweet";
import { RestockSweet } from "./pages/RestockSweet";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <Routes>
        {/* Sweet Routes */}
        <Route path="/" element={<SweetList />} />
        {/* Note: changed /add to /sweets/new for consistency */}
        <Route path="/sweets/new" element={<AddSweet />} /> 
        <Route path="/sweets/:id" element={<SweetDetails />} />
        <Route path="/sweets/:id/edit" element={<EditSweet />} />
        <Route path="/sweets/:id/purchase" element={<PurchaseSweet />} />
        <Route path="/sweets/:id/restock" element={<RestockSweet />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;