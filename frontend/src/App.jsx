import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddSweet } from "./pages/AddSweet";
import { SweetDetails } from "./pages/SweetDetails";
import { SweetList } from "./pages/SweetList";
import { EditSweet } from "./pages/EditSweet";
import { PurchaseSweet } from "./pages/PurchaseSweet";
import { RestockSweet } from "./pages/RestockSweet";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SweetList />} />
        <Route path="/add" element={<AddSweet />} />
        <Route path="/sweets/:id" element={<SweetDetails />} />
        <Route path="/sweets/:id/edit" element={<EditSweet />} />
        <Route path="/sweets/:id/purchase" element={<PurchaseSweet />} />
        <Route path="/sweets/:id/restock" element={<RestockSweet />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
