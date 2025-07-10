function Dashboard() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard</h2>
          <p>This is a protected page. Only logged-in users can access it.</p>
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  