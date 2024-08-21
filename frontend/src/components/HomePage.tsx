// src/components/HomePage.tsx
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

interface Recipe {
  _id: string;
  title: string;
  image: string;
  labels: string[];
  metadata: string;
  rating?: number;
  createdAt: string;
}

const INITIAL_ROWS = 2;
const CARDS_PER_ROW = 3;

function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ROWS * CARDS_PER_ROW);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recipes');
        if (Array.isArray(res.data)) {
          setAllRecipes(res.data);
          setRecipes(res.data.slice(0, visibleCount));
        } else {
          console.error('Unexpected response data:', res.data);
        }
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
      }
    };
    fetchRecipes();
  }, [visibleCount]);

  const handleLoadMore = () => {
    const nextCount = visibleCount + INITIAL_ROWS * CARDS_PER_ROW;
    setVisibleCount(nextCount);
    setRecipes(allRecipes.slice(0, nextCount));
  };

  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="border p-4 rounded shadow">
              <img 
                src={`http://localhost:5000/${recipe.image.replace(/\\/g, '/')}`} 
                alt={recipe.title} 
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-2xl font-bold mb-2">
                <Link to={`/recipes/${recipe._id}`} className="text-blue-500">
                  {recipe.title}
                </Link>
              </h2>
              <p className="text-gray-800 mb-2">{recipe.metadata}</p>
              <div className="text-sm text-gray-600 mb-2">
                {recipe.labels.join(', ')} | {new Date(recipe.createdAt).toLocaleDateString()}
              </div>
              {recipe.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-500">{'★'.repeat(Math.round(recipe.rating))}</span>
                  <span className="text-gray-600 ml-2">{recipe.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {allRecipes.length > visibleCount && (
          <div className="text-center mt-4">
            <button 
              onClick={handleLoadMore} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
