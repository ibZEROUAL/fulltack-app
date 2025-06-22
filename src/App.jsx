import {BrowserRouter as Router, Routes, Route, useLocation, Outlet, Navigate} from "react-router-dom";
import AddProduct from "./Components/Admin/addProduct";
import EditProduct from "./Components/Admin/editProduct";
import DisplayProducts from "./Components/Admin/displayProduct";
import Sidebar from "./Components/Admin/sideBar";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import HomePage from "./Components/Home";

function Layout() {
  const location = useLocation();
  const showSidebar = ["/create", "/edit", "/display", "/comments"].some(path =>
    location.pathname.startsWith(path)
  );
    const isAuthenticated = !!localStorage.getItem("jwtToken");

    const ProtectedRoute = ({ isAuthenticated }) => {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
    };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {showSidebar && <Sidebar />}

        <div className="flex-1">
          <Routes>

              <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                  <Route path="/create" element={<AddProduct />} />
                  <Route path="/edit/:id" element={<EditProduct />} />
                  <Route path="/display" element={<DisplayProducts />} />
              </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;