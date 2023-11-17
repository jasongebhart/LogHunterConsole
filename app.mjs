// Import required modules
import express from 'express';

// Create an instance of Express
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the port number
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Define routes and their handlers using an array of route objects
const routes = [
  { path: '/', template: 'index' },
];

// Function to set up routes for the Express app
function setupRoutes() {
  // Set up the routes using a loop
  routes.forEach((route) => {
    app.get(route.path, (req, res) => {
      res.render(route.template); // Render the specified template
    });
  });
}

// Static files
app.use('/assets', express.static('assets'));
app.use('/scripts', express.static('scripts'));

// Fire controllers
//setupRoutes(app); // Use the imported setupRoutes function
setupRoutes(); // Use the imported setupRoutes function

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});