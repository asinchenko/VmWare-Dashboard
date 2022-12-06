import VirtualMachines from './vms.logic.js';

export default class VMsController {
    static async apiGetVMs(req, res, next) {
        const vmPerPage = req.query.vmPerPage ? parseInt(req.query.vmPerPage):0;
        const page = req.query.page ? parseInt(req.query.page, 10):0;

        let filters = {}
        if (req.query.status) {
            filters.status = req.query.status
        }else if (req.query.name) {
            filters.name = req.query.name
        }

        const {vmList, totalNumberVMs} = await VirtualMachines.getVMs({
            filters,
            page,
            vmPerPage,
        })

        let response = {
            Virtual_Machines: vmList,
            page: page,
            filters,
            entries_per_page: vmPerPage,
            total_results: totalNumberVMs,
        }
        res.json(response)
    };

    static async apiPostVM(req, res, next) {
    try {
        const vmName = req.body.name;
        const description = req.body.description;
        const status = req.body.status;
        const cpu = req.body.cpu;
        const ram = req.body.ram;
        const date = new Date();

        const vmPost = await VirtualMachines.addVM(
            vmName, 
            description, 
            status,
            cpu, 
            ram, 
            date,
        );
        res.json({status:"success post"});
    }catch(e) {
        res.status(500).json({error: e.message});
    }
    };
    static async localPostVM(req, res, next) {
        try {
            const vmName = req.body.name;
            const description = req.body.description;
            const status = req.body.status;
            const cpu = req.body.cpu;
            const ram = req.body.ram;
            const date = new Date();
    
            const vmPost = await VirtualMachines.addVM(
                vmName, 
                description, 
                status,
                cpu, 
                ram, 
                date,
            );
            res.json({status:"success post"});
        }catch(e) {
            res.status(500).json({error: e.message});
        }
        };

    static async apiUpdateVM(req, res, next) {
        try {
            const vmId = req.body._id;
            const description = req.body.description;
            const date = new Date();
    
            const vmUpdate = await VirtualMachines.updateVM(
                vmId,
                description,
                date,
            );
            
            var {error} = vmUpdate
            if (error) {
                res.status(400).json({error})
            }
            if (vmUpdate.modifiedCount === 0) {
                throw new Error(
                    `Unable to update review, data hasn't changed or user is not valid`
                )
            }
            res.json({status:"success update"});
        }catch(e) {
            res.status(500).json({error: e.message});
        }
        };

        static async apiDeleteVM(req, res, next) {
            try {
                const vmId = req.body._id;
                console.log(vmId)
        
                const vmUpdate = await VirtualMachines.deleteVM(
                    vmId, 
                );
                res.json({status:"success"})
            }catch(e) {
                res.status(500).json({error: e.message});
            }
        };

        static async apiGetVMById(req, res,next){
            try {
                let id = req.params.id || {}
                let vm_list = await VirtualMachines.getVMByID(id)
                if (!vm_list) {
                    res.status(404).json({error: "Not found!"})
                    return
                }
                res.json(vm_list)
            }catch(e) {
                console.log(`api, ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetVMByState(req, res,next) {
            try {
                let states = await VirtualMachines.getVMByState()
                res.json(states)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

        static async apiGetVMByDate(req, res,next) {
            try {
                let lastUpdate = await VirtualMachines.getVMByDate()
                res.json(lastUpdate)
            }catch(e){
                console.log(`api ${e}`)
                res.status(500).json({error:e})
            }
        };

}