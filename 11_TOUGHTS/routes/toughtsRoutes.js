const express = require('express');
const router = express.Router()

const ToughtController = require('../controllers/ToughtController');

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, ToughtController.createTought);
router.post('/add', checkAuth, ToughtController.createToughtSave);
router.get('/edit/:id', checkAuth, ToughtController.updateToughts);
router.post('/edit', checkAuth, ToughtController.updateToughtsSave);
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.post('/remove', checkAuth, ToughtController.removeTought)
router.get('/', ToughtController.showToughts);

module.exports = router;