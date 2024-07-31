const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/auth");
const { getAll, Add, Remove, GetOne, Update } = require('../controllers/employees');

router.get('/', auth, getAll);
router.get('/:id', auth, GetOne);
router.post('/', auth, Add);
router.delete('/:id', auth, Remove);
router.patch('/:id', auth, Update);

module.exports = router;
