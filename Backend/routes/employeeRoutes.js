import express from 'express';
import { getAllEmployees ,loginEmployee,registerEmployee, updateEmployee} from '../controller/employeeController.js';
import { authenticateToken } from '../middleware/auth.js';
const router= express.Router();

router.get('/',getAllEmployees);
router.post('/register',registerEmployee);
router.post('/login',loginEmployee)
router.post('/update',authenticateToken,updateEmployee)

export default router;