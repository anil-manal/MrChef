# Recipe Sharing Platform

## Overview
The Recipe Sharing Platform is a web application that allows users to view, share, and interact with various recipes. The platform includes features for both admins and regular users. Admins can manage recipes, while users can explore recipes, view details, and engage with the content through comments and ratings.

## Features
### Admin Features
- **Authentication:** Secure admin login system.
- **Dashboard:** A comprehensive dashboard to manage recipes.
- **CRUD Operations:** Admins can create, read, update, and delete recipes.
- **Recipe Labels:** Admins can assign multiple labels (e.g., Dessert, Salad, Veg) to recipes for easy sorting.

### User Features
- **Recipe Listing:** Users can browse through a variety of recipes.
- **Recipe Details:** Detailed view of each recipe with ingredients, steps, and metadata.
- **Interactions:** Users can comment on and rate recipes.

## Technologies Used
- **Frontend:** 
  - React.js
  - TypeScript
  - Vite
  - Tailwind CSS
  - FontAwesome for icons

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - Multer for file uploads

- **Database:** MongoDB

## Installation and Setup
1. **Clone the repository:**
   git clone https://github.com/anil-manal/MrChef.git
   cd MrChef

2. **Install dependencies for both frontend and backend:**

# In the root directory for backend dependencies
npm install

# Navigate to the frontend directory and install dependencies
cd frontend
npm install

3. **Set up environment variables:**

Create a .env file in the root directory and add your MongoDB URI, port, and other environment variables.

4. **Run the application:**

# Start the backend server
npm run server

# Start the frontend development server
cd frontend
npm run dev

5. **Access the application:**

Open your browser and go to http://localhost:3000 for the frontend.

## Usage
- **Admin Panel:** Accessible at /admin/login. Once logged in, admins can manage recipes and view statistics.
- **Recipe Browsing:**  Users can browse recipes on the home page and click on any recipe to view its details.

## Future Enhancements
- **User Authentication:** Implement user sign-up and login features.
- **Favorites:** Allow users to save recipes to their favorites list.
- **Advanced Search:** Add search functionality to filter recipes by ingredients, labels, etc.

## Contributing
If you would like to contribute to this project, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.