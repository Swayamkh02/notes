import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import AddNotePage from "./pages/AddNotePage";
import SearchPage from "./pages/SearchPage";
import ResponsiveNavbar from "./components/ResponsiveNavbar"

export default function AppRoutes() {
  return (
    <>
      <ResponsiveNavbar/>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/add" element={<AddNotePage />} />
      </Routes>
    </>
  );
}
