import { Router } from 'express';
const router = Router();
import { getAllUsers, login, signup } from './controllers/users.js';
import { print } from './controllers/promise.js';


// ראוטר להגדרת הניתוהים בפרוייקט
// פונקציית לוגיו
router.get('/users', getAllUsers);
router.get('/print', print);

router.post('/login', login);
router.post('/signup', signup);




export default router;