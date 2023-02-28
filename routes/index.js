const router = require('express').Router();

// Imports all API routes from api/index.js
const apiRoutes = require('./api');

// adds prefix of `/api` to all api routes imported from `api` directory
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;