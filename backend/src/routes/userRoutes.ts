import * as express from 'express';
import * as userController from '../controllers/userController';
import * as userAuth from '../middlewares/userAuth';
const { signup, login, getAllUsers, deleteUser } = userController;

const router = express.Router();


//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup);
//login route
router.post('/login', login );
// getting all users
router.get('/users/', getAllUsers);
router.delete('/users/:id', deleteUser);


export default router;
