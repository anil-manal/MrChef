import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Function to get the auth token from local storage
const getAuthToken = () => localStorage.getItem('authToken');

interface Recipe {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recipes');
        if (Array.isArray(res.data)) {
          setRecipes(res.data);
        } else {
          console.error('Unexpected response data:', res.data);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error('Failed to fetch recipes:', err.message || err);
        } else {
          console.error('Failed to fetch recipes:', err);
        }
      }
    };
    fetchRecipes();
  }, []);

  const deleteRecipe = async (id: string) => {
    try {
      const token = getAuthToken(); // Retrieve the token, though it's no longer needed for this route
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Optional, but can be removed if not needed
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete recipe: ${response.statusText}`);
      }
  
      console.log('Recipe deleted successfully');
      toast.success('Recipe deleted successfully');
      setRecipes(recipes.filter(recipe => recipe._id !== id)); // Remove deleted recipe from state
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        toast.error(`Failed to delete recipe: ${error.message}`);
      } else {
        console.error('Error:', error);
        toast.error('Failed to delete recipe: An unknown error occurred');
      }
    }
  };
  
  const confirmDelete = async () => {
    if (recipeToDelete) {
      await deleteRecipe(recipeToDelete);
      setShowModal(false);
      setRecipeToDelete(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recipe List</h2>
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <Link to={`/recipes/${recipe._id}`} className="text-blue-500 text-lg font-semibold">
                {recipe.title}
              </Link>
              <div className="text-sm text-gray-500">
                Created at: {new Date(recipe.createdAt).toLocaleDateString()} | Updated at: {new Date(recipe.updatedAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/update-recipe/${recipe._id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => { setShowModal(true); setRecipeToDelete(recipe._id); }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Are you sure you want to delete this recipe?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
