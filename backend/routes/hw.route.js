import express from "express";
const router = express.Router();
import HWsController from "../api_mongo/hardware.controller.js"
import requireAuth from '../middleware/requireAuth.js'

router.use(requireAuth)

router.route('/').get(HWsController.apiGetHWs);
router.route("/id/:id").get(HWsController.apiGetHWById)
router.route("/state").get(HWsController.apiGetHWByState)
router.route("/latest").get(HWsController.apiGetHWByDate)

router.
    route('/device')
    .post(HWsController.apiPostHW)
    .put(HWsController.apiUpdateHW)
    .delete(HWsController.apiDeleteHW)

router.route('/:id').get((req, res) => {
    HW.findById(req.params.id)
        .then(HWs => res.json(HWs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    HW.findByIdAndDelete(req.params.id)
        .then(HWs => res.json(HWs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    HW.findById(req.params.id)
        .then(HWs => {
            HWs.name = req.body.name;
            HWs.description = req.body.description;
            HWs.status = req.body.status;
            HWs.cpu = req.body.cpu;
            HWs.ram = req.body.ram;
            
            HWs.save()
                .then(() => res.json('HW Updated'))
                .catch(err => res.status(400).json('Error: ' +err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router