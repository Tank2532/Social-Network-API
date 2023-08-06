const router = require('express').Router();
const {
    getUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');
const {
    addFriend,
    removeFriend,
} = require('../../controllers/friendController');

router.route('/').get(getUser).post(createUser);

router.route('/').post(addFriend).delete(removeFriend);

router
    .route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;