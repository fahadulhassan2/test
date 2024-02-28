import { Router } from "express";
import { handleCreateAppointment, handleContact, getAllAppointments } from '../controller/appointmentController.js';

const router = Router();

router.route('/appointment').post(handleCreateAppointment)
router.route('/contact').post(handleContact)
router.route('/getAppointment').get(getAllAppointments)

export default router;
