import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Driver Rating App</h1>
      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
