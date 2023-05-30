import express from "express";
const router = express.Router();
import CollocationController from "../api_mongo/collocation.controller.js"
import requireAuth from '../middleware/requireAuth.js'

// router.use(requireAuth)

router.route('/').get(CollocationController.apiGetCollocations);
router.route("/id/:id").get(CollocationController.apiGetCollocationById)
router.route("/name/:name").get(CollocationController.apiGetCollocationByName)
router.route("/latest").get(CollocationController.apiGetCollocationByDate)

router.
    route('/')
    .post(CollocationController.apiPostCollocation)
    .put(CollocationController.apiUpdateCollocation)
    .delete(CollocationController.apiDeleteCollocation)
    

router.route('/:id').get((req, res) => {
    CollocationController.findById(req.params.id)
        .then(Collocations => res.json(Collocations))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    CollocationController.apiDeleteCollocationById(req)
        .then(Collocations => res.json(Collocations))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    CollocationController.findById(req.params.id)
        .then(Collocations => {
            Collocations.name = req.body.name;
            Collocations.description = req.body.description;
            Collocations.status = req.body.status;
            Collocations.cpu = req.body.cpu;
            Collocations.ram = req.body.ram;
            
            Collocations.save()
                .then(() => res.json('Collocation Updated'))
                .catch(err => res.status(400).json('Error: ' +err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
export default router