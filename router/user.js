const router = require("express").Router();
const {getUser,createUser,deleteUser, loginUser} = require('../controllers/user')
const authentication = require ('../midlewares/authentication.js')

router.post('/login', loginUser)
router.get('/',authentication, getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)



module.exports = router;