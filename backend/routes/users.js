const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  updateProfileValidation,
  updateAvatarValidation,
  idValidation,
} = require('../middlewares/validations');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:id', idValidation, getOneUser);
router.patch('/me', updateProfileValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
