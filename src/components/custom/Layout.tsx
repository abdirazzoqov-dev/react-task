// src/components/common/Layout.tsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  const activeLinkStyle = {
    color: '#fff',
    backgroundColor: '#4f46e5', // indigo-600
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md z-10">
        <nav className="container mx-auto px-6 py-3 flex space-x-4">
          <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Foydalanuvchilar</NavLink>
          <NavLink to="/map" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Xarita</NavLink>
        </nav>
      </header>
      <main className="flex-grow overflow-auto"><Outlet /></main>
    </div>
  );
};