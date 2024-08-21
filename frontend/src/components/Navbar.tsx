// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Mr. Chef</Link>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/admin/login">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
