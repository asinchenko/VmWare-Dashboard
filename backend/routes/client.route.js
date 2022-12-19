import express from "express";
const router = express.Router();
import ClientController from "../api_mongo/client.controller.js"
import requireAuth from '../middleware/requireAuth.js'

router.use(requireAuth)

router.route('/').get(ClientController.apiGetClients);
router.route("/id/:id").get(ClientController.apiGetClientById)
router.route("/latest").get(ClientController.apiGetClientByDate)

router.
    route('/client')
    .post(ClientController.apiPostClient)
    .put(ClientController.apiUpdateClient)
    .delete(ClientController.apiDeleteClient)
    

router.route('/:id').get((req, res) => {
    ClientController.findById(req.params.id)
        .then(Clients => res.json(Clients))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    ClientController.apiDeleteClientById(req)
        .then(Clients => res.json(Clients))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    ClientController.findById(req.params.id)
        .then(Clients => {
            Clients.name = req.body.name;
            Clients.description = req.body.description;
            Clients.status = req.body.status;
            Clients.cpu = req.body.cpu;
            Clients.ram = req.body.ram;
            
            Clients.save()
                .then(() => res.json('Client Updated'))
                .catch(err => res.status(400).json('Error: ' +err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
export default router