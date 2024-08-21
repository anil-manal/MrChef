import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const labelsOptions = [
  'Dessert',
  'Sweet',
  'Salad',
  'Veg',
  'Non-Veg',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack'
];

interface Recipe {
  _id: string;
  title: string;
  image: string;
  ingredients: { name: string; quantity: string }[];
  instructions: { instruction: string; description: string }[];
  labels: string[];
  metadata: string;
}

function UpdateRecipe() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState<{ name: string; quantity: string }[]>([]);
  const [instructions, setInstructions] = useState<{ instruction: string; description: string }[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [metadata, setMetadata] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(res.data);
        setTitle(res.data.title);
        setIngredients(res.data.ingredients);
        setInstructions(res.data.instructions);
        setLabels(res.data.labels);
        setMetadata(res.data.metadata);
      } catch (err: any) {
        console.error('Failed to fetch recipe:', err.message || err);
        toast.error('Failed to fetch recipe details.');
      }
    };
    fetchRecipe();
  }, [id]);

  const handleIngredientChange = (index: number, field: 'name' | 'quantity', value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index: number, field: 'instruction' | 'description', value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = { ...newInstructions[index], [field]: value };
    setInstructions(newInstructions);
  };

  const handleUpdateRecipe = async () => {
    try {
      await axios.put(`http://localhost:5000/api/recipes/${id}`, {
        title,
        ingredients,
        instructions,
        labels,
        metadata
      });
      toast.success('Recipe updated successfully!');
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Failed to update recipe:', err.message || err);
      toast.error('Failed to update recipe.');
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Recipe</h1>
      <ToastContainer />

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              className="border p-2 w-1/2 mr-2"
              placeholder="Ingredient name"
            />
            <input
              type="text"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              className="border p-2 w-1/2"
              placeholder="Quantity"
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Instructions</label>
        {instructions.map((instruction, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={instruction.instruction}
              onChange={(e) => handleInstructionChange(index, 'instruction', e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Instruction"
            />
            <textarea
              value={instruction.description}
              onChange={(e) => handleInstructionChange(index, 'description', e.target.value)}
              className="border p-2 w-full"
              placeholder="Description"
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Labels</label>
        {labelsOptions.map((label) => (
          <div key={label} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={labels.includes(label)}
              onChange={() => {
                setLabels((prevLabels) =>
                  prevLabels.includes(label)
                    ? prevLabels.filter((l) => l !== label)
                    : [...prevLabels, label]
                );
              }}
              className="mr-2"
            />
            {label}
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Metadata</label>
        <textarea
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <button
        onClick={handleUpdateRecipe}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Update Recipe
      </button>
    </div>
  );
}

export default UpdateRecipe;
