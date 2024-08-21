// src/components/AdminLayout.tsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="bg-gray-900 text-white p-4">
        <h1 className="text-3xl font-bold">MrChef</h1>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 h-full bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <ul>
            <li><a href="/admin/dashboard" className="block py-2">Dashboard</a></li>
            <li><a href="/recipes" className="block py-2">My Recipes</a></li>
            <li><a href="/admin/add-recipe" className="block py-2">Add Recipe</a></li>
            <li><button onClick={handleLogout} className="block py-2">Logout</button></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <Outlet /> {/* This renders the nested route content */}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
