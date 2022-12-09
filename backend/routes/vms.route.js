import express from "express";
const router = express.Router();
import VM from '../models/vm.model.js';
import VMsController from "../api_mongo/vms.controller.js"


router.route('/').get(VMsController.apiGetVMs);
router.route("/id/:id").get(VMsController.apiGetVMById)
router.route("/state").get(VMsController.apiGetVMByState)
router.route("/latest").get(VMsController.apiGetVMByDate)

router.
    route('/vm')
    .post(VMsController.apiPostVM)
    .put(VMsController.apiUpdateVM)
    .delete(VMsController.apiDeleteVM)

export default router