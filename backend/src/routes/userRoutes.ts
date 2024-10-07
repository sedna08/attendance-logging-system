import * as express from 'express';
import * as userController from '../controllers/userController';
import * as userAuth from '../middlewares/userAuth';
const { signup, login } = userController;

const router = express.Router();


//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)
//login route
router.post('/login', login )


export default router;
