import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Recipe {
  _id: string;
  title: string;
  updatedAt: string;
}

function Dashboard() {
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [recipeViews, setRecipeViews] = useState<{ [key: string]: number }>({});
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [totalRecipeViews, setTotalRecipeViews] = useState<number>(0);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const statsResponse = await axios.get('http://localhost:5000/api/visits/stats', { headers: { 'Cache-Control': 'no-cache' } });
        const recipesResponse = await axios.get('http://localhost:5000/api/recipes', { headers: { 'Cache-Control': 'no-cache' } });

        console.log('Stats Response:', statsResponse.data);
        console.log('Recipes Response:', recipesResponse.data);

        const statsData = statsResponse.data;

        // Set state with the fetched data
        setTotalVisits(statsData.websiteViews || 0);
        setTotalRecipes(statsData.recipeCount || 0);

        // Calculate the total number of recipe views
        const recipeViewsData = statsData.recipeViews || {};
        const totalViews = Object.values(recipeViewsData).reduce<number>((acc, value) => acc + (value as number), 0);
        setTotalRecipeViews(totalViews);

        // Set recipeViews
        setRecipeViews(recipeViewsData);

        // Get and sort recipes by updatedAt
        const sortedRecipes = recipesResponse.data.sort((a: Recipe, b: Recipe) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        setRecentRecipes(sortedRecipes.slice(0, 3));

      } catch (error: any) {
        console.error('Error fetching data:', error.message || error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 mb-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <Card title="Total Recipes" value={totalRecipes} icon={<BookIcon />} />
          <Card title="Total Views" value={totalVisits} icon={<EyeIcon />} />
          <Card title="Total Recipe Views" value={totalRecipeViews} icon={<BookIcon />} />
        </div>

        <h1 className="text-3xl mt-6 font-bold mb-4">Recent Recipes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentRecipes.length > 0 ? (
            recentRecipes.map(recipe => (
              <RecentRecipeCard
                key={recipe._id}
                title={recipe.title}
                dateUpdated={recipe.updatedAt}
                viewCount={recipeViews[recipe._id] || 0} // Display views for each recipe
              />
            ))
          ) : (
            <div className="text-gray-500">No recent recipes available</div>
          )}
        </div>
      </main>
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg"
        onClick={() => navigate('/admin/add-recipe')}
      >
        <span className="text-2xl">+</span>
      </button>
    </div>
  );
}

interface CardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => (
  <div className="bg-white p-6 shadow-lg rounded-lg"
       style={{
         boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
         height: '150px', // Increased height
       }}>
    <div className="flex items-center justify-between pb-2">
      <div className="text-sm font-medium text-gray-700">{title}</div>
      {icon}
    </div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <p className="text-xs text-gray-500">{title}</p>
  </div>
);

const BookIcon: React.FC = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const EyeIcon: React.FC = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

interface RecentRecipeCardProps {
  title: string;
  dateUpdated: string;
  viewCount: number; // Added viewCount prop
}

const RecentRecipeCard: React.FC<RecentRecipeCardProps> = ({ title, dateUpdated, viewCount }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg"
       style={{
         boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
       }}>
    <div className="mb-4">
      <div className="text-2xl font-bold text-gray-800">{title}</div>
      <div className="text-sm text-gray-500 mt-1">Updated at: {new Date(dateUpdated).toLocaleDateString()}</div>
      <div className="text-sm text-gray-500 mt-1">Views: {viewCount}</div> {/* Display view count */}
    </div>
  </div>
);

export default Dashboard;
