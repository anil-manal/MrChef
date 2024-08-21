import React, { useEffect, useState } from 'react';
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
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
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

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index: number, field: 'instruction' | 'description', value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = { ...newInstructions[index], [field]: value };
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, { instruction: '', description: '' }]);
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value;
    setLabels(prevLabels =>
      event.target.checked
        ? [...new Set([...prevLabels, label])]
        : prevLabels.filter(l => l !== label)
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Ensure labels are unique
    const uniqueLabels = Array.from(new Set(labels));

    const formData = new FormData();
    formData.append('title', title);
    formData.append('metadata', metadata);
    uniqueLabels.forEach((label, index) => {
      formData.append(`labels[${index}]`, label); // Store each label in a separate index
    });
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][name]`, ingredient.name);
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
    });
    instructions.forEach((instruction, index) => {
      formData.append(`instructions[${index}][instruction]`, instruction.instruction);
      formData.append(`instructions[${index}][description]`, instruction.description);
    });

    try {
      const token = localStorage.getItem('token'); // Retrieve token
      if (!token) {
        throw new Error('No token found'); // Log if no token found
      }

      await axios.put(`http://localhost:5000/api/recipes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Send token
        },
      });

      toast.success('Recipe updated successfully!');
      navigate('/recipes'); // Redirect to RecipeList page
    } catch (error) {
      console.error('Failed to update recipe:', error.response?.data || error.message);
      toast.error('Failed to update recipe. Please try again.');
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                placeholder="Ingredient Name"
                className="border p-2 flex-1"
                required
              />
              <input
                type="text"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                placeholder="Quantity"
                className="border p-2 flex-1"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Ingredient
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Instructions</label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={instruction.instruction}
                onChange={(e) => handleInstructionChange(index, 'instruction', e.target.value)}
                placeholder="Instruction"
                className="border p-2 flex-1"
                required
              />
              <input
                type="text"
                value={instruction.description}
                onChange={(e) => handleInstructionChange(index, 'description', e.target.value)}
                placeholder="Description"
                className="border p-2 flex-1"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveInstruction(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddInstruction}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Instruction
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Labels</label>
          {labelsOptions.map((label) => (
            <div key={label} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={label}
                checked={labels.includes(label)}
                onChange={handleLabelChange}
                className="mr-2"
              />
              <label className="text-gray-700">{label}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Metadata</label>
          <input
            type="text"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Recipe
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdateRecipe;
