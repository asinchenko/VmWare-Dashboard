import Client from './client.logic.js';

export default class ClientController {
    static async apiGetClients(req, res, next) {
        const clientPerPage = req.query.clientPerPage ? parseInt(req.query.clientPerPage):0;
        const page = req.query.page ? parseInt(req.query.page, 10):0;

        let filters = {}
        if (req.query.status) {
            filters.status = req.query.status
        }else if (req.query.name) {
            filters.name = req.query.name
        }

        const {clientList, totalNumberClients} = await Client.getClient({
            filters,
            page,
            clientPerPage,
        })

        let response = {
            clients: clientList,
            page: page,
            filters,
            entries_per_page: clientPerPage,
            total_results: totalNumberClients,
        }
        res.json(response)
    };

    static async apiPostClient(req, res, next) {
    try {
        const client = req.body.client;
        const document = req.body.document;
        const type = req.body.type;
        const contract = req.body.contract;
        const used = req.body.used;
        const rate = req.body.rate;
        const date = req.body.date;
        const clientPost = await Client.addClient(
            client,document, type, contract, used,rate,date
        );
        res.json({status:"success post"});
    }catch(e) {
        res.status(500).json({error: e.message});
    }
    };

    static async apiUpdateClient(req, res, next) {
        try {
            const _id = req.body._id;
            const client = req.body.client;
            const document = req.body.document;
            const type = req.body.type;
            const contract = req.body.contract;
            const used = req.body.used;
            const rate = req.body.rate;
            const date = req.body.date;
    
            const clientUpdate = await Client.updateClient(
                _id, client,document, type, contract, used,rate,date
            );
            
            var {error} = clientUpdate
            if (error) {
                res.status(400).json({error})
            }
            if (clientUpdate.modifiedCount === 0) {
                throw new Error(
                    `Unable to update review, data hasn't changed or user is not valid`
                )
            }
            res.json({status:"success update"});
        }catch(e) {
            res.status(500).json({error: e.message});
        }
        };

        static async apiDeleteClient(req, res, next) {
            try {
                const clientId = req.body._id;
        
                const clientUpdate = await Client.deleteClient(
                    clientId, 
                );
                res.json({status:"success"})
            }catch(e) {
                res.status(500).json({error: e.message});
            }
        };

        static async apiDeleteClientById(req, res,next){
            try {
                let id = req.params.id || {}
                let client_list = await Client.deleteClient(id)
                if (!client_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetClientById(req, res,next){
            try {
                let id = req.params.id || {}
                let client_list = await Client.getClientByID(id)
                if (!client_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
                res.json(client_list)
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetClientByState(req, res,next) {
            try {
                let states = await Client.getClientByState()
                res.json(states)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetClientByDate(req, res,next) {
            try {
                let lastUpdate = await Client.getClientByDate()
                res.json(lastUpdate)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

}