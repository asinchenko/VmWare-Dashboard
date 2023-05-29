import express from "express";
const router = express.Router();
import ExcelController from "../api_mongo/excel.controller.js"
import requireAuth from '../middleware/requireAuth.js'

// router.use(requireAuth)

router.route('/').get(ExcelController.apiGetExcels);
router.route("/id/:id").get(ExcelController.apiGetExcelById)
router.route("/name/:name").get(ExcelController.apiGetExcelByName)
router.route("/latest").get(ExcelController.apiGetExcelByDate)

router.
    route('/excel')
    .post(ExcelController.apiPostExcel)
    .put(ExcelController.apiUpdateExcel)
    .delete(ExcelController.apiDeleteExcel)
    

router.route('/:id').get((req, res) => {
    ExcelController.findById(req.params.id)
        .then(Excels => res.json(Excels))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    ExcelController.apiDeleteExcelById(req)
        .then(Excels => res.json(Excels))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    ExcelController.findById(req.params.id)
        .then(Excels => {
            Excels.name = req.body.name;
            Excels.description = req.body.description;
            Excels.status = req.body.status;
            Excels.cpu = req.body.cpu;
            Excels.ram = req.body.ram;
            
            Excels.save()
                .then(() => res.json('Excel Updated'))
                .catch(err => res.status(400).json('Error: ' +err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
export default router