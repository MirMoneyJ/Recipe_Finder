Recipe_Finder

Overview: 
This project is designed to manage, display, and interact with a collection of recipes. It aims to provide an easy-to-use interface for users to browse, search, and contribute recipes.

Features:
- Recipe Management: Add, edit, and delete recipes.
- Search Functionality: Easily find recipes based on ingredients, cuisine, or other criteria.
- User Contributions: Users can submit their own recipes to the collection.

Project Structure:
- JSON: Grabs the JSON objects from the Spoonacular API and saves them into a JSON file
- key.env: Environment variables which holds the API key
- logs: Directory for log files. Specifcally for login/register authentication. 
- models: Data model which holds the User schema.
- public: Folder for the HTML files.
- push.gitignore: Files to ignore when pushing to Git.
- README.md: This documentation file.
- routes: Routing logic for web application.
- scripts: Script logic for web application.
- static: Where the main server lives.
- styles: CSS stylesheets for the project.

Prerequisties:
{
NOTE: Watch these videos to properly configure MongoDB and Node.js on Windows:

https://www.youtube.com/watch?v=gB6WLkSrtJk&t=488s
https://www.youtube.com/watch?v=06X51c6WHsQ 
}


- Node.js
- MongoDB
- MongoDB Compass

- MongoDB
- Node.js
- path
- express
- dotenv
- mongoose
- react
- bcrypt
- winston

Installation
1. Clone the repository from GitHub: https://github.com/MirMoneyJ/Recipe_Finder
2. Open up a new terminal and direct to the root location this will be installed.
3. Run this command in the root directory of the project to install the dependencies - 
  - npm install express mongoose path dotenv react bcrypt winston
4. Ensure that MongoDB is connected.
5. cd into the static folder and run this command -
  - node server.js
6. If prompted "Server is running on port {port}" and "Connected to MongoDB" means we can move on to the next step.
7. After starting the server navigate to localhost:{port} to interact with the UI
  - example: localhost:3000/login

Usage
To use this application, you can simply.
