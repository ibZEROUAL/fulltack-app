import React from "react";
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("jwtToken");

  const logout = ()=> {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  }

  return (
    <nav className="fixed top-0 left-0 w-full  to-[#0a1e3f] text-white shadow-xl z-50 backdrop-blur-lg rounded-t-lg">
      <div className="container mx-auto flex justify-between items-center py-6 px-8">
        <Link to={'/'} className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:text-cyan-300 transition-all">
          Product Store
        </Link>
        <ul className="flex space-x-8 text-lg">
          <li>
            <Link to="/" className="hover:text-cyan-400 transition-all"></Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-cyan-400 transition-all">{isAuthenticated ? '' : 'Login'}</Link>
          </li>
          <li>
            { isAuthenticated ?
            <button
                onClick={() => logout()}
                className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition duration-300 text-sm"
            >Logout</button> :
            <Link to="/register" className="hover:text-cyan-400 transition-all">Register</Link>}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
