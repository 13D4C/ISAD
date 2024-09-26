const express = require('express');
const router = express.Router();
const SearchController = require('../Controller/searchController');

router.get('/search', (req, res) => SearchController.search(req, res));

module.exports = router;