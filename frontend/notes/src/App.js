import { BrowserRouter } from "react-router-dom";
// import routes from "./routes";
import AppRoutes from "./routes";

export default function App() {
  return <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>;
}

// // import { BrowserRouter } from "react-router-dom";
// import { Routes, Route, Link } from "react-router-dom";
// import { AppBar, Toolbar, Button } from "@mui/material";
// import AddNotePage from "./pages/AddNotePage";
// import SearchPage from "./pages/SearchPage";
// // import routes from "./routes";

// export default function App() {
//   return <>
//       <AppBar position="static">
//         <Toolbar>
//           <Button color="inherit" component={Link} to="/">Search</Button>
//           <Button color="inherit" component={Link} to="/add">Add</Button>
//         </Toolbar>
//       </AppBar>
//       <Routes>
//         <Route path="/" element={<SearchPage />} />
//         <Route path="/add" element={<AddNotePage />} />
//       </Routes>
//     </>
// }