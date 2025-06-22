import {useState} from "react";
import { Eye, EyeOff } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    fullName: Yup.string().max(20).min(3,"fullName must be between 3 and 20 characters").required("Full name is required"),
    username: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const initialValues = {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: ""
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", values);
      toast.success("Registration successful!!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
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
        <h2 className="text-center text-2xl font-bold text-white drop-shadow-lg">Create an Account 🖋</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="space-y-4 mt-6">
              <div className="grid gap-4">
                <div>
                  <Field
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-2 border border-gray-700 bg-black text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="p"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>
              </div>
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

              <div className="relative">
                <Field
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full p-2 border border-gray-700 bg-black text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-600 text-xs mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                Register
              </button>

              <p className="text-center text-gray-300 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline text-blue-400 hover:text-blue-500 transition duration-300">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
