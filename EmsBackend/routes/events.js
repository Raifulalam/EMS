const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Routes
router.post('/create', eventController.createEvent);
router.get('/getEvent', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
