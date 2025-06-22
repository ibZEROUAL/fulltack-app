import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    console.log(values)
    try {
      const response = await axios.post("http://localhost:8080/api/auth/authenticate", values);
      if (response.status === 200){
        localStorage.setItem("jwtToken", response.data.jwtToken);
      }
      toast.success("Login successful!");
      navigate("/display");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 p-4 min-h-screen pt-28">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 10000,
          },
        }}
      />
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-white/20">
        <h2 className="text-center text-2xl font-bold text-white drop-shadow-lg">Login 🖋</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="space-y-4 mt-6">
              <div>
                <Field
                  name="username"
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-700 bg-black text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-2 border border-gray-700 bg-black text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-400 hover:text-blue-400 transition duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                Login
              </button>

              <p className="text-center text-gray-300 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="underline text-blue-400 hover:text-blue-500 transition duration-300">
                  Register
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>





























    </div>
  );
}
