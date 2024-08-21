import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

interface Recipe {
  _id: string;
  title: string;
  image: string;
  labels: string[];
  metadata: string;
  process: string;
  ingredients: { name: string; quantity: string }[];
  instructions: { instruction: string; description: string }[];
  rating?: number;
  createdAt: string;
}

function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const halfLength = Math.ceil(recipe.ingredients.length / 2);
  const firstHalfIngredients = recipe.ingredients.slice(0, halfLength);
  const secondHalfIngredients = recipe.ingredients.slice(halfLength);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full pt-2 md:pt-2 lg:pt-5 border-y ">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-10 xl:space-y-16">
              <div className="grid gap-4 md:grid-cols-2 md:gap-16 border-4 border-purple-600 rounded-[25px]">
                <div className="">
                  <img
                    src={`http://localhost:5000/${recipe.image.replace(/\\/g, '/')}`}
                    alt={recipe.title}
                    className="mx-auto aspect-[3/2] overflow-hidden rounded-l-[25px] object-cover"
                  />
                </div>
                <div className="flex flex-col items-start space-y-4 mx-4 md:mx-2 lg:mx-2 p-1">
                  <div className="inline-block rounded-lg bg-muted px-1 py-1 text-sm">
                    {recipe.labels.join(', ')}
                  </div>
                  <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    {recipe.title}
                  </h1>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    {recipe.metadata}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                      <ClockIcon className="w-5 h-5 fill-primary" />
                      <span className="text-muted-foreground">1 hour</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <CalendarIcon className="w-5 h-5 fill-primary" />
                      <span className="text-muted-foreground">
                        {new Date(recipe.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {recipe.rating && (
                    <div className="flex items-center">
                      <span className="text-yellow-500">
                        {'★'.repeat(Math.round(recipe.rating))}
                      </span>
                      <span className="text-gray-600 ml-2">
                        {recipe.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-5 ">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-12 border-4 border-purple-600 rounded-[25px] p-4">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Ingredients
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-4">
                  <ul className="list-disc pl-5 space-y-4">
                    {firstHalfIngredients.map((ingredient, index) => (
                      <li key={index} className="flex justify-between p-2 bg-gray-100 rounded-md shadow-sm">
                        <span className="font-bold text-gray-800">{ingredient.name}</span>
                        <span className="text-gray-600">{ingredient.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col space-y-4">
                  <ul className="list-disc pl-5 space-y-4">
                    {secondHalfIngredients.map((ingredient, index) => (
                      <li key={index} className="flex justify-between p-2 bg-gray-100 rounded-md shadow-sm">
                        <span className="font-bold text-gray-800">{ingredient.name}</span>
                        <span className="text-gray-600">{ingredient.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-12 border-4 border-purple-600 rounded-[25px] p-4">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2 ">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Step-by-Step Instructions
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-4">
                  <ol className="list-decimal pl-5 space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="bg-gray-100 rounded-md shadow-sm p-4">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold text-gray-800">
                            {instruction.instruction}
                          </h3>
                          <p className="text-muted-foreground">
                            {instruction.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-col items-center">
                  {/* Add any additional content or image here */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#">About Us</a>
            <a href="#">Our Team</a>
            <a href="#">Careers</a>
            <a href="#">News</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Recipes</h3>
            <a href="#">Breakfast</a>
            <a href="#">Lunch</a>
            <a href="#">Dinner</a>
            <a href="#">Desserts</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#">Blog</a>
            <a href="#">Community</a>
            <a href="#">Support</a>
            <a href="#">FAQs</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Contact</h3>
            <a href="#">Support</a>
            <a href="#">Partnerships</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
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
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}

export default RecipeDetail;
