// routes/userRoutes.js

const express = require('express');
// const { statements } = require('../controller/userController');
const router = express.Router();

// Sample route definitions
router.get('/users', (req, res) => {
  res.json({ message: 'GET /users endpoint' });
});

// router.post('/statement', statements);
module.exports = router;


/**
 * @swagger
 * /api/getGames:
 *   get:
 *     summary: Retrieve games
 *     description: Returns a list of games based on API type.
 *     parameters:
 *       - in: query
 *         name: apiType
 *         description: Type of the API (e.g., 'match', 'player', etc.)
 *         required: true
 *         type: string
 *       - in: query
 *         name: token
 *         description: Authentication token for accessing the API.
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
