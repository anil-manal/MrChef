// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this is imported
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import AddRecipe from './components/AddRecipe';
import AdminLayout from './components/AdminLayout';
import UpdateRecipe from './components/UpdateRecipe';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/admin/add-recipe" element={<AddRecipe />} />
          <Route path="/update-recipe/:id" element={<UpdateRecipe />} />

        </Route>
        <Route path="/recipes/:id" element={<RecipeDetail />} />

      </Routes>
      <ToastContainer /> {/* Ensure ToastContainer is rendered */}
    </div>
  );
}

export default App;
