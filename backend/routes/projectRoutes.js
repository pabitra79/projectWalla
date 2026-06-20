const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  seedProjects,
} = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/seed', protect, adminOnly, seedProjects);
router.post('/', protect, adminOnly, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

module.exports = router;
