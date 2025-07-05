import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import AddNotePage from "./pages/AddNotePage";
import SearchPage from "./pages/SearchPage";

export default function AppRoutes() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Search</Button>
          <Button color="inherit" component={Link} to="/add">Add</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/add" element={<AddNotePage />} />
      </Routes>
    </>
  );
}
