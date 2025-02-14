import { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../redux/reduxRoutes/authRedux";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(signin(formData)); 
      if (response && response.payload) {
        navigate("/tasks"); 
      } else {
        alert("Invalid credentials, please try again!");
      }
    } catch (error) {
      alert("Signin failed. Please check your email and password.");
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Signin</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 mb-3 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Signin
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
