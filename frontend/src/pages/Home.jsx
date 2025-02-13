import { Link } from "react-router-dom";
const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center">
    <h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome to the Todo App</h1>
    <p className="text-lg text-gray-700 mb-4">If you have an account, please sign in. Otherwise, sign up to create one.</p>
    <div className="space-x-4">
      <Link to="/signup" className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600">
        Sign Up
      </Link>
      <Link to="/signin" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600">
        Sign In
      </Link>
    </div>
  </div>
);

export default Home;
