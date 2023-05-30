import Collocation from './collocation.logic.js';

export default class CollocationController {
    static async apiGetCollocations(req, res, next) {
        const collocationPerPage = req.query.collocationPerPage ? parseInt(req.query.collocationPerPage):0;
        const page = req.query.page ? parseInt(req.query.page, 10):0;

        let filters = {}
        if (req.query.status) {
            filters.status = req.query.status
        }else if (req.query.name) {
            filters.name = req.query.name
        }

        const {collocationList, totalNumberCollocations} = await Collocation.getCollocation({
            filters,
            page,
            collocationPerPage,
        })

        let response = {
            collocations: collocationList,
            page: page,
            filters,
            entries_per_page: collocationPerPage,
            total_results: totalNumberCollocations,
        }
        res.json(response)
    };

    static async apiPostCollocation(req, res, next) {
    try {
        const collocation = req.body.collocation;
        const title = req.body.title;
        const modifiedBy = req.body.modifiedBy;
        const collocationPost = await Collocation.addCollocation(
            collocation, title, modifiedBy
        );
        res.json({status:"Updated!"});
    }catch(e) {
        res.status(500).json({error: e.message});
    }
    };

    static async apiUpdateCollocation(req, res, next) {
        try {
            const _id = req.body._id;
            const collocation = req.body.collocation;
            const document = req.body.document;
            const type = req.body.type;
            const tags = req.body.tags;
            const date = req.body.date;
    
            const collocationUpdate = await Collocation.updateCollocation(
                _id, collocation,document, type,tags,date
            );
            
            var {error} = collocationUpdate
            if (error) {
                res.status(400).json({error})
            }
            if (collocationUpdate.modifiedCount === 0) {
                throw new Error(
                    `Unable to update review, data hasn't changed or user is not valid`
                )
            }
            res.json({status:"success update"});
        }catch(e) {
            res.status(500).json({error: e.message});
        }
        };

        static async apiDeleteCollocation(req, res, next) {
            try {
                const collocationId = req.body._id;
        
                const collocationUpdate = await Collocation.deleteCollocation(
                    collocationId, 
                );
                res.json({status:"success"})
            }catch(e) {
                res.status(500).json({error: e.message});
            }
        };

        static async apiDeleteCollocationById(req, res,next){
            try {
                let id = req.params.id || {}
                let collocation_list = await Collocation.deleteCollocation(id)
                if (!collocation_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetCollocationById(req, res,next){
            try {
                let id = req.params.id || {}
                let collocation_list = await Collocation.getCollocationByID(id)
                if (!collocation_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
                res.json(collocation_list)
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };
        static async apiGetCollocationByName(req, res,next){
            try {
                let name = req.params.name || {}
                console.log(name)
                let collocation_list = await Collocation.getCollocationByName(name)
                if (!collocation_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
                res.json(collocation_list)
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetCollocationByState(req, res,next) {
            try {
                let states = await Collocation.getCollocationByState()
                res.json(states)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetCollocationByDate(req, res,next) {
            try {
                let lastUpdate = await Collocation.getCollocationByDate()
                res.json(lastUpdate)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

}