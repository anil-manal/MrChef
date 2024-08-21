const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Adjust path as necessary

const dbURI = 'mongodb+srv://anilmanal992115:mrchef@cluster0.bsafder.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const recipes = [
  {
    title: 'Vegetarian Chili',
    ingredients: [
      { name: 'Kidney Beans', quantity: '2 cups' },
      { name: 'Tomatoes', quantity: '1 can' },
      { name: 'Corn', quantity: '1 cup' },
      { name: 'Bell Peppers', quantity: '1 cup' },
      { name: 'Onion', quantity: '1 cup' }
    ],
    instructions: [
      { instruction: 'Step 1', description: 'Heat oil in a large pot.' },
      { instruction: 'Step 2', description: 'Add onions and bell peppers, cook until softened.' },
      { instruction: 'Step 3', description: 'Stir in garlic and cook for another minute.' },
      { instruction: 'Step 4', description: 'Add tomatoes, beans, corn, and chili powder.' },
      { instruction: 'Step 5', description: 'Simmer for 30 minutes.' },
      { instruction: 'Step 6', description: 'Season with salt and pepper to taste.' },
    ],
    image: 'uploads/vegetarian-chili.jpeg',
    labels: ['Veg', 'Dinner'],
    metadata: 'Hearty and spicy vegetarian chili.',
  },
  {
    title: 'Chocolate Cake',
    ingredients: [
      { name: 'Flour', quantity: '1 cup' },
      { name: 'Sugar', quantity: '1 cup' },
      { name: 'Cocoa Powder', quantity: '1/2 cup' },
      { name: 'Baking Powder', quantity: '1 tsp' },
      { name: 'Eggs', quantity: '2' }
    ],
    instructions: [
      { instruction: 'Step 1', description: 'Preheat oven to 350°F (175°C).' },
      { instruction: 'Step 2', description: 'Grease and flour a cake pan.' },
      { instruction: 'Step 3', description: 'In a bowl, mix flour, sugar, cocoa powder, and baking powder.' },
      { instruction: 'Step 4', description: 'Add eggs and mix until smooth.' },
      { instruction: 'Step 5', description: 'Pour batter into the pan.' },
      { instruction: 'Step 6', description: 'Bake for 30 minutes.' },
      { instruction: 'Step 7', description: 'Cool before frosting.' },
    ],
    image: 'uploads/chocolate-cake.jpeg',
    labels: ['Dessert', 'Sweet'],
    metadata: 'Rich and moist chocolate cake.',
  },
  {
    title: 'Greek Salad',
    ingredients: [
      { name: 'Cucumber', quantity: '1 cup' },
      { name: 'Tomatoes', quantity: '1 cup' },
      { name: 'Feta Cheese', quantity: '1/2 cup' },
      { name: 'Olives', quantity: '1/4 cup' },
      { name: 'Red Onion', quantity: '1/4 cup' }
    ],
    instructions: [
      { instruction: 'Step 1', description: 'Chop cucumber and tomatoes.' },
      { instruction: 'Step 2', description: 'Slice red onion.' },
      { instruction: 'Step 3', description: 'In a bowl, combine all ingredients.' },
      { instruction: 'Step 4', description: 'Add feta cheese and olives.' },
      { instruction: 'Step 5', description: 'Drizzle with olive oil and vinegar.' },
      { instruction: 'Step 6', description: 'Toss and serve.' },
    ],
    image: 'uploads/greek-salad.jpeg',
    labels: ['Salad', 'Veg'],
    metadata: 'Fresh and tangy Greek salad.',
  },
  {
    title: 'Chicken Curry',
    ingredients: [
      { name: 'Chicken', quantity: '1 lb' },
      { name: 'Onions', quantity: '1 cup' },
      { name: 'Tomatoes', quantity: '1 cup' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Curry Powder', quantity: '2 tbsp' }
    ],
    instructions: [
      { instruction: 'Step 1', description: 'Heat oil in a pan.' },
      { instruction: 'Step 2', description: 'Add onions and cook until golden.' },
      { instruction: 'Step 3', description: 'Add garlic and ginger, cook for 2 minutes.' },
      { instruction: 'Step 4', description: 'Add chicken pieces and brown on all sides.' },
      { instruction: 'Step 5', description: 'Stir in tomatoes and curry powder.' },
      { instruction: 'Step 6', description: 'Add yogurt and simmer for 20 minutes.' },
      { instruction: 'Step 7', description: 'Serve with rice or naan.' },
    ],
    image: 'uploads/chicken-curry.jpeg',
    labels: ['Non-Veg', 'Lunch'],
    metadata: 'Spicy and creamy chicken curry.',
  },
  {
    title: 'Avocado Toast',
    ingredients: [
      { name: 'Avocado', quantity: '1' },
      { name: 'Bread', quantity: '2 slices' },
      { name: 'Lemon Juice', quantity: '1 tbsp' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Pepper', quantity: 'to taste' }
    ],
    instructions: [
      { instruction: 'Step 1', description: 'Toast the bread slices.' },
      { instruction: 'Step 2', description: 'Mash the avocado in a bowl.' },
      { instruction: 'Step 3', description: 'Add lemon juice, salt, and pepper to the avocado.' },
      { instruction: 'Step 4', description: 'Spread the mixture over the toasted bread.' },
      { instruction: 'Step 5', description: 'Garnish with extra salt, pepper, or herbs if desired.' },
    ],
    image: 'uploads/avocado-toast.jpeg',
    labels: ['Breakfast', 'Veg'],
    metadata: 'Simple and healthy avocado toast.',
  },
  {
    title: 'Beef Tacos',
    ingredients: [
      { name: 'Ground Beef', quantity: '1 lb' },
      { name: 'Taco Seasoning', quantity: '2 tbsp' },
      { name: 'Taco Shells', quantity: '12' },
      { name: 'Lettuce', quantity: '1 cup' },
      { name: 'Cheese', quantity: '1/2 cup' }
    ],
    instructions: [
      { instruction: 'Step 1', description: 'Cook ground beef in a pan over medium heat.' },
      { instruction: 'Step 2', description: 'Add taco seasoning and mix well.' },
      { instruction: 'Step 3', description: 'Heat taco shells according to package instructions.' },
      { instruction: 'Step 4', description: 'Fill each shell with beef mixture.' },
      { instruction: 'Step 5', description: 'Top with lettuce and cheese.' },
    ],
    image: 'uploads/beef-tacos.jpeg',
    labels: ['Non-Veg', 'Lunch'],
    metadata: 'Delicious and crunchy beef tacos.',
  },
  {
    title: 'Quinoa Salad',
    ingredients: [
      { name: 'Quinoa', quantity: '1 cup' },
      { name: 'Cherry Tomatoes', quantity: '1 cup' },
      { name: 'Cucumber', quantity: '1 cup' },
      { name: 'Feta Cheese', quantity: '1/2 cup' },
      { name: 'Olives', quantity: '1/4 cup' }
    ],
    instructions: [
      { instruction: 'Step 1', description: 'Cook quinoa according to package instructions.' },
      { instruction: 'Step 2', description: 'Chop tomatoes and cucumber.' },
      { instruction: 'Step 3', description: 'In a large bowl, combine cooked quinoa, tomatoes, cucumber, feta, and olives.' },
      { instruction: 'Step 4', description: 'Toss with olive oil and lemon juice.' },
      { instruction: 'Step 5', description: 'Season with salt and pepper.' },
    ],
    image: 'uploads/quinoa-salad.jpeg',
    labels: ['Salad', 'Veg'],
    metadata: 'Nutritious and refreshing quinoa salad.',
  },
  {
    title: 'Spaghetti Bolognese',
    ingredients: [
      { name: 'Spaghetti', quantity: '200g' },
      { name: 'Ground Beef', quantity: '250g' },
      { name: 'Tomato Sauce', quantity: '1 cup' },
      { name: 'Onion', quantity: '1 cup' },
      { name: 'Garlic', quantity: '2 cloves' }
    ],
    instructions: [
      { instruction: 'Step 1', description: 'Cook spaghetti according to package instructions.' },
      { instruction: 'Step 2', description: 'In a pan, cook ground beef until browned.' },
      { instruction: 'Step 3', description: 'Add onions and garlic, cook until softened.' },
      { instruction: 'Step 4', description: 'Stir in tomato sauce and simmer for 20 minutes.' },
      { instruction: 'Step 5', description: 'Serve sauce over cooked spaghetti.' },
    ],
    image: 'uploads/spaghetti-bolognese.jpeg',
    labels: ['Dinner', 'Non-Veg'],
    metadata: 'Classic Italian spaghetti with Bolognese sauce.',
  },
  {
    title: 'Caesar Salad',
    ingredients: [
      { name: 'Romaine Lettuce', quantity: '1 head' },
      { name: 'Croutons', quantity: '1 cup' },
      { name: 'Parmesan Cheese', quantity: '1/4 cup' },
      { name: 'Caesar Dressing', quantity: '1/4 cup' },
      { name: 'Lemon Juice', quantity: '1 tbsp' }
    ],
    instructions: [
      { instruction: 'Step 1', description: 'Tear lettuce into bite-sized pieces.' },
      { instruction: 'Step 2', description: 'In a large bowl, combine lettuce, croutons, and Parmesan cheese.' },
      { instruction: 'Step 3', description: 'Drizzle with Caesar dressing and lemon juice.' },
      { instruction: 'Step 4', description: 'Toss to coat evenly.' },
    ],
    image: 'uploads/caesar-salad.jpeg',
    labels: ['Salad', 'Veg'],
    metadata: 'Classic Caesar salad with crispy croutons.',
  },
  {
    title: 'Chicken Alfredo',
    ingredients: [
      { name: 'Chicken Breast', quantity: '2 pieces' },
      { name: 'Fettucine Pasta', quantity: '200g' },
      { name: 'Heavy Cream', quantity: '1 cup' },
      { name: 'Parmesan Cheese', quantity: '1/2 cup' },
      { name: 'Garlic', quantity: '2 cloves' }
    ],
    instructions: [
      { instruction: 'Step 1', description: 'Cook fettucine according to package instructions.' },
      { instruction: 'Step 2', description: 'In a pan, cook chicken breasts until fully cooked.' },
      { instruction: 'Step 3', description: 'Remove chicken and slice into strips.' },
      { instruction: 'Step 4', description: 'In the same pan, add garlic and cook for 1 minute.' },
      { instruction: 'Step 5', description: 'Stir in heavy cream and Parmesan cheese, cook until thickened.' },
      { instruction: 'Step 6', description: 'Toss pasta with sauce and top with chicken strips.' },
    ],
    image: 'uploads/chicken-alfredo.jpeg',
    labels: ['Dinner', 'Non-Veg'],
    metadata: 'Creamy chicken Alfredo pasta.',
  },
];

Recipe.insertMany(recipes)
  .then(() => {
    console.log('Recipes seeded successfully!');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding recipes:', err);
    mongoose.connection.close();
  });
