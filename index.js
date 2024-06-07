const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
// const cors = require('cors');
const app = express();
const PORT = 3000;

// Import the Swagger definition
const swaggerDefinition = require('./public/swagger/swaggerDefinition');

// Swagger-jsdoc setup
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, './src/routes/*.js')],
};
const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Swagger API project!');
});

// Use the client routes
const clientRoutes = require('./public/routes/Client.route');
app.use('/api/users', clientRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI is available on http://localhost:${PORT}/api-docs`);
});
