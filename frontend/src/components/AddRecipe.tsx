import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

function AddRecipe() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<{ name: string; quantity: string }[]>([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState<{ instruction: string; description: string }[]>([{ instruction: '', description: '' }]);
  const [labels, setLabels] = useState<string[]>([]);
  const [metadata, setMetadata] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

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
        ? [...prevLabels, label]
        : prevLabels.filter(l => l !== label)
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    if (image) formData.append('image', image);
    formData.append('metadata', metadata);
    formData.append('labels', JSON.stringify(labels));
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
  
      const response = await axios.post('http://localhost:5000/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Send token
        },
      });
      toast.success('Recipe added successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Failed to add recipe:', error.response?.data || error.message);
      console.error('Error details:', error); // Detailed error logging
      toast.error('Failed to add recipe. Please try again.');
    }
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Recipe</h2>
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
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
            maxLength={50} // Ensure metadata is limited to 50 characters
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddRecipe;
