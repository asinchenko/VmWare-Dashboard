import HardWare from './hardware.logic.js';

export default class HWsController {
    static async apiGetHWs(req, res, next) {
        const hwPerPage = req.query.hwPerPage ? parseInt(req.query.hwPerPage):0;
        const page = req.query.page ? parseInt(req.query.page, 10):0;

        let filters = {}
        if (req.query.status) {
            filters.status = req.query.status
        }else if (req.query.name) {
            filters.name = req.query.name
        }

        const {hwList, totalNumberHWs} = await HardWare.getHardWare({
            filters,
            page,
            hwPerPage,
        })

        let response = {
            hardWare: hwList,
            page: page,
            filters,
            entries_per_page: hwPerPage,
            total_results: totalNumberHWs,
        }
        res.json(response)
    };

    static async apiPostHW(req, res, next) {
    try {
        const vendor = req.body.vendor;
        const hwName = req.body.name;
        const type = req.body.type;
        const description = req.body.description;
        const status = req.body.status;
        const cpu = req.body.cpu;
        const ram = req.body.ram;
        const hwPost = await HardWare.addHW(
            vendor,
            hwName,
            type, 
            description, 
            status,
            cpu, 
            ram, 
        );
        res.json({status:"success post"});
    }catch(e) {
        res.status(500).json({error: e.message});
    }
    };
    static async localPostHW(req, res, next) {
        try {
            const hwName = req.body.name;
            const description = req.body.description;
            const status = req.body.status;
            const cpu = req.body.cpu;
            const ram = req.body.ram;
            const hwPost = await HardWare.addHW(
                hwName, 
                description, 
                status,
                cpu, 
                ram,
            );
            res.json({status:"success post"});
        }catch(e) {
            res.status(500).json({error: e.message});
        }
        };

    static async apiUpdateHW(req, res, next) {
        try {
            const hwId = req.body._id;
            const vendor = req.body.vendor;
            const name = req.body.name;
            const type = req.body.type;
            const status = req.body.status;
            const cpu = req.body.cpu;
            const ram = req.body.ram;
            const description = req.body.description;
            const date = new Date();
    
            const hwUpdate = await HardWare.updateHW(
                hwId,
                vendor, name, type, status, cpu, ram, description,
                date,
            );
            
            var {error} = hwUpdate
            if (error) {
                res.status(400).json({error})
            }
            if (hwUpdate.modifiedCount === 0) {
                throw new Error(
                    `Unable to update review, data hasn't changed or user is not valid`
                )
            }
            res.json({status:"success update"});
        }catch(e) {
            res.status(500).json({error: e.message});
        }
        };

        static async apiDeleteHW(req, res, next) {
            try {
                const hwId = req.body._id;
                const hwUpdate = await HardWare.deleteHW(
                    hwId, 
                );
                res.json({status:"success"})
            }catch(e) {
                res.status(500).json({error: e.message});
            }
        };

        static async apiDeleteHWById(req, res,next){
            try {
                let id = req.params.id || {}
                let hw_list = await HardWare.deleteHW(id)
                if (!hw_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetHWById(req, res,next){
            try {
                let id = req.params.id || {}
                let hw_list = await HardWare.getHWByID(id)
                if (!hw_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
                res.json(hw_list)
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetHWByState(req, res,next) {
            try {
                let states = await HardWare.getHWByState()
                res.json(states)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetHWByDate(req, res,next) {
            try {
                let lastUpdate = await HardWare.getHWByDate()
                res.json(lastUpdate)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

}